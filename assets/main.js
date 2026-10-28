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
        "flagDescription": "Welcome to Hwalbin, curious explorer.",
        "flagClose": "Close",
        "skip": "Skip to content",
        "navAbout": "About",
        "navResearch": "Research",
        "navActivity": "Activities",
        "hero": "We are Hwalbin, a hacking team competing in international CTFs and researching security vulnerabilities.",
        "heroFootnote": "International CTFs · Security research · Bug bounties",
        "heroScroll": "Learn more",
        "exploreAbout": "About the team",
        "exploreActivities": "View activities",
        "aboutTitle": "About the team",
        "aboutLead": "Solve the challenge. Understand how it works.",
        "aboutTeam": "Hwalbin is a hacking team that competes in international CTFs and researches security vulnerabilities. We analyze challenges together, share solutions, and report vulnerabilities within the authorized scope of bug bounty programs.",
        "factActivity": "Activities",
        "factActivityValue": "International CTFs · Bug bounties",
        "factResearch": "Topics introduced",
        "factResearchValue": "Web · Systems · Reversing · Cryptography",
        "factRecord": "Public records",
        "researchTitle": "Research areas",
        "researchIntro": "Four approaches to understanding security.",
        "webTab": "Web security",
        "systemTab": "System security",
        "reverseTab": "Reverse engineering",
        "cryptoTab": "Cryptography",
        "webHeading": "From service behavior to vulnerabilities.",
        "webDesc": "Web security analyzes HTTP traffic, authentication, authorization, and browser and server behavior. It examines vulnerabilities in how services process input and exchange data.",
        "systemHeading": "Follow memory and execution flow.",
        "systemDesc": "System security analyzes memory structures, operating systems, and program execution. It examines the causes of memory vulnerabilities and the defenses that prevent them.",
        "reverseHeading": "Read program behavior from binaries.",
        "reverseDesc": "Reverse engineering analyzes compiled programs to understand their logic and data flow. Assembly and debugging reveal program behavior without source code.",
        "cryptoHeading": "Examine cryptographic design and implementation.",
        "cryptoDesc": "Cryptography examines the mathematics behind cryptographic algorithms and protocols, including vulnerabilities caused by gaps between design assumptions and implementation.",
        "activityTitle": "Activity records",
        "internationalCTF": "International CTF",
        "featuredRank": "10<span>th</span>",
        "featuredTotal": "out of 608 teams",
        "featuredDesc": "An international online CTF.<br>We scored 1,907 points in the official results on CTFtime.",
        "resultLink": "View competition results",
        "recentRecords": "Competition history",
        "recordSource": "Source: CTFtime · Dates in Korea Standard Time",
        "faqTitle": "Frequently asked questions",
        "faqIntro": "About the team and our activities.",
        "faqTeamQ": "What kind of team is Hwalbin?",
        "faqTeamA": "We are a hacking team that competes in international CTFs, researches security vulnerabilities, and participates in bug bounty programs.",
        "faqFieldsQ": "Which fields do you explore?",
        "faqFieldsA": "This page introduces web security, system security, reverse engineering, and cryptography. Select a research tab to read about each area.",
        "faqJoinQ": "Can I apply to join the team?",
        "faqJoinA": "There is currently no recruitment announcement on this website.",
        "faqRecordQ": "Where can I find competition records?",
        "faqRecordA": "Hwalbin’s CTFtime team profile lists our competition history and results.",
        "backTop": "Back to top",
        "historyLink": "All records on CTFtime",
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
        themeColor.content = dark ? '#111110' : '#f3f0e9';
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
            ? 'Hwalbin is a hacking team competing in international CTFs and researching security vulnerabilities. Explore our team, research areas, and competition records.'
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
    window.matchMedia('(max-width: 760px)').addEventListener('change', closeMenu);
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
