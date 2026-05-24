const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function run() {
    let browser;
    try {
        const qaDir = path.join(__dirname, '..', 'qa');
        if (!fs.existsSync(qaDir)) {
            fs.mkdirSync(qaDir);
        }

        console.log('Launching browser for screenshots...');
        browser = await puppeteer.launch({
            executablePath: 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
            headless: true
        });

        const page = await browser.newPage();

        // 1. Cyberpunk Desktop 1440px
        console.log('Capturing Cyberpunk Desktop 1440px...');
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('https://datboinifedev.vercel.app/', { waitUntil: 'networkidle2' });
        await page.waitForSelector('#skip-boot-btn');
        await page.click('#skip-boot-btn');
        await page.waitForSelector('#os-container', { visible: true });
        // Let themes and layout settle
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
        await page.screenshot({ path: path.join(qaDir, 'cyberpunk_desktop_1440.png') });

        // 2. Project drawer open on desktop (1440px)
        console.log('Opening project drawer and capturing desktop...');
        await page.click('[data-open-case-study="mamaguard"]');
        // Wait for drawer transition to complete (400ms in CSS)
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 800)));
        await page.screenshot({ path: path.join(qaDir, 'project_drawer_desktop.png') });

        // Close drawer for subsequent captures
        await page.click('#close-drawer-btn');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 800)));

        // 3. Luxury Gold Desktop 1440px
        console.log('Switching to Luxury Gold and capturing Desktop 1440px...');
        await page.click('[data-theme-select="luxury"]');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
        await page.screenshot({ path: path.join(qaDir, 'luxury_gold_desktop_1440.png') });

        // 4. Cyberpunk Mobile 375px top section
        console.log('Switching back to Cyberpunk and capturing Mobile 375px top...');
        await page.click('[data-theme-select="cyberpunk"]');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
        await page.setViewport({ width: 375, height: 800, deviceScaleFactor: 2 });
        // Let it settle for mobile layout
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
        await page.screenshot({ path: path.join(qaDir, 'cyberpunk_mobile_375_top.png') });

        // 5. Contact/uplink section on mobile (375px)
        console.log('Scrolling to contact section and capturing Mobile 375px...');
        await page.evaluate(() => {
            document.getElementById('secure-uplink').scrollIntoView();
        });
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
        await page.screenshot({ path: path.join(qaDir, 'contact_mobile_375.png') });

        // 6. Luxury Gold Mobile 375px top section
        console.log('Scrolling to top, switching to Luxury, and capturing Mobile 375px top...');
        await page.evaluate(() => {
            window.scrollTo(0, 0);
        });
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
        await page.click('[data-theme-select="luxury"]');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
        await page.screenshot({ path: path.join(qaDir, 'luxury_gold_mobile_375_top.png') });

        console.log('All screenshots captured successfully in qa/ folder!');

    } catch (e) {
        console.error('Screenshot Error:', e);
    } finally {
        if (browser) await browser.close();
    }
}
run();
