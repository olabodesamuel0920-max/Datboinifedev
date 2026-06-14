const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

// Target paths
const PROJECTS_JSON_PATH = path.join(__dirname, '..', 'data', 'projects.json');
const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'projects');

// Default Chrome paths depending on platform
const getExecutablePath = () => {
    if (process.platform === 'win32') {
        const paths = [
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            path.join(process.env.USERPROFILE || '', 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe')
        ];
        for (const p of paths) {
            if (fs.existsSync(p)) return p;
        }
    } else if (process.platform === 'linux') {
        const paths = [
            '/usr/bin/google-chrome',
            '/usr/bin/chromium',
            '/usr/bin/chromium-browser'
        ];
        for (const p of paths) {
            if (fs.existsSync(p)) return p;
        }
    }
    return undefined;
};

async function captureScreenshots() {
    console.log('==================================================');
    console.log('PORTFOLIO PROJECT SCREENSHOT SYNC PIPELINE');
    console.log('==================================================');

    if (!fs.existsSync(PROJECTS_JSON_PATH)) {
        console.error(`Error: Projects registry not found at ${PROJECTS_JSON_PATH}`);
        process.exit(1);
    }

    let projects = [];
    try {
        const rawData = fs.readFileSync(PROJECTS_JSON_PATH, 'utf8');
        projects = JSON.parse(rawData);
    } catch (e) {
        console.error(`Error parsing projects registry JSON: ${e.message}`);
        process.exit(1);
    }

    const executablePath = getExecutablePath();
    console.log(`Using browser executable: ${executablePath || 'Default Puppeteer bundle'}`);

    let browser;
    try {
        const launchOptions = {
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        };
        if (executablePath) {
            launchOptions.executablePath = executablePath;
        }
        browser = await puppeteer.launch(launchOptions);
    } catch (err) {
        console.error(`Failed to launch browser: ${err.message}`);
        console.log('Attempting to load full "puppeteer" package if available...');
        try {
            const fullPuppeteer = require('puppeteer');
            browser = await fullPuppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        } catch (e2) {
            console.error('All browser launches failed. Make sure Chrome/Chromium is installed or run npm install.');
            process.exit(1);
        }
    }

    console.log(`Found ${projects.length} projects in registry.`);

    for (let i = 0; i < projects.length; i++) {
        const proj = projects[i];
        const { name, slug, url } = proj;

        console.log(`\n[${i + 1}/${projects.length}] Processing project: ${name} (${slug})`);

        if (!url) {
            console.log(` - No live URL specified. Marking as Staging/Local.`);
            proj.screenshots = proj.screenshots || { desktop: "", mobile: "" };
            proj.screenshotStatus = 'skipped_no_url';
            continue;
        }

        // Create folder for project screenshots
        const projectFolder = path.join(ASSETS_DIR, slug);
        if (!fs.existsSync(projectFolder)) {
            fs.mkdirSync(projectFolder, { recursive: true });
        }

        const desktopPath = path.join(projectFolder, 'desktop.webp');
        const mobilePath = path.join(projectFolder, 'mobile.webp');

        let page;
        try {
            page = await browser.newPage();
            console.log(` - Navigating to ${url}...`);
            await page.goto(url, { waitUntil: 'load', timeout: 35000 });

            // Extra wait for layout and animations to settle
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

            // Capture Desktop Screenshot (1440x900)
            console.log(` - Capturing desktop screenshot (1440x900)`);
            await page.setViewport({ width: 1440, height: 900 });
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
            await page.screenshot({
                path: desktopPath,
                type: 'webp',
                quality: 85
            });

            // Capture Mobile Screenshot (375x812)
            console.log(` - Capturing mobile screenshot (375x812)`);
            await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 800)));
            await page.screenshot({
                path: mobilePath,
                type: 'webp',
                quality: 85
            });

            console.log(` - [SUCCESS] Screenshots sync complete for: ${name}`);
            proj.screenshots = {
                desktop: `assets/projects/${slug}/desktop.webp`,
                mobile: `assets/projects/${slug}/mobile.webp`
            };
            proj.screenshotStatus = 'success';
            proj.screenshotTimestamp = new Date().toISOString();

        } catch (err) {
            console.error(` - [FAILED] Error capturing ${name}: ${err.message}`);
            proj.screenshotStatus = 'failed';
            
            // Check if old screenshots exist, if so preserve them
            const hasDesktop = fs.existsSync(desktopPath);
            const hasMobile = fs.existsSync(mobilePath);
            if (hasDesktop && hasMobile) {
                console.log(` - Retaining existing screenshots for ${name}`);
                proj.screenshots = {
                    desktop: `assets/projects/${slug}/desktop.webp`,
                    mobile: `assets/projects/${slug}/mobile.webp`
                };
            } else {
                proj.screenshots = proj.screenshots || { desktop: "", mobile: "" };
            }
        } finally {
            if (page) {
                await page.close();
            }
        }
    }

    console.log('\nClosing browser...');
    await browser.close();

    // Write updated registry back to JSON
    console.log(`Updating registry file at ${PROJECTS_JSON_PATH}`);
    try {
        fs.writeFileSync(PROJECTS_JSON_PATH, JSON.stringify(projects, null, 2), 'utf8');
        console.log('Projects registry sync write complete!');
    } catch (err) {
        console.error(`Failed to update projects JSON: ${err.message}`);
    }

    console.log('==================================================');
    console.log('SYNC PIPELINE PROCESS FINISHED');
    console.log('==================================================');
}

captureScreenshots();
