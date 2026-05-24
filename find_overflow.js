const puppeteer = require('puppeteer-core');

async function run() {
    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
            headless: true
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded', timeout: 10000 });

        // Click skip boot
        await page.waitForSelector('#skip-boot-btn');
        await page.click('#skip-boot-btn');
        await page.waitForSelector('#os-container', { visible: true });

        const overflows = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('*'));
            const winWidth = window.innerWidth;
            const results = [];
            
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.right > winWidth) {
                    // Get CSS selector path
                    const path = [];
                    let parent = el;
                    while (parent && parent.nodeName !== '#document') {
                        let str = parent.nodeName.toLowerCase();
                        if (parent.id) str += '#' + parent.id;
                        if (parent.className) str += '.' + Array.from(parent.classList).join(' ').trim().replace(/\s+/g, '.');
                        path.unshift(str);
                        parent = parent.parentNode;
                    }
                    results.push({
                        selector: path.join(' > '),
                        right: rect.right,
                        width: rect.width,
                        left: rect.left,
                        winWidth
                    });
                }
            });
            return results;
        });

        console.log('Overflowing elements:');
        console.log(JSON.stringify(overflows, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        if (browser) await browser.close();
    }
}
run();
