"use strict";
// The Korean copy stays in index.html so it remains readable without JavaScript.
// English translations are authored markup; no user supplied HTML is inserted.
(() => {
    function required(selector) {
        const element = document.querySelector(selector);
        if (!element)
            throw new Error(`Missing page element: ${selector}`);
        return element;
    }
    const root = document.documentElement;
    const themeButton = required('.theme');
    const menuButton = required('.menu');
    const nav = required('.nav');
    const languageButton = required('.language');
    const description = required('meta[name="description"]');
    const themeColor = required('meta[name="theme-color"]');
    const koreanDescription = description.content;
    const english = {
        "flagTitle": "You found the flag!",
        "flagDescription": "Stay curious. Welcome to Hwalbin.",
        "flagClose": "Close",
        "skip": "Skip to content",
        "navAbout": "About",
        "navResearch": "Research",
        "navActivity": "Activities",
        "hero": "<strong>Hey there! New to security?</strong><br>Hacking team: Hwalbin<br>International CTF competitions · Bug bounty hunting",
        "exploreAbout": "Meet Hwalbin",
        "exploreActivities": "Explore our activities",
        "aboutTitle": "Question the familiar.<br>Discover <em>new possibilities.</em>",
        "aboutCuriosity": "How do systems work? What lies beneath the technology we use every day? Hwalbin starts with a spark of curiosity.",
        "aboutTeam": "Hwalbin is a hacking team that competes in international CTFs and takes part in bug bounty programs. We solve challenges, uncover vulnerabilities, and share what we learn to build a safer tomorrow.",
        "valueCuriosity": "Curiosity that goes deeper",
        "valueCuriosityDesc": "Go beyond the answer to understand the principles behind it.",
        "valueResponsibility": "Responsibility in technology",
        "valueResponsibilityDesc": "Turn discoveries into safer technology.",
        "valueTogether": "A culture of growing together",
        "valueTogetherDesc": "Our questions and experiences inspire the next challenge.",
        "researchTitle": "Beyond the surface.<br><em>Inside the technology.</em>",
        "researchIntro": "From the web and systems to binaries and cryptography.<br>We explore security from different perspectives.",
        "webTab": "Web security",
        "systemTab": "System security",
        "reverseTab": "Reverse engineering",
        "cryptoTab": "Cryptography",
        "webDesc": "We examine the invisible trust boundaries between browsers and servers. By understanding how the web works, we explore how to design secure services.",
        "systemDesc": "We explore memory, operating systems, and program execution. We study system fundamentals and defenses to understand how to build robust software.",
        "reverseDesc": "We work backward from compiled programs to understand their design and behavior. Analyzing binaries and execution paths helps us uncover the story behind the code.",
        "cryptoDesc": "We explore how mathematics protects information. We study cryptographic algorithms and protocols, and what it takes to implement them securely.",
        "activityTitle": "Questions <em>lead to action.</em>",
        "activityBadge": "International CTFs · Bug bounties",
        "ctfTitle": "Competing in international CTFs",
        "ctfDesc": "We combine our strengths to solve challenges in international CTF competitions, then share our solutions and lessons learned.",
        "ctfLink": "CTFtime team profile",
        "ctfMore": "About our CTF activities",
        "ctfDetail": "We compete as a team in international Capture The Flag (CTF) hacking competitions. Tackling a wide range of security challenges builds our practical skills and teamwork.",
        "studyTitle": "From personal discoveries to shared knowledge",
        "studyDesc": "From fundamentals to advanced topics,<br>we study together and learn from one another.",
        "studyMore": "About our study groups",
        "studyDetail": "This space introduces our study groups and technical seminars. Topics, schedules, and public resources will be posted here when they are available.",
        "bountyTitle": "Bug bounty hunting",
        "bountyDesc": "We discover and report vulnerabilities in real-world services, turning security research into safer services.",
        "bountyMore": "About our bug bounty work",
        "bountyDetail": "We investigate vulnerabilities within the authorized scope of bug bounty programs and responsibly report our findings to the affected services.",
        "faqTitle": "Curious <em>about Hwalbin?</em>",
        "faqIntro": "Learn about the team and how to get involved.",
        "faqTeamQ": "What kind of team is Hwalbin?",
        "faqTeamA": "Hwalbin is a hacking team that competes in international CTFs and participates in bug bounty programs. We solve security challenges, explore vulnerabilities in real-world services, and share our experience and knowledge.",
        "faqFieldsQ": "Which fields do you explore?",
        "faqFieldsA": "This demo covers web security, system security, reverse engineering, and cryptography. These areas can be adjusted to reflect the team’s actual research focus.",
        "faqJoinQ": "Can I apply to join the team?",
        "faqJoinA": "This demo does not accept applications. Recruitment status, eligibility, and dates will be published once the team’s official announcement is ready.",
        "faqContactQ": "How can I get in touch or collaborate?",
        "faqContactA": "Official contact channels are being prepared. Links to the team’s verified email or social channels will be added here when available.",
        "closing": "Hwalbin. Opening the door to what comes next.",
        "backTop": "Back to top",
        "demo": "Design demo · ",
        "historyLink": "View our activity on CTFtime ↗",
        "homeLabel": "Hwalbin home",
        "navLabel": "Main navigation",
        "researchLabel": "Research areas",
        "ctfLabel": "CTFtime team profile (opens in a new tab)",
        "historyLabel": "View Hwalbin’s activity on CTFtime (opens in a new tab)"
    };
    function translationKey(key) {
        if (key && Object.hasOwn(english, key))
            return key;
        throw new Error(`Missing translation: ${key ?? '(empty key)'}`);
    }
    const localizedContent = Array.from(document.querySelectorAll('[data-i18n]'), element => ({
        element,
        key: translationKey(element.dataset.i18n),
        korean: element.innerHTML,
    }));
    const localizedLabels = Array.from(document.querySelectorAll('[data-i18n-label]'), element => {
        const korean = element.getAttribute('aria-label');
        if (korean === null)
            throw new Error('A translated label needs an aria-label');
        return { element, key: translationKey(element.dataset.i18nLabel), korean };
    });
    let language = 'ko';
    let currentTheme = 'dark';
    function updateMenuLabel() {
        const open = nav.classList.contains('open');
        menuButton.textContent = language === 'en'
            ? (open ? 'Close −' : 'Menu +')
            : (open ? '닫기 −' : '메뉴 +');
    }
    function setTheme(value) {
        currentTheme = value;
        root.dataset.theme = value;
        const dark = value === 'dark';
        const label = language === 'en'
            ? (dark ? 'Switch to light theme' : 'Switch to dark theme')
            : (dark ? '밝은 테마로 전환' : '어두운 테마로 전환');
        themeButton.setAttribute('aria-label', label);
        themeButton.title = label;
        themeButton.textContent = dark ? '☼' : '☾';
        themeColor.content = dark ? '#0b0d11' : '#f5f6fa';
    }
    function setLanguage(value) {
        language = value;
        root.lang = value;
        for (const { element, key, korean } of localizedContent) {
            element.innerHTML = value === 'en' ? english[key] : korean;
        }
        for (const { element, key, korean } of localizedLabels) {
            element.setAttribute('aria-label', value === 'en' ? english[key] : korean);
        }
        description.content = value === 'en'
            ? 'Hwalbin — a hacking team exploring a safer world through international CTF competitions and bug bounty programs. Official website design demo.'
            : koreanDescription;
        const label = value === 'en' ? '한국어로 전환' : 'Switch to English';
        languageButton.textContent = value === 'en' ? 'KO' : 'EN';
        languageButton.lang = value === 'en' ? 'ko' : 'en';
        languageButton.setAttribute('aria-label', label);
        languageButton.title = label;
        updateMenuLabel();
        setTheme(currentTheme);
    }
    try {
        const savedTheme = localStorage.getItem('hwalbin-theme');
        if (savedTheme === 'light' || savedTheme === 'dark')
            currentTheme = savedTheme;
        const savedLanguage = localStorage.getItem('hwalbin-language');
        if (savedLanguage === 'en' || savedLanguage === 'ko')
            language = savedLanguage;
    }
    catch {
        // The site still works when browser storage is unavailable.
    }
    setLanguage(language);
    languageButton.hidden = false;
    languageButton.addEventListener('click', () => {
        setLanguage(language === 'ko' ? 'en' : 'ko');
        try {
            localStorage.setItem('hwalbin-language', language);
        }
        catch { /* Storage may be blocked. */ }
    });
    themeButton.addEventListener('click', () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        try {
            localStorage.setItem('hwalbin-theme', currentTheme);
        }
        catch { /* Storage may be blocked. */ }
    });
    function closeMenu() {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        updateMenuLabel();
    }
    menuButton.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(open));
        updateMenuLabel();
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('open')) {
            closeMenu();
            menuButton.focus();
        }
    });
    const tabPanels = Array.from(document.querySelectorAll('[role="tab"]'), tab => {
        const panelId = tab.getAttribute('aria-controls');
        const panel = panelId && document.getElementById(panelId);
        if (!panel)
            throw new Error(`Missing panel for tab ${tab.id}`);
        return { tab, panel };
    });
    function activateTab(tab, focus = false) {
        for (const item of tabPanels) {
            const selected = item.tab === tab;
            item.tab.setAttribute('aria-selected', String(selected));
            item.tab.tabIndex = selected ? 0 : -1;
            item.panel.hidden = !selected;
        }
        if (focus)
            tab.focus();
    }
    tabPanels.forEach(({ tab }, index) => {
        tab.addEventListener('click', () => activateTab(tab));
        tab.addEventListener('keydown', event => {
            let next;
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
                next = (index + 1) % tabPanels.length;
            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
                next = (index + tabPanels.length - 1) % tabPanels.length;
            if (event.key === 'Home')
                next = 0;
            if (event.key === 'End')
                next = tabPanels.length - 1;
            if (next !== undefined) {
                event.preventDefault();
                activateTab(tabPanels[next].tab, true);
            }
        });
    });
    const links = Array.from(nav.querySelectorAll('a'));
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting)
                    continue;
                for (const link of links) {
                    const active = link.hash === `#${entry.target.id}`;
                    link.classList.toggle('active', active);
                    if (active)
                        link.setAttribute('aria-current', 'location');
                    else
                        link.removeAttribute('aria-current');
                }
            }
        }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
        document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
    }
    console.log('[HWALBIN] 눈에 보이는 것이 전부는 아닙니다. /robots.txt를 살펴보세요.');
    console.log('[HWALBIN] There is more than meets the eye. Take a look at /robots.txt.');
    const flagDialog = required('#flag-dialog');
    const flagValue = required('#flag-value');
    let logoClicks = 0;
    document.querySelectorAll('.brand').forEach(logo => {
        logo.addEventListener('click', event => {
            if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
                return;
            logoClicks += 1;
            if (logoClicks < 5)
                return;
            logoClicks = 0;
            event.preventDefault();
            flagValue.textContent = 'hwalbin{h3y_th3r3_w3lc0m3_t0_hw4lb1n_5ec}';
            if (!flagDialog.open)
                flagDialog.showModal();
        });
    });
})();
