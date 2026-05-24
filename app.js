/* ==========================================================================
   OLABODE OS — CORE CORE ENGINE & INTERACTION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SYSTEM INITIALIZATION & STATE ---
    const systemLogs = [
        "Initializing Olabode OS Kernel v1.1.0...",
        "Loading system core dependencies [DOM, STYLES, SHELL]... OK",
        "Loading AI Co-Pilot Synergy Module... [GEMINI_3_FLASH] ONLINE",
        "Establishing design token interfaces... [READY]",
        "Validating product catalog registers...",
        " -> Indexing [Chikini Monie]... OK",
        " -> Indexing [Aristo Afrikana]... OK",
        " -> Indexing [PredChain]... OK",
        " -> Indexing [Mama Guard]... OK",
        " -> Indexing [Bethel Portal]... OK",
        " -> Indexing [Proof Onboarding]... OK",
        "Verifying responsive layout matrices... OK",
        "Aesthetic ambient backdrop filter grids... ACTIVATED",
        "Checking Lekki/Lagos timezone coordinates... OK",
        "System diagnostic: ALL SYSTEMS STABLE.",
        "Boot complete. Initiating Command Center...",
    ];

    let bootLogIndex = 0;
    let bootTimer = null;
    const bootLogContainer = document.getElementById('boot-log');
    const bootProgress = document.getElementById('boot-progress');
    const bootScreen = document.getElementById('boot-screen');
    const osContainer = document.getElementById('os-container');
    const skipBtn = document.getElementById('skip-boot-btn');

    // --- 2. BOOT SEQUENCE SIMULATOR ---
    function triggerBootLog() {
        if (bootLogIndex < systemLogs.length) {
            const logLine = document.createElement('div');
            logLine.textContent = `sys_log:// ${systemLogs[bootLogIndex]}`;
            // Give specific highlights to special lines
            if (systemLogs[bootLogIndex].includes("ONLINE") || systemLogs[bootLogIndex].includes("READY") || systemLogs[bootLogIndex].includes("OK")) {
                logLine.style.color = "var(--neon-green)";
            } else if (systemLogs[bootLogIndex].includes("diagnostic")) {
                logLine.style.color = "var(--neon-cyan)";
            }
            
            bootLogContainer.appendChild(logLine);
            bootLogContainer.scrollTop = bootLogContainer.scrollHeight;

            // Increment progress bar
            const percent = ((bootLogIndex + 1) / systemLogs.length) * 100;
            bootProgress.style.width = `${percent}%`;

            bootLogIndex++;
            // Dynamic typing speed for natural aesthetic feel
            const nextDelay = 120 + Math.random() * 150;
            bootTimer = setTimeout(triggerBootLog, nextDelay);
        } else {
            // End boot sequence
            setTimeout(completeSystemBoot, 600);
        }
    }

    function completeSystemBoot() {
        clearTimeout(bootTimer);
        // Fade out boot screen
        bootScreen.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        bootScreen.style.opacity = "0";
        bootScreen.style.transform = "scale(1.05)";
        
        setTimeout(() => {
            bootScreen.classList.add('hidden');
            // Fade in desktop
            osContainer.classList.remove('hidden');
            osContainer.style.opacity = "0";
            
            // Trigger radial metric animate
            setTimeout(() => {
                osContainer.style.transition = "opacity 0.8s ease";
                osContainer.style.opacity = "1";
                animateDashboardMetrics();
                printCliOutput("sys_network:// Connection secured. System fully operational.");
            }, 50);
        }, 600);
    }

    // Skip boot btn event
    skipBtn.addEventListener('click', completeSystemBoot);

    // Kickoff boot sequence immediately
    triggerBootLog();

    // --- 3. LEKKI/LAGOS CLOCK WORKER ---
    function updateSystemClock() {
        const clockElement = document.getElementById('system-clock');
        if (!clockElement) return;

        const options = {
            timeZone: 'Africa/Lagos',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        try {
            const timeString = new Date().toLocaleTimeString('en-US', options);
            clockElement.textContent = `${timeString} LEKKI_NG`;
        } catch (e) {
            // Fallback to local time if timezone string fails
            const localTime = new Date().toLocaleTimeString();
            clockElement.textContent = `${localTime} LOCAL`;
        }
    }
    
    // Sync clock immediately and interval
    updateSystemClock();
    setInterval(updateSystemClock, 1000);

    // --- 4. ANIMATE DASHBOARD WIDGETS ---
    function animateDashboardMetrics() {
        // Radial progress dial (98% = 251.2 * (1 - 0.98) = 5.02 offset)
        const dial = document.querySelector('.speed-dial');
        if (dial) {
            dial.style.strokeDashoffset = "5.02";
        }

        // Bar Chart fills
        const barFills = document.querySelectorAll('.bar-fill');
        barFills.forEach(fill => {
            const width = fill.style.width; // Grab pre-defined width
            fill.style.width = "0%";
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
    }

    // --- 5. INTERACTIVE CLI TERMINAL ENGINE ---
    const cliForm = document.getElementById('cli-form');
    const cliInput = document.getElementById('cli-input');
    const cliOutputLog = document.getElementById('cli-output-log');

    const cliCommands = {
        help: [
            "Available commands in Olabode OS:",
            "  <span class='highlight-green'>about</span>      - Reports Olabode's core product engineer profile",
            "  <span class='highlight-green'>projects</span>   - Catalogs active flagship product blueprints",
            "  <span class='highlight-green'>skills</span>     - Indexes technical skills mapped directly to outcomes",
            "  <span class='highlight-green'>system</span>     - Reports active local kernel staging stats",
            "  <span class='highlight-green'>contact</span>    - Establishes connection coordinates & routes",
            "  <span class='highlight-green'>clear</span>      - Wipes current CLI history terminal",
            "Individual Project Summaries:",
            "  Type: <span class='highlight-green'>chikini</span>, <span class='highlight-green'>aristo</span>, <span class='highlight-green'>predchain</span>, <span class='highlight-green'>mamaguard</span>, <span class='highlight-green'>bethel</span>, or <span class='highlight-green'>proof</span>"
        ],
        about: [
            "identity:// SAMUEL OLABODE - Elite Frontend Specialist & Product Builder.",
            "  I specialize in rapid product synthesis, bridging custom high-end UI styling",
            "  with rigorous frontend architectures. Utilizing a highly optimized workflow,",
            "  I accelerate development timelines while strictly avoiding technical debt."
        ],
        projects: [
            "blueprints:// ACTIVE LAUNCH-FOCUSED ARCHITECTURES:",
            "  1. <span class='highlight-green'>Chikini Monie</span> - Stakeholder-Ready food-tech ordering & kitchen operations demo",
            "  2. <span class='highlight-green'>Aristo Afrikana</span> - Client Proposal restaurant and lounge booking platform",
            "  3. <span class='highlight-green'>PredChain</span> - Experimental predictive blockchain and wallet dashboard",
            "  4. <span class='highlight-green'>Mama Guard</span> - Maternal wellness health tracking platform (Live Beta)",
            "  5. <span class='highlight-green'>Bethel Portal</span> - Unified community portal and church streaming system (Live Demo)",
            "  6. <span class='highlight-green'>Proof</span> - Premium onboarding review application (Live Beta)",
            "Type a project name (e.g. 'chikini', 'mamaguard', 'proof') to view specifications directly."
        ],
        skills: [
            "matrix:// OPERATIONAL SKILL MATRIX:",
            "  - Custom CSS Art & Micro-UX   -> Direct outcome: High-converting aesthetic layout conversion",
            "  - AI Co-Pilot Integration     -> Direct outcome: Rapid automated wireframing and structured QA reviews",
            "  - Reactive State Isolation    -> Direct outcome: Ultra-fast responsive actions on resource-constrained devices",
            "  - Production Hardening        -> Direct outcome: Stable static deployments with zero visual regressions"
        ],
        system: [
            "kernel:// DIAGNOSTIC REPORT:",
            "  - Local Engine: Gemini 3 Flash Hybrid Setup",
            "  - Active Projects Indexed: 6 Flagship blue-chip applications",
            "  - Layout Containment: SECURED (No overflows found in viewport audits)",
            "  - Browser State: Standard Compliant",
            "  - Human Synergy: Structured AI Integration Framework"
        ],
        contact: [
            "uplink:// COORDINATE CHANNELS:",
            "  - Direct Email: <span class='highlight-green'>samuel@olabode.com</span>",
            "  - Local Route: Fill out bottom uplink form to compile a message payload."
        ],
        chikini: [
            "profile:// CHIKINI MONIE — STAKEHOLDER-READY DEMO",
            "  - Stack: React, TailwindCSS, State Isolation, Status Checker",
            "  - Problem: Disconnected systems between table ordering and kitchen displays.",
            "  - What I built: Multi-role layout covering menu checking, real-time kitchen queue, staff schedules, and manager analytics.",
            "  Type: <span class='highlight-green'>details chikini</span> to open full specifications panel."
        ],
        aristo: [
            "profile:// ARISTO AFRIKANA — CLIENT PROPOSAL DIRECTION",
            "  - Stack: HTML5, Vanilla CSS3, Javascript, CSS Variables",
            "  - Problem: Generic, template-like websites dilution of premium physical dining grandeur.",
            "  - What I built: Overhauled the luxury brand online identity with 3 core booking experience funnels (Dining, Lounge, Culture).",
            "  Type: <span class='highlight-green'>details aristo</span> to open full specifications panel."
        ],
        predchain: [
            "profile:// PREDCHAIN — EXPERIMENTAL BUILD",
            "  - Stack: TypeScript, Next.js, Atomic State Isolation, TailwindCSS",
            "  - Problem: Web3 staking dashboards are visually cluttered and lack frontend transactional guards.",
            "  - What I built: Designed high-fidelity prediction pool dashboard with defensive state-isolation triggers.",
            "  Type: <span class='highlight-green'>details predchain</span> to open full specifications panel."
        ],
        mamaguard: [
            "profile:// MAMA GUARD — LIVE BETA",
            "  - Stack: React, Next.js, Offline Caching, Serverless, TailwindCSS",
            "  - Problem: Pregnant mothers in remote regions lack quick, offline-friendly medical guidelines.",
            "  - What I built: Deployed maternal safety support portal caching pregnancy logs and clinician checkups offline.",
            "  - Live Beta Link: https://guard-pink.vercel.app/",
            "  Type: <span class='highlight-green'>details mamaguard</span> to open full specifications panel."
        ],
        bethel: [
            "profile:// BETHEL SANCTUARY PORTAL — LIVE DEMO",
            "  - Stack: HTML5, Vanilla CSS3, Media Streaming APIs, LocalState",
            "  - Problem: Spiritual communities struggle to organize media files and event Bulletins on a central page.",
            "  - What I built: Created a unified platform with localState media player persistence, sermon indexes, and bulletins.",
            "  Type: <span class='highlight-green'>details bethel</span> to open full specifications panel."
        ],
        proof: [
            "profile:// PROOF — LIVE BETA",
            "  - Stack: React, CSS Variables, State Logging, Gamified UI, GSAP",
            "  - Problem: SaaS onboarding suffer from boring multiline forms and high drop-off.",
            "  - What I built: Premium gamified onboarding workflow tracking milestones with fluid GPU-accelerated transition nodes.",
            "  - Live Beta Link: https://proof-7-day-beta.vercel.app/",
            "  Type: <span class='highlight-green'>details proof</span> to open full specifications panel."
        ]
    };

    function printCliOutput(text, isHTML = false) {
        const line = document.createElement('p');
        line.className = 'cli-line';
        if (isHTML) {
            line.innerHTML = text;
        } else {
            line.textContent = text;
        }
        cliOutputLog.appendChild(line);
        cliOutputLog.scrollTop = cliOutputLog.scrollHeight;
    }

    if (cliForm) {
        cliForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cmdText = cliInput.value.trim().toLowerCase();
            cliInput.value = '';

            if (cmdText === '') return;

            // Output command prompt
            printCliOutput(`olabode_os://guest$ ${cmdText}`);

            if (cmdText === 'clear') {
                cliOutputLog.innerHTML = `
                    <p class="cli-line muted">Welcome to Olabode OS (by Samuel Olabode) Command Interface.</p>
                    <p class="cli-line muted">Type <span class="highlight-green">help</span> to view available system commands.</p>
                `;
                return;
            }

            if (cmdText.startsWith('details ')) {
                const projectKey = cmdText.replace('details ', '').trim();
                const matchedKey = projectKey === 'mamaguard' ? 'mamaguard' : (projectKey === 'bethel' ? 'bethel' : projectKey);
                if (projectsData[matchedKey]) {
                    printCliOutput(`sys_drawer:// Opening technical specifications panel for [${projectsData[matchedKey].title}]...`, true);
                    const drawLine = cliOutputLog.lastChild;
                    drawLine.classList.add('system');
                    openCaseStudy(matchedKey);
                } else {
                    printCliOutput(`cli_error:// Project specifications not found: '${projectKey}'`, false);
                    const line = cliOutputLog.lastChild;
                    line.classList.add('error');
                }
                return;
            }

            if (cliCommands[cmdText]) {
                cliCommands[cmdText].forEach(line => {
                    printCliOutput(line, true);
                });
            } else {
                printCliOutput(`cli_error:// Command not found: '${cmdText}'. Type 'help' for instructions.`, false);
                const line = cliOutputLog.lastChild;
                line.classList.add('error');
            }
        });
    }

    // --- 5B. SYSTEM THEME SWITCHER CONTROLLER ---
    const themeButtons = document.querySelectorAll('[data-theme-select]');
    const currentTheme = localStorage.getItem('olabode_os_theme') || 'cyberpunk';

    // Align switcher UI button states with current loaded theme
    themeButtons.forEach(btn => {
        const themeName = btn.getAttribute('data-theme-select');
        if (themeName === currentTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        // Click handler to switch themes
        btn.addEventListener('click', () => {
            const selectedTheme = btn.getAttribute('data-theme-select');

            // Apply selected theme to body
            document.body.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('olabode_os_theme', selectedTheme);

            // Sync UI active classes
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Set up clean human-friendly theme names for local trace logging
            const themeNames = {
                cyberpunk: "Cyberpunk Cyan",
                luxury: "Luxury Gold",
                matrix: "Matrix Green",
                stealth: "Stealth Mono"
            };
            const friendlyName = themeNames[selectedTheme] || selectedTheme;

            // Type local safe accent update diagnostics in main terminal
            printCliOutput(`sys_theme:// Theme accent layout updated locally to [${friendlyName}].`, true);
            const line = cliOutputLog.lastChild;
            if (line && line.classList) {
                line.classList.add('system');
            }
        });
    });

    // --- 6. PROJECT WINDOW TAB SYSTEM ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const tabs = card.querySelectorAll('.tab-btn');
        const contents = card.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');

                // Remove active class from all tabs & contents in this card
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Set active current tab & content
                tab.classList.add('active');
                const matchingContent = card.querySelector(`.tab-content[data-tab-content="${targetTab}"]`);
                if (matchingContent) {
                    matchingContent.classList.add('active');
                }
            });
        });
    });

    // --- 7. INTERACTIVE SKILLS OUTCOME TABLE MATRIX ---
    const matrixRows = document.querySelectorAll('.matrix-row');

    matrixRows.forEach(row => {
        row.addEventListener('click', () => {
            const skill = row.getAttribute('data-skill');
            const skillText = row.querySelector('.skill-name').textContent.trim();
            const outcomeText = row.querySelector('.skill-result').textContent.trim();
            
            // Pulse highlight flash on selected row
            row.style.backgroundColor = "rgba(0, 242, 254, 0.08)";
            setTimeout(() => {
                row.style.backgroundColor = "transparent";
            }, 300);

            // Print direct connection to the terminal CLI!
            printCliOutput(`sys_synapse:// Mapping connection: [${skillText}]`, true);
            const synLine = cliOutputLog.lastChild;
            synLine.classList.add('system');

            printCliOutput(`   -> Core Outcome: ${outcomeText}`);
        });
    });

    // --- 8. PROJECT CASE-STUDY DRAWER MODULE ---
    const projectsData = {
        chikini: {
            title: "Chikini Monie",
            tagline: "Premium Food-Tech Ordering & Operations Demo",
            status: "Stakeholder-Ready Demo",
            statusClass: "stakeholder-ready",
            problem: "Traditional restaurant operations suffer from disconnected systems between customer table ordering, kitchen status boards, and manager analytics, leading to service delays and fragmented operational data.",
            whatIBuilt: "An end-to-end hospitality operations prototype. Engineered a multi-role layout consisting of a customer menu selector and order coordinator, a real-time kitchen queue view, a staff schedule board, and an administrative analytics dashboard.",
            myRole: "Solo Product Architect & Frontend Engineer",
            stack: ["React", "TailwindCSS", "State Isolation", "Status Checker"],
            special: "Designed with a strict operational safety framework, featuring an offline-first branch status monitor that safely checks network connection state before initiating data transactions.",
            currentStatus: "Stable stakeholder preview. Deployed as a verification model for operational feasibility studies.",
            liveLink: "",
            liveLinkLabel: "Offline Review Staging",
            nextImprovement: "Implement WebSocket state channels for instant kitchen-to-staff notifications."
        },
        aristo: {
            title: "Aristo Afrikana",
            tagline: "Premium Restaurant Website & Luxury Digital upgrade",
            status: "Client Proposal Direction",
            statusClass: "client-proposal",
            problem: "Luxury dining brands require digital interfaces that mirror their physical hospitality standards. Generic booking platforms or template websites dilute brand prestige and fail to convert premium patrons.",
            whatIBuilt: "Synthesized a luxury-tier digital presence. Created three discrete booking experience funnels (Fine Dining, Lounge reservations, and Cultural/Gaming events) tied together by subtle parallax effects and modern custom vectors.",
            myRole: "Lead UI Developer & Brand Synthesizer",
            stack: ["HTML5", "Vanilla CSS3", "Javascript (ES6)", "Custom CSS Variables"],
            special: "100% bespoke CSS styling without bulky external component libraries, achieving extremely fast load indices and absolute visual fidelity on all mobile viewports.",
            currentStatus: "Staging sandbox proposal delivered to management stakeholders for brand alignment validation.",
            liveLink: "",
            liveLinkLabel: "Proposal Sandbox Preview",
            nextImprovement: "Integrate a 3D interactive table selector using WebGL/Three.js."
        },
        predchain: {
            title: "PredChain",
            tagline: "Experimental Predictive Blockchain Pool Dashboard",
            status: "Experimental Build",
            statusClass: "experimental",
            problem: "Web3 predictive markets are frequently hindered by cluttered, text-heavy data visualizations and poor defensive error handling during high-velocity user interactions.",
            whatIBuilt: "Constructed a high-fidelity prediction pool management dashboard featuring reactive pool statistics, staking analytics graphs, and interactive contract validation triggers.",
            myRole: "Frontend Developer & Interface Hardener",
            stack: ["TypeScript", "Next.js", "Atomic State Isolation", "TailwindCSS"],
            special: "Engineered strict atomic state isolation guards inside the frontend container to securely simulate block transactions and prevent race-condition UI regressions.",
            currentStatus: "Functional experimental repository. Verified and frozen as a master design token reference point.",
            liveLink: "",
            liveLinkLabel: "Repository Token Staging",
            nextImprovement: "Connect direct wallet providers (MetaMask, WalletConnect) to EVM testnet pools."
        },
        mamaguard: {
            title: "Mama Guard",
            tagline: "Maternal Health Tracking & Support Platform",
            status: "Live Beta",
            statusClass: "live-beta",
            problem: "Pregnant mothers in under-resourced regions often lack secure, direct access to trusted maternal safety guidance, vital sign self-check logs, and rapid healthcare provider summary and safety guidance.",
            whatIBuilt: "Created an online maternal support portal featuring a responsive symptom analyzer log, a maternal safety guidelines center, and a quick-action healthcare uplink trigger.",
            myRole: "Full-Stack Engineer & Product Builder",
            stack: ["React", "Next.js", "TailwindCSS", "Vercel Serverless Functions"],
            special: "Programmed a highly resilient offline-first caching system so mothers in low-connectivity areas can reliably read vital symptom checklists without internet connection.",
            currentStatus: "Live Beta. Active community evaluation showing positive engagement in maternal logging trials.",
            liveLink: "https://guard-pink.vercel.app/",
            liveLinkLabel: "Launch Live Beta",
            nextImprovement: "Implement automated SMS notification fallbacks for maternal safety updates."
        },
        bethel: {
            title: "Bethel Portal",
            tagline: "Unified Community Portal & Media Hub",
            status: "Live Demo",
            statusClass: "live-demo",
            problem: "Modern spiritual communities struggle to organize digital sermon databases, media streaming playbacks, weekly event bullet registries, and community coordinates within one central hub.",
            whatIBuilt: "Developed a premium, unified church portal incorporating searchable media distribution playlists, interactive announcements, and coordinate administration registers.",
            myRole: "Solo Developer",
            stack: ["HTML5", "Vanilla CSS3", "Javascript (ES6)", "Local Playback Stream APIs"],
            special: "Engineered a persistent media player that caches current sermon playback elapsed times locally, allowing users to resume media playback effortlessly.",
            currentStatus: "Staging production build verified and optimized for church administrative evaluation.",
            liveLink: "",
            liveLinkLabel: "Live Demo Preview",
            nextImprovement: "Incorporate real-time prayer coordinate request loops with staff SMS alerts."
        },
        proof: {
            title: "Proof",
            tagline: "Premium Gamified 7-Day Challenge Suite",
            status: "Live Beta",
            statusClass: "live-beta",
            problem: "Modern web products experience high drop-off during user onboarding due to dull, multi-step registration forms and a lack of immediate interactive feedback.",
            whatIBuilt: "Designed an engaging 7-day challenge onboarding suite. Includes interactive task lists, immediate motivational checkpoints, and clean state progress logs.",
            myRole: "Lead Product & Interaction Engineer",
            stack: ["React", "CSS Variables", "Interactive State Tracking", "GSAP Transitions"],
            special: "Optimized transitions using GPU-accelerated CSS properties to guarantee absolute fluid, smooth renders even on entry-level mobile devices.",
            currentStatus: "Active public beta testing. Utilized as an onboarding proof-of-concept template.",
            liveLink: "https://proof-7-day-beta.vercel.app/",
            liveLinkLabel: "Launch Live Beta",
            nextImprovement: "Integrate user behavior analytics pipelines to audit onboarding drop-off points."
        }
    };

    const drawer = document.getElementById('case-study-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerCloseBtn = document.getElementById('close-drawer-btn');
    const drawerBodyContent = document.getElementById('drawer-body-content');

    function openCaseStudy(projectKey) {
        const data = projectsData[projectKey];
        if (!data) return;

        // Render dynamic body content
        const tagsHtml = data.stack.map(tag => `<span class="p-tag">${tag}</span>`).join(' ');
        
        let liveButtonHtml = '';
        if (data.liveLink) {
            liveButtonHtml = `<a href="${data.liveLink}" class="live-link-btn" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; text-align: center; margin-top: 24px; padding: 12px; font-size: 11px;">[ ${data.liveLinkLabel.toUpperCase()} ]</a>`;
        } else {
            liveButtonHtml = `<button type="button" class="live-link-btn disabled-btn" style="display: block; width: 100%; text-align: center; margin-top: 24px; padding: 12px; font-size: 11px;" disabled>[ ${data.liveLinkLabel.toUpperCase()} ]</button>`;
        }

        drawerBodyContent.innerHTML = `
            <div class="drawer-project-meta" style="margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
                    <h2 class="drawer-project-title" style="font-size: 20px; font-weight: 700; color: var(--text-primary);">${data.title}</h2>
                    <span class="status-tag ${data.statusClass}" style="flex-shrink: 0; font-family: var(--font-mono); font-size: 8px; padding: 2px 6px; border-radius: 3px; font-weight: 600; text-transform: uppercase;">${data.status}</span>
                </div>
                <p class="drawer-project-tagline" style="font-family: var(--font-mono); font-size: 10px; color: var(--neon-cyan); margin-bottom: 16px;">${data.tagline}</p>
                <div class="project-tags-row">
                    ${tagsHtml}
                </div>
            </div>

            <div class="drawer-section" style="margin-bottom: 20px;">
                <h4 style="font-family: var(--font-mono); font-size: 9px; color: var(--neon-purple); letter-spacing: 1px; margin-bottom: 6px; text-transform: uppercase;">[ THE PROBLEM (Why it was needed) ]</h4>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.65;">${data.problem}</p>
            </div>

            <div class="drawer-section" style="margin-bottom: 20px;">
                <h4 style="font-family: var(--font-mono); font-size: 9px; color: var(--neon-purple); letter-spacing: 1px; margin-bottom: 6px; text-transform: uppercase;">[ THE SOLUTION (What I built) ]</h4>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.65;">${data.whatIBuilt}</p>
            </div>

            <div class="drawer-section" style="margin-bottom: 20px;">
                <h4 style="font-family: var(--font-mono); font-size: 9px; color: var(--neon-purple); letter-spacing: 1px; margin-bottom: 6px; text-transform: uppercase;">[ ENGINEERING ROLE ]</h4>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.65;">${data.myRole}</p>
            </div>

            <div class="drawer-section" style="margin-bottom: 20px;">
                <h4 style="font-family: var(--font-mono); font-size: 9px; color: var(--neon-purple); letter-spacing: 1px; margin-bottom: 6px; text-transform: uppercase;">[ SYSTEM INNOVATION (What makes it special) ]</h4>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.65;">${data.special}</p>
            </div>

            <div class="drawer-section" style="margin-bottom: 20px;">
                <h4 style="font-family: var(--font-mono); font-size: 9px; color: var(--neon-purple); letter-spacing: 1px; margin-bottom: 6px; text-transform: uppercase;">[ READINESS STATUS ]</h4>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.65;">${data.currentStatus}</p>
            </div>

            <div class="drawer-section" style="margin-bottom: 20px;">
                <h4 style="font-family: var(--font-mono); font-size: 9px; color: var(--neon-purple); letter-spacing: 1px; margin-bottom: 6px; text-transform: uppercase;">[ FUTURE ROADMAP ]</h4>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.65;">${data.nextImprovement}</p>
            </div>

            ${liveButtonHtml}
        `;

        drawer.style.display = 'block';
        drawer.offsetHeight; // Force reflow to ensure CSS transitions run smoothly
        drawer.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
    }

    function closeCaseStudy() {
        if (drawer) {
            drawer.classList.remove('active');
            drawer.setAttribute('aria-hidden', 'true');
            // Set display to none after transition completes to remove from layout
            setTimeout(() => {
                if (!drawer.classList.contains('active')) {
                    drawer.style.display = 'none';
                }
            }, 400);
        }
    }

    // Attach click listeners to all open-case-study triggers
    document.querySelectorAll('[data-open-case-study]').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-open-case-study');
            openCaseStudy(key);
        });
    });

    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeCaseStudy);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeCaseStudy);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCaseStudy();
    });

    // --- 9. SECURE COMMUNICATIONS CONTACT UPLINK TRANSMITTER ---
    const contactForm = document.getElementById('secure-contact-form');
    const formConsole = document.getElementById('form-console');
    const submitBtn = document.getElementById('submit-packet-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const sender = document.getElementById('sender_identity').value.trim();
            const callback = document.getElementById('callback_coordinate').value.trim();
            const message = document.getElementById('communications_payload').value.trim();

            if (!sender || !callback || !message) return;

            // Lock controls
            submitBtn.disabled = true;
            submitBtn.textContent = "[ COMPILING... ]";
            
            const inputs = contactForm.querySelectorAll('.form-input');
            inputs.forEach(inp => inp.disabled = true);

            // Sequential compilation simulation logs
            const sendLogs = [
                `sys_uplink:// Initiating contact packet structure...`,
                `sys_uplink:// Resolving local callback coordinate: [${callback}]`,
                `sys_uplink:// Validating message payload integrity...`,
                `sys_uplink:// Packaging payload for local routing...`,
                `sys_uplink:// Compiling final envelope: samuel@olabode.com`,
                `sys_uplink:// LOCAL TRANSMISSION PREPARATION COMPLETE.`
            ];

            let logStep = 0;
            
            function printFormProgress() {
                if (logStep < sendLogs.length) {
                    formConsole.innerHTML = `<span class="console-prompt highlight-cyan">${sendLogs[logStep]}</span>`;
                    
                    // Also print to active main terminal log!
                    printCliOutput(sendLogs[logStep]);
                    
                    logStep++;
                    setTimeout(printFormProgress, 400);
                } else {
                    // Inject action buttons
                    formConsole.innerHTML = `
                        <div class="console-actions-wrapper" style="display: flex; flex-direction: column; width: 100%; gap: 6px;">
                            <span class="console-prompt highlight-green" style="margin-bottom: 2px;">status:// Envelope compiled. Action required:</span>
                            <div class="console-action-buttons-row" style="display: flex; gap: 8px;">
                                <button type="button" class="console-btn-action" id="action-mail-client" style="flex: 1; background: transparent; border: 1px solid var(--neon-cyan); border-radius: 4px; padding: 4px 8px; font-family: var(--font-mono); font-size: 8px; color: var(--neon-cyan); cursor: pointer; transition: var(--transition-smooth);">[ OPEN MAIL CLIENT ]</button>
                                <button type="button" class="console-btn-action" id="action-copy-clipboard" style="flex: 1; background: transparent; border: 1px solid var(--neon-purple); border-radius: 4px; padding: 4px 8px; font-family: var(--font-mono); font-size: 8px; color: var(--neon-purple); cursor: pointer; transition: var(--transition-smooth);">[ COPY CLIPBOARD ]</button>
                            </div>
                        </div>
                    `;

                    // Set up event listeners for the action buttons
                    const mailBtn = document.getElementById('action-mail-client');
                    const copyBtn = document.getElementById('action-copy-clipboard');

                    if (mailBtn) {
                        mailBtn.addEventListener('click', () => {
                            const mailtoUrl = `mailto:samuel@olabode.com?subject=Inquiry from Olabode OS&body=Hi Samuel,%0A%0A${encodeURIComponent(message)}%0A%0ABest regards,%0A${encodeURIComponent(sender)}%0A(${encodeURIComponent(callback)})`;
                            window.location.href = mailtoUrl;
                            printCliOutput("sys_network:// Redirected to local email client.");
                        });
                    }

                    if (copyBtn) {
                        copyBtn.addEventListener('click', () => {
                            const formattedText = `From: ${sender} (${callback})\nMessage: ${message}`;
                            navigator.clipboard.writeText(formattedText).then(() => {
                                copyBtn.textContent = "[ COPIED! ]";
                                printCliOutput("sys_network:// Copied contact details payload to clipboard.");
                                setTimeout(() => {
                                    copyBtn.textContent = "[ COPY CLIPBOARD ]";
                                }, 2000);
                            });
                        });
                    }
                    
                    // Reset inputs
                    contactForm.reset();
                    inputs.forEach(inp => inp.disabled = false);
                    submitBtn.disabled = false;
                    submitBtn.textContent = "[ COMPILE_MESSAGE.EXE ]";

                    // Notify in main CLI
                    printCliOutput("sys_network:// Contact envelope compiled. Complete action in bottom uplink terminal.", true);
                    const netLine = cliOutputLog.lastChild;
                    netLine.classList.add('success');
                }
            }

            printFormProgress();
        });
    }

    // --- 10. PREMIUM 3D-LITE PARALLAX FOR HERO WINDOW ---
    const heroWindow = document.querySelector('.hero-window');
    if (heroWindow) {
        const handleMouseMove = (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                heroWindow.style.transform = '';
                return;
            }

            const rect = heroWindow.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within element
            const y = e.clientY - rect.top;  // y position within element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation values (limit rotation to about 2.5 degrees max)
            const rotateX = ((centerY - y) / centerY) * 2.5; 
            const rotateY = ((x - centerX) / centerX) * 2.5;
            
            heroWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        };

        const handleMouseLeave = () => {
            heroWindow.style.transform = '';
        };

        // Use passive listener to avoid blocking scroll and keep performance buttery smooth
        heroWindow.addEventListener('mousemove', handleMouseMove, { passive: true });
        heroWindow.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
