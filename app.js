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

    // --- SIGNATURE HERO DECK CONTROLLER ---
    const mockupCards = document.querySelectorAll('.mockup-card');
    
    function setDeckActive(projectKey) {
        const targetCard = document.querySelector(`.mockup-card[data-deck-project="${projectKey}"]`);
        if (!targetCard) return;
        
        const styleAttr = targetCard.getAttribute('style') || '';
        const match = styleAttr.match(/--index:\s*(\d+)/);
        if (!match) return;
        const activeIndex = parseInt(match[1]);
        
        mockupCards.forEach(card => {
            card.classList.remove('active', 'deck-pos-1', 'deck-pos-2');
            const cardStyle = card.getAttribute('style') || '';
            const cardMatch = cardStyle.match(/--index:\s*(\d+)/);
            if (!cardMatch) return;
            const cardIndex = parseInt(cardMatch[1]);
            
            if (cardIndex === activeIndex) {
                card.classList.add('active');
            } else if (cardIndex === (activeIndex + 1) % 3) {
                card.classList.add('deck-pos-1');
            } else if (cardIndex === (activeIndex + 2) % 3) {
                card.classList.add('deck-pos-2');
            }
        });
    }

    // Initialize initial state deck-pos classes
    setDeckActive('mamaguard');
    
    mockupCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-deck-project');
            setDeckActive(projectKey);
            
            // Also print update to terminal
            printCliOutput(`sys_deck:// Focused deck project mockup [${projectKey.toUpperCase()}].`, true);
            const line = cliOutputLog.lastChild;
            if (line && line.classList) {
                line.classList.add('system');
            }
        });
    });

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
                
                // Trigger mockup deck rotation for active projects
                if (['mamaguard', 'chikini', 'bethel'].includes(cmdText)) {
                    setDeckActive(cmdText);
                }
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
            problem: "Quick-service food enterprises in high-volume settings struggle with synchronization latency between point-of-sale systems, kitchen preparation status logs, and administrative inventory trackers. This leads to operational bottlenecks, wrong orders, and untracked ingredient utilization.",
            whatIBuilt: "Architected a unified hospitality operations simulator. Created three synchronized workspaces: a customer digital menu catalog for order dispatch, an administrative kitchen terminal queue tracking ticket ages, and a manager dashboard presenting real-time business health indicators.",
            myRole: "Solo Product Architect & Frontend Engineer. Conceived the visual design system, set up the global state orchestrator, and programmed the real-time simulation queues.",
            stack: ["React", "TailwindCSS", "State Isolation", "Status Checker"],
            special: "Features an integrated offline-first branch network health monitor. The application performs defensive connectivity handshakes before executing data state transitions, preventing local queues from breaking during simulated dropouts.",
            currentStatus: "Staging demo deployed to Vercel. Fully optimized for customer reviews and operational walkthroughs.",
            liveLink: "https://chikini-monie-one.vercel.app/",
            liveLinkLabel: "Launch Live Demo",
            nextImprovement: "Connect to local node endpoints to test webhooks and persistent state storage using Redis queues."
        },
        aristo: {
            title: "Aristo Afrikana",
            tagline: "Premium Restaurant Website & Luxury Digital Upgrade",
            status: "Client Proposal Direction",
            statusClass: "client-proposal",
            problem: "Bespoke fine-dining and cultural brands require digital portals that match the premium visual and tactile standards of their physical establishments. Standard pre-packaged booking tools or low-tier templates fail to communicate prestige and lead to low booking conversion rates.",
            whatIBuilt: "Created a premium digital brand portal for Aristo Afrikana. Built an immersive visual landing page featuring bespoke layout structures, a multi-tier reservation pipeline (Fine Dining, Lounge reservations, and Event tickets), and sleek parallax interactions.",
            myRole: "Lead UI/UX Developer & Brand Strategist. Engineered the custom layout structures, set up the CSS token system, and optimized graphic assets for rapid browser loading.",
            stack: ["HTML5", "Vanilla CSS3", "Javascript (ES6)", "Custom CSS Variables"],
            special: "Authored 100% custom CSS code without any third-party framework layout overhead (like Bootstrap or Tailwind). The entire site maintains lightweight, sub-second visual load performance indices and scales responsively on viewports down to 320px.",
            currentStatus: "Staging sandbox proposal live on Vercel, demonstrating design viability to target client stakeholders.",
            liveLink: "https://aristo-africana.vercel.app/",
            liveLinkLabel: "Proposal Sandbox Preview",
            nextImprovement: "Implement an interactive digital table reservation engine using customized SVG maps."
        },
        predchain: {
            title: "PredChain",
            tagline: "Experimental Predictive Blockchain Pool Dashboard",
            status: "Experimental Build",
            statusClass: "experimental",
            problem: "Web3 predictive pools and decentralized staking applications require deep technical clarity, yet most dashboards overload the user with complex charts and fail to handle network errors gracefully during high-velocity state changes.",
            whatIBuilt: "Constructed a high-fidelity prediction pool management dashboard featuring reactive pool statistics, staking analytics graphs, and interactive contract validation triggers.",
            myRole: "Frontend Developer & Interface Hardener. Integrated the state machine, styled interactive chart components, and implemented error-handling screens.",
            stack: ["TypeScript", "Next.js", "Atomic State Isolation", "TailwindCSS"],
            special: "Engineered strict atomic state isolation guards inside the frontend container to securely simulate block transactions and prevent race-condition UI regressions.",
            currentStatus: "Functional experimental repository. Verified and frozen as a master design token reference point.",
            liveLink: "https://predchain.vercel.app/",
            liveLinkLabel: "Launch Live Site",
            nextImprovement: "Connect direct wallet providers (MetaMask, WalletConnect) to EVM testnet pools."
        },
        mamaguard: {
            title: "Mama Guard",
            tagline: "Maternal Health Tracking & Support Platform",
            status: "Live Beta",
            statusClass: "live-beta",
            problem: "In low-income and under-resourced medical environments, pregnant mothers face significant challenges tracking pregnancy milestones, identifying dangerous symptoms, and coordinating timely contact with clinical providers. Fragmented health education and lack of instant, offline-capable digital logs lead to delayed care and avoidable prenatal risks.",
            whatIBuilt: "Engineered Mama Guard, an interactive maternal support simulator and patient portal. Built a responsive vital health symptom logger, a guidelines lookup dashboard, and a provider summary dashboard that simulates data syncs. Designed as a high-fidelity patient-facing interface to model how critical symptoms can be structured and communicated to clinicians under varying bandwidth constraints.",
            myRole: "Solo Frontend Architect & System Designer. Responsible for prototyping the complete client-side simulation, designing the dashboard data structures, setting up local state tracking, and building the user interaction flow.",
            stack: ["React", "Next.js", "TailwindCSS", "Vercel Serverless Functions"],
            special: "Engineered an offline-first service architecture utilizing service caching simulations, allowing the client-side system to load educational safety checklists and previous symptom logs without an active internet connection. Programmed automatic queue sync triggers that mock data dispatch as soon as the simulated network is restored.",
            currentStatus: "Technical verification prototype and high-fidelity simulator. Active demo deployed to Vercel for stakeholder reviews and UI/UX validation.",
            liveLink: "https://guard-pink.vercel.app/",
            liveLinkLabel: "Launch Live Beta",
            nextImprovement: "Refine simulated offline queues with a local IndexedDB store and implement a secure SMS fallback engine for offline alert delivery.",
            disclaimer: "IMPORTANT SAFETY & PROTOTYPE DISCLAIMER: Mama Guard is a high-fidelity diagnostic simulation and interactive prototype built for technology verification. It is NOT a medical-grade or HIPAA-compliant system, does not diagnose or treat medical conditions, and should not be used as a substitute for professional clinical guidance or emergency services."
        },
        bethel: {
            title: "Bethel Portal",
            tagline: "Unified Community Portal & Media Hub",
            status: "Live Demo",
            statusClass: "live-demo",
            problem: "Local faith and community organizations often lack unified web spaces to archive weekly media, broadcast streams, organize coordinates, and manage weekly calendars, resulting in fragmented communication across external third-party platforms.",
            whatIBuilt: "Developed a unified community media portal. Integrated a custom audio playback queue with interactive waveforms, a searchable media archive, a digital bulletin registry, and community contact logs.",
            myRole: "Solo Full-Stack Developer. Designed the database structure (simulated), frontend architecture, and custom audio playback hooks.",
            stack: ["HTML5", "Vanilla CSS3", "Javascript (ES6)", "Local Playback Stream APIs"],
            special: "Features a custom local state playback tracker. The sermon player remembers user positions across refreshes, providing a seamless resume function without database overhead.",
            currentStatus: "Functional staging production build verified and optimized for church administrative evaluation.",
            liveLink: "",
            liveLinkLabel: "Staging Preview Locked",
            nextImprovement: "Integrate live stream video API endpoints and a real-time event notice bulletin."
        },
        proof: {
            title: "Proof",
            tagline: "Premium Gamified 7-Day Challenge Suite",
            status: "Live Beta",
            statusClass: "live-beta",
            problem: "Modern software platforms suffer from severe drop-offs during the initial 7 days of onboarding because user registrations are typically dry, multi-step, and lack immediate interactive feedback and validation.",
            whatIBuilt: "Designed and developed Proof, an onboarding validation prototype that gamifies a user's first 7 days. Built a milestone tracker, interactive task lists with reactive feedback loops, and an integrated progress metric gauge.",
            myRole: "Lead Product & Interaction Engineer. Authored the step-by-step state machine, designed interactive animations, and verified responsive layouts.",
            stack: ["React", "CSS Variables", "Interactive State Tracking", "GSAP Transitions"],
            special: "Utilized hardware-accelerated CSS and optimized requestAnimationFrame hooks to keep animation pipelines running at 60fps even on mobile devices.",
            currentStatus: "Stable beta demo live on Vercel, functioning as a reusable onboarding pattern blueprint.",
            liveLink: "https://proof-7-day-beta.vercel.app/",
            liveLinkLabel: "Launch Live Beta",
            nextImprovement: "Implement user behavior cohort analytics to trace milestone drop-off points."
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

        let disclaimerHtml = '';
        if (data.disclaimer) {
            disclaimerHtml = `
                <div class="drawer-section disclaimer-box" style="margin-bottom: 20px; padding: 12px; border: 1px solid #ff5f56; background: rgba(255, 95, 86, 0.05); border-radius: 4px;">
                    <h4 style="font-family: var(--font-mono); font-size: 9px; color: #ff5f56; letter-spacing: 1px; margin-bottom: 6px; text-transform: uppercase;">[ SAFETY & PROTOTYPE DISCLAIMER ]</h4>
                    <p style="font-size: 11px; color: #ff8882; line-height: 1.5; font-family: var(--font-mono);">${data.disclaimer}</p>
                </div>
            `;
        }

        let screenshotsHtml = '';
        if (projectKey !== 'bethel') {
            screenshotsHtml = `
                <div class="drawer-section" style="margin-bottom: 20px;">
                    <h4 style="font-family: var(--font-mono); font-size: 9px; color: var(--neon-purple); letter-spacing: 1px; margin-bottom: 6px; text-transform: uppercase;">[ PROJECT SCREENSHOTS (Click to enlarge) ]</h4>
                    <div class="drawer-media-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px;">
                        <div class="drawer-media-card" style="border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; overflow: hidden; background: rgba(0, 0, 0, 0.3); cursor: pointer;">
                            <img src="assets/projects/${projectKey}/desktop.webp" alt="${data.title} Desktop Screenshot" class="screenshot-img" style="width: 100%; height: auto; aspect-ratio: 1440/900; object-fit: cover; display: block;" loading="lazy">
                            <div style="font-family: var(--font-mono); font-size: 8px; color: var(--text-muted); padding: 4px 6px; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">DESKTOP VIEW</div>
                        </div>
                        <div class="drawer-media-card" style="border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; overflow: hidden; background: rgba(0, 0, 0, 0.3); cursor: pointer;">
                            <img src="assets/projects/${projectKey}/mobile.webp" alt="${data.title} Mobile Screenshot" class="screenshot-img" style="width: 100%; height: auto; aspect-ratio: 375/800; object-fit: cover; display: block;" loading="lazy">
                            <div style="font-family: var(--font-mono); font-size: 8px; color: var(--text-muted); padding: 4px 6px; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">MOBILE VIEW</div>
                        </div>
                    </div>
                </div>
            `;
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

            ${disclaimerHtml}

            ${screenshotsHtml}

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
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
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

            // Restore body scroll only if lightbox is closed
            const lightbox = document.getElementById('media-lightbox');
            if (!lightbox || !lightbox.classList.contains('active')) {
                document.body.style.overflow = '';
            }
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
        if (e.key === 'Escape') {
            const lightbox = document.getElementById('media-lightbox');
            if (lightbox && lightbox.classList.contains('active')) {
                // Let lightbox escape handler handle it first
                return;
            }
            closeCaseStudy();
        }
    });

    // --- 8.5. LIGHTBOX IMAGES MODULE ---
    const lightbox = document.getElementById('media-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

    if (lightbox && lightboxImg && lightboxCaption && lightboxCloseBtn) {
        document.body.addEventListener('click', (e) => {
            const trigger = e.target.closest('.screenshot-img');
            if (trigger) {
                const src = trigger.getAttribute('src');
                if (!src) return;

                e.preventDefault();
                
                const altText = trigger.getAttribute('alt') || 'Project Preview';
                
                lightboxImg.src = src;
                lightboxCaption.textContent = altText;
                
                lightbox.style.display = 'flex';
                lightbox.offsetHeight; // Force reflow
                lightbox.classList.add('active');
                lightbox.setAttribute('aria-hidden', 'false');
                
                document.body.style.overflow = 'hidden';
            }
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            setTimeout(() => {
                if (!lightbox.classList.contains('active')) {
                    lightbox.style.display = 'none';
                    lightboxImg.src = '';
                }
            }, 300);
            
            // Restore scrolling unless drawer is still active
            if (!drawer || !drawer.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        };

        lightboxCloseBtn.addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
                e.stopPropagation();
            }
        });
    }

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
            const honeypot = document.getElementById('system_verify_token').value;

            if (!sender || !callback || !message) return;

            // Lock controls
            submitBtn.disabled = true;
            submitBtn.textContent = "SENDING...";
            
            const inputs = contactForm.querySelectorAll('.form-input');
            inputs.forEach(inp => inp.disabled = true);

            // Track form submit attempt
            window.trackEvent('contact-form-submit-attempt', { sender: sender });

            // Compilation simulation logs
            const sendLogs = [
                `sys_uplink:// Initiating contact packet structure...`,
                `sys_uplink:// Checking spam prevention registry...`,
                `sys_uplink:// Attempting connection to Vercel Serverless Uplink...`
            ];

            let logStep = 0;
            
            function printFormProgress() {
                if (logStep < sendLogs.length) {
                    formConsole.innerHTML = `<span class="console-prompt highlight-cyan">${sendLogs[logStep]}</span>`;
                    printCliOutput(sendLogs[logStep]);
                    logStep++;
                    setTimeout(printFormProgress, 400);
                } else {
                    // Send request to API
                    transmitPayload();
                }
            }

            async function transmitPayload() {
                try {
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sender_identity: sender,
                            callback_coordinate: callback,
                            communications_payload: message,
                            system_verify_token: honeypot
                        })
                    });

                    const data = await response.json();

                    if (response.ok && data.success) {
                        // Success logs
                        const successLogs = [
                            `sys_uplink:// Handshake established with endpoint.`,
                            `sys_uplink:// Sending encrypted payload...`,
                            `sys_uplink:// Message delivered successfully to olabodesamuel0920@gmail.com.`,
                            `sys_uplink:// TRANSMISSION COMPLETE. COORDINATE SECURED.`
                        ];
                        
                        let successStep = 0;
                        function printSuccessProgress() {
                            if (successStep < successLogs.length) {
                                formConsole.innerHTML = `<span class="console-prompt highlight-green">${successLogs[successStep]}</span>`;
                                printCliOutput(successLogs[successStep]);
                                successStep++;
                                setTimeout(printSuccessProgress, 400);
                            } else {
                                // Success state UI
                                formConsole.innerHTML = `<span class="console-prompt highlight-green">status:// Packet successfully transmitted. I will review and coordinate a callback shortly.</span>`;
                                printCliOutput("sys_network:// Contact message sent successfully via serverless API.", true);
                                
                                const netLine = cliOutputLog.lastChild;
                                if (netLine) netLine.classList.add('success');

                                // Track success
                                window.trackEvent('contact-form-submit-success');

                                // Reset form but keep controls active after a delay
                                contactForm.reset();
                                setTimeout(() => {
                                    inputs.forEach(inp => inp.disabled = false);
                                    submitBtn.disabled = false;
                                    submitBtn.textContent = "Send Message →";
                                }, 3000);
                            }
                        }
                        printSuccessProgress();
                    } else {
                        // API error or failure
                        throw new Error(data.error || 'Server rejected packet');
                    }
                } catch (err) {
                    console.warn('API Uplink offline or error, falling back to local client compilation:', err);
                    
                    // Fallback logs
                    const fallbackLogs = [
                        `sys_uplink:// API Endpoint offline: ${err.message || 'unknown error'}`,
                        `sys_uplink:// Initializing fallback local compilation...`,
                        `sys_uplink:// LOCAL TRANSMISSION PREPARATION COMPLETE.`
                    ];

                    let fallbackStep = 0;
                    function printFallbackProgress() {
                        if (fallbackStep < fallbackLogs.length) {
                            formConsole.innerHTML = `<span class="console-prompt highlight-yellow">${fallbackLogs[fallbackStep]}</span>`;
                            printCliOutput(fallbackLogs[fallbackStep]);
                            fallbackStep++;
                            setTimeout(printFallbackProgress, 400);
                        } else {
                            // Inject fallback buttons
                            formConsole.innerHTML = `
                                <div class="console-actions-wrapper" style="display: flex; flex-direction: column; width: 100%; gap: 10px;">
                                    <span class="console-prompt highlight-yellow" style="margin-bottom: 4px;">Uplink offline. Send your message manually:</span>
                                    <div class="console-action-buttons-row" style="display: flex; gap: 12px; width: 100%;">
                                        <button type="button" class="console-btn-action" id="action-mail-client" style="flex: 1; background: var(--neon-cyan); border: none; border-radius: 6px; padding: 10px 14px; font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: #050508; cursor: pointer; transition: var(--transition-smooth); text-transform: uppercase;">Open Mail Client</button>
                                        <button type="button" class="console-btn-action" id="action-copy-clipboard" style="flex: 1; background: transparent; border: 1px solid var(--neon-purple); border-radius: 6px; padding: 10px 14px; font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: var(--neon-purple); cursor: pointer; transition: var(--transition-smooth); text-transform: uppercase;">Copy Details</button>
                                    </div>
                                </div>
                            `;

                            const mailBtn = document.getElementById('action-mail-client');
                            const copyBtn = document.getElementById('action-copy-clipboard');

                            if (mailBtn) {
                                mailBtn.addEventListener('click', () => {
                                    const mailtoUrl = `mailto:olabodesamuel0920@gmail.com?subject=Inquiry from Olabode OS&body=Hi Samuel,%0A%0A${encodeURIComponent(message)}%0A%0ABest regards,%0A${encodeURIComponent(sender)}%0A(${encodeURIComponent(callback)})`;
                                    window.location.href = mailtoUrl;
                                    printCliOutput("sys_network:// Redirected to local email client.");
                                    window.trackEvent('contact-fallback-mail-click');
                                });
                            }

                            if (copyBtn) {
                                copyBtn.addEventListener('click', () => {
                                    const formattedText = `From: ${sender} (${callback})\nMessage: ${message}`;
                                    navigator.clipboard.writeText(formattedText).then(() => {
                                        copyBtn.textContent = "COPIED!";
                                        printCliOutput("sys_network:// Copied contact details payload to clipboard.");
                                        window.trackEvent('contact-fallback-copy-click');
                                        setTimeout(() => {
                                            copyBtn.textContent = "COPY DETAILS";
                                        }, 2000);
                                    });
                                });
                            }

                            // Reset and enable
                            contactForm.reset();
                            inputs.forEach(inp => inp.disabled = false);
                            submitBtn.disabled = false;
                            submitBtn.textContent = "Send Message →";

                            // Track fallback
                            window.trackEvent('contact-form-submit-fallback', { reason: err.message });

                            // Notify in main CLI
                            printCliOutput("sys_network:// Contact envelope compiled locally. Complete action in bottom uplink terminal.", true);
                            const netLine = cliOutputLog.lastChild;
                            if (netLine) netLine.classList.add('success');
                        }
                    }
                    printFallbackProgress();
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
            window.trackEvent('back-to-top-click');
        });
    }

    // --- 11. LIGHTWEIGHT ANALYTICS EVENT ORCHESTRATOR ---
    window.trackEvent = function(eventName, eventParams = {}) {
        console.log(`[Analytics] Track Event: ${eventName}`, eventParams);
        
        // Forward to Vercel Analytics if active
        if (typeof window.va === 'function') {
            window.va('event', { name: eventName, data: eventParams });
        }
        
        // Forward to Google Analytics if active
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, eventParams);
        }
    };

    document.body.addEventListener('click', (e) => {
        // 1. Direct data-analytics attributes
        const target = e.target.closest('[data-analytics]');
        if (target) {
            const eventName = target.getAttribute('data-analytics');
            const label = target.textContent.trim();
            window.trackEvent(eventName, {
                label: label,
                url: window.location.href
            });
            return;
        }

        // 2. Project View Details button
        const detailsBtn = e.target.closest('[data-open-case-study]');
        if (detailsBtn) {
            const project = detailsBtn.getAttribute('data-open-case-study');
            window.trackEvent('view-project-details', { project: project });
            return;
        }

        // 3. Project View Live Site button
        const liveBtn = e.target.closest('.live-link-btn');
        if (liveBtn) {
            if (liveBtn.classList.contains('disabled-btn') || liveBtn.disabled) return;
            const href = liveBtn.getAttribute('href') || 'static-waveform';
            window.trackEvent('view-project-live', { href: href });
            return;
        }

        // 4. Project View GitHub repo link
        const repoLink = e.target.closest('.repo-link-btn');
        if (repoLink) {
            const href = repoLink.getAttribute('href');
            window.trackEvent('view-project-repo', { href: href });
            return;
        }

        // 5. Contact fallback mail client
        const mailFallback = e.target.closest('#action-mail-client');
        if (mailFallback) {
            window.trackEvent('contact-fallback-mail');
            return;
        }

        // 6. Contact fallback copy clipboard
        const copyFallback = e.target.closest('#action-copy-clipboard');
        if (copyFallback) {
            window.trackEvent('contact-fallback-copy');
            return;
        }
    });

});
