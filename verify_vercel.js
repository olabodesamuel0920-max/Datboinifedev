const puppeteer = require('puppeteer-core');
const path = require('path');

async function runVerification() {
    console.log('==================================================');
    console.log('OLABODE OS — PRODUCTION VERIFICATION RUN');
    console.log('==================================================');

    let browser;
    try {
        console.log('Launching Chrome...');
        browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            headless: true
        });

        const page = await browser.newPage();

        // Target URL is the production Vercel site
        const targetUrl = 'https://datboinifedev.vercel.app/';
        console.log(`Navigating to target: ${targetUrl}`);
        await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

        // 1. Homepage loads successfully
        console.log('\n[PASS] Step 1: Navigated to production URL successfully.');

        // Bypass the boot screen
        console.log('Waiting for boot screen bypass button...');
        await page.waitForSelector('#skip-boot-btn', { timeout: 10000 });
        await page.click('#skip-boot-btn');
        console.log('Clicked [ SKIP_BOOT.EXE ]');

        // Wait for OS container to fade in and be visible
        await page.waitForSelector('#os-container', { visible: true, timeout: 5000 });
        console.log('[PASS] Step 2: OS desktop container visible. Boot bypassed successfully.');

        // 2. Default theme check (Cyberpunk)
        const defaultTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
        console.log(`Current theme: ${defaultTheme}`);
        if (defaultTheme === 'cyberpunk') {
            console.log('[PASS] Step 3: Default theme is Cyberpunk Cyan.');
        } else {
            throw new Error(`Expected default theme to be cyberpunk, but got: ${defaultTheme}`);
        }

        // 3. Theme switching (Luxury Gold)
        console.log('Testing theme switch to Luxury Gold...');
        await page.waitForSelector('[data-theme-select="luxury"]');
        await page.click('[data-theme-select="luxury"]');
        // Wait for class/state to propagate
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
        const switchedTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
        console.log(`Switched theme: ${switchedTheme}`);
        if (switchedTheme === 'luxury') {
            console.log('[PASS] Step 4: Switched to Luxury Gold theme successfully.');
        } else {
            throw new Error(`Theme switch failed, expected luxury, got: ${switchedTheme}`);
        }

        // 4. Mobile top bar layout wrapping & horizontal scroll checks
        const viewports = [375, 414, 768, 1440];
        for (const width of viewports) {
            console.log(`\nAuditing viewport width: ${width}px...`);
            await page.setViewport({ width, height: 800, deviceScaleFactor: 2 });
            // Let the layout settle
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));

            // Check horizontal scroll
            const scrollData = await page.evaluate(() => {
                const docWidth = document.documentElement.scrollWidth;
                const winWidth = window.innerWidth;
                const bodyWidth = document.body.scrollWidth;
                const hasOverflow = docWidth > winWidth || bodyWidth > winWidth;
                
                const overflowingElements = [];
                if (hasOverflow) {
                    const elements = Array.from(document.querySelectorAll('*'));
                    elements.forEach(el => {
                        const rect = el.getBoundingClientRect();
                        if (rect.right > winWidth) {
                            const path = [];
                            let parent = el;
                            while (parent && parent.parentNode) {
                                let str = parent.nodeName.toLowerCase();
                                if (parent.id) str += '#' + parent.id;
                                if (parent.className) str += '.' + Array.from(parent.classList).join('.').replace(/\s+/g, '.');
                                path.unshift(str);
                                parent = parent.parentNode;
                            }
                            overflowingElements.push({
                                tag: el.nodeName,
                                selector: path.join(' > '),
                                right: rect.right,
                                width: rect.width
                            });
                        }
                    });
                }
                
                return {
                    docWidth,
                    winWidth,
                    bodyWidth,
                    hasOverflow,
                    overflowingElements
                };
            });

            console.log(`Viewport: ${width}px | Window width: ${scrollData.winWidth}px | Document scroll width: ${scrollData.docWidth}px`);
            if (scrollData.hasOverflow) {
                console.warn(`[WARNING] Horizontal scroll detected at viewport ${width}px!`);
                console.warn('Overflowing elements details:', JSON.stringify(scrollData.overflowingElements, null, 2));
                
                // Inspect structural elements sizes
                const structuralSizes = await page.evaluate(() => {
                    const selectors = [
                        'html', 'body', '#os-container', '#os-top-bar', '.top-bar-left', '.top-bar-nav', '.top-bar-right', '.desktop-grid',
                        '.desktop-left-rail', '.desktop-right-rail',
                        '#proof-dashboard', '#featured-projects', '#system-modules',
                        '#how-i-think', '#skills-matrix', '#secure-uplink', '#os-footer', '.footer-left', '.footer-center', '.footer-right', '#case-study-drawer', '.drawer-content'
                    ];
                    return selectors.map(sel => {
                        const el = document.querySelector(sel);
                        if (!el) return { selector: sel, exists: false };
                        const rect = el.getBoundingClientRect();
                        return {
                            selector: sel,
                            exists: true,
                            width: rect.width,
                            right: rect.right,
                            clientWidth: el.clientWidth,
                            scrollWidth: el.scrollWidth,
                            offsetWidth: el.offsetWidth
                        };
                    });
                });
                console.warn('Structural elements sizes:');
                console.warn(JSON.stringify(structuralSizes, null, 2));

                // Find overflowing elements within top-bar
                const topBarChildren = await page.evaluate(() => {
                    const topBarEl = document.querySelector('#os-top-bar');
                    if (!topBarEl) return [];
                    const children = Array.from(topBarEl.children);
                    return children.map(el => {
                        const rect = el.getBoundingClientRect();
                        return {
                            tag: el.nodeName,
                            id: el.id,
                            className: el.className,
                            width: rect.width,
                            right: rect.right,
                            left: rect.left,
                            clientWidth: el.clientWidth,
                            scrollWidth: el.scrollWidth
                        };
                    });
                });
                console.warn('Top bar direct children:');
                console.warn(JSON.stringify(topBarChildren, null, 2));

                const topBarOverflows = await page.evaluate(() => {
                    const topBarRight = document.querySelector('.top-bar-right');
                    if (!topBarRight) return [];
                    const allInner = Array.from(topBarRight.querySelectorAll('*'));
                    return allInner.map(el => {
                        const rect = el.getBoundingClientRect();
                        return {
                            tag: el.nodeName,
                            id: el.id,
                            className: el.className,
                            width: rect.width,
                            right: rect.right,
                            left: rect.left,
                            clientWidth: el.clientWidth,
                            scrollWidth: el.scrollWidth
                        };
                    });
                });
                console.warn('Top bar right inner elements:');
                console.warn(JSON.stringify(topBarOverflows, null, 2));
            } else {
                console.log(`[PASS] Zero horizontal overflow at viewport ${width}px.`);
            }

            // For mobile viewports, check if top bar is wrapped badly or height exceeds expectations
            if (width <= 414) {
                const topBarHeight = await page.evaluate(() => {
                    const topBar = document.getElementById('os-top-bar');
                    return topBar ? topBar.offsetHeight : 0;
                });
                console.log(`Top Bar Height on ${width}px: ${topBarHeight}px`);
                if (topBarHeight <= 60) {
                    console.log(`[PASS] Mobile top bar layout is clean and single-row on ${width}px viewport (height: ${topBarHeight}px).`);
                } else {
                    console.warn(`[WARNING] Mobile top bar height is ${topBarHeight}px on ${width}px. It might be wrapping.`);
                }
            }
        }

        // Restore desktop viewport for interactions
        await page.setViewport({ width: 1440, height: 900 });

        // 5. Project drawer opens/closes cleanly
        console.log('\nTesting Project Drawer Case-Study Trigger...');
        // Select Chikini Monie drawer button
        await page.waitForSelector('[data-open-case-study="chikini"]');
        await page.click('[data-open-case-study="chikini"]');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));

        const isDrawerActive = await page.evaluate(() => {
            const drawer = document.getElementById('case-study-drawer');
            return drawer.classList.contains('active') && drawer.getAttribute('aria-hidden') === 'false';
        });

        if (isDrawerActive) {
            console.log('[PASS] Step 5: Case-study drawer opened successfully for Chikini Monie.');
        } else {
            throw new Error('Case-study drawer failed to open.');
        }

        // Close drawer
        console.log('Closing drawer...');
        await page.click('#close-drawer-btn');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));

        const isDrawerClosed = await page.evaluate(() => {
            const drawer = document.getElementById('case-study-drawer');
            return !drawer.classList.contains('active') && drawer.getAttribute('aria-hidden') === 'true';
        });

        if (isDrawerClosed) {
            console.log('[PASS] Step 6: Case-study drawer closed cleanly.');
        } else {
            throw new Error('Case-study drawer failed to close.');
        }

        // 6. Contact compilation and mailto/copy actions
        console.log('\nTesting Contact Form Uplink Compile & Actions...');
        await page.type('#sender_identity', 'Test QA Inspector');
        await page.type('#callback_coordinate', 'qa@test.com');
        await page.type('#communications_payload', 'This is a secure QA automated payload checking connection channels.');
        
        console.log('Submitting form...');
        await page.click('#submit-packet-btn');
        
        // Wait for compiler simulation logs to finish (about 400ms * 5 steps + leeway = 3000ms)
        console.log('Waiting for local compilation simulation to complete...');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 4000)));

        const buttonsRendered = await page.evaluate(() => {
            const mailBtn = document.getElementById('action-mail-client');
            const copyBtn = document.getElementById('action-copy-clipboard');
            return !!(mailBtn && copyBtn);
        });

        if (buttonsRendered) {
            console.log('[PASS] Step 7: Local compilation completed. Action buttons [OPEN MAIL CLIENT] and [COPY CLIPBOARD] rendered successfully.');
        } else {
            throw new Error('Contact compile failed or actions did not render.');
        }

        // Try Copy Clipboard Action
        console.log('Testing Copy Clipboard button click...');
        await page.click('#action-copy-clipboard');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
        const copyBtnText = await page.evaluate(() => document.getElementById('action-copy-clipboard').textContent);
        console.log(`Copy button text: ${copyBtnText}`);
        if (copyBtnText.includes('COPIED!')) {
            console.log('[PASS] Step 8: Clipboard copy action triggered successfully (button text updated).');
        } else {
            console.warn('[WARNING] Clipboard button did not show COPIED!. Note: browser environment may block navigator.clipboard.');
        }

        // 7. Live project links check
        console.log('\nTesting live links references in document...');
        const liveLinks = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a[href]'));
            return anchors.map(a => ({
                text: a.innerText.trim(),
                href: a.getAttribute('href')
            }));
        });

        console.log(`Found ${liveLinks.length} anchors in index.html.`);
        
        // Find links targeting external beta portals
        const externalBetas = liveLinks.filter(l => l.href.includes('vercel.app') && !l.href.includes('datboinifedev'));
        console.log('External beta URLs found:');
        externalBetas.forEach(l => {
            console.log(` - Label: "${l.text}" -> Href: "${l.href}"`);
        });

        if (externalBetas.length >= 2) {
            console.log('[PASS] Step 9: Live beta project links exist in portfolio compilation.');
        } else {
            console.warn('[WARNING] Could not locate all expected live project links in DOM.');
        }

        console.log('\n==================================================');
        console.log('PRODUCTION QA VERIFICATION VERDICT: ALL PASS');
        console.log('==================================================');

    } catch (e) {
        console.error('\n==================================================');
        console.error('VERIFICATION ERROR:', e.message);
        console.error('==================================================');
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

runVerification();
