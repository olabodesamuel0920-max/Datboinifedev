const puppeteer = require('puppeteer-core');

async function run() {
    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
            headless: true
        });
        const page = await browser.newPage();
        
        // Capture console errors
        const consoleErrors = [];
        page.on('pageerror', err => {
            consoleErrors.push(err.toString());
        });
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        console.log('Navigating to live production site for audit...');
        await page.goto('https://datboinifedev.vercel.app/', { waitUntil: 'networkidle2' });
        
        // Bypass boot screen to inspect desktop
        console.log('Bypassing boot screen...');
        await page.waitForSelector('#skip-boot-btn');
        await page.click('#skip-boot-btn');
        await page.waitForSelector('#os-container', { visible: true });

        console.log('Auditing document metadata and structure...');
        const audit = await page.evaluate(() => {
            const results = {};

            // 1. SEO check
            results.title = document.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            results.metaDescription = metaDesc ? metaDesc.getAttribute('content') : null;
            
            const metaViewport = document.querySelector('meta[name="viewport"]');
            results.metaViewport = metaViewport ? metaViewport.getAttribute('content') : null;

            results.htmlLang = document.documentElement.getAttribute('lang');

            // Headings check
            const h1s = Array.from(document.querySelectorAll('h1')).map(el => el.textContent.trim());
            results.h1Count = h1s.length;
            results.h1s = h1s;

            const h2s = Array.from(document.querySelectorAll('h2')).map(el => el.textContent.trim());
            results.h2Count = h2s.length;

            const h3s = Array.from(document.querySelectorAll('h3')).map(el => el.textContent.trim());
            results.h3Count = h3s.length;

            // Image alt checks
            const images = Array.from(document.querySelectorAll('img'));
            results.totalImages = images.length;
            results.imagesWithoutAlt = images.filter(img => !img.getAttribute('alt')).map(img => img.src);

            // 2. Accessibility: buttons and links labels
            const interactiveElements = Array.from(document.querySelectorAll('a, button, input, select, textarea'));
            results.totalInteractive = interactiveElements.length;
            results.interactiveWithoutAria = interactiveElements
                .filter(el => {
                    const tag = el.nodeName.toLowerCase();
                    const hasLabel = el.textContent.trim() || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title');
                    return !hasLabel;
                })
                .map(el => ({
                    tag: el.nodeName.toLowerCase(),
                    id: el.id,
                    class: el.className
                }));

            // 3. Document structure & IDs checks
            const elementsWithIds = Array.from(document.querySelectorAll('[id]'));
            const ids = elementsWithIds.map(el => el.id);
            const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
            results.duplicateIds = [...new Set(duplicateIds)];

            return results;
        });

        console.log('\n==================================================');
        console.log('OLABODE OS — PROGRAMMATIC SEO & ACCESSIBILITY AUDIT');
        console.log('==================================================');
        console.log('Page Title:         ', audit.title);
        console.log('Meta Description:   ', audit.metaDescription);
        console.log('HTML Lang:          ', audit.htmlLang);
        console.log('Viewport Config:    ', audit.metaViewport);
        console.log('H1 Headings count:  ', audit.h1Count, audit.h1s);
        console.log('H2 Headings count:  ', audit.h2Count);
        console.log('H3 Headings count:  ', audit.h3Count);
        console.log('Total Images:       ', audit.totalImages);
        console.log('Images missing Alt: ', audit.imagesWithoutAlt.length, audit.imagesWithoutAlt);
        console.log('Duplicate IDs found:', audit.duplicateIds);
        console.log('Interactive without labels:', audit.interactiveWithoutAria.length, audit.interactiveWithoutAria);
        console.log('Console Errors/Logs:', consoleErrors.length, consoleErrors);
        console.log('==================================================\n');

    } catch (e) {
        console.error('Audit Error:', e);
    } finally {
        if (browser) await browser.close();
    }
}
run();
