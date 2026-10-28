// The Korean copy stays in the HTML pages so it remains readable without JavaScript.
// English translations are authored markup; no user supplied HTML is inserted.
(() => {
  type Language = 'ko' | 'en';
  type Theme = 'dark' | 'light';

  function required<T extends Element>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) throw new Error(`Missing page element: ${selector}`);
    return element;
  }

  const root = document.documentElement;
  const themeButton = required<HTMLButtonElement>('.theme');
  const menuButton = required<HTMLButtonElement>('.menu');
  const nav = required<HTMLElement>('.nav');
  const languageButton = required<HTMLButtonElement>('.language');
  const description = required<HTMLMetaElement>('meta[name="description"]');
  const themeColor = required<HTMLMetaElement>('meta[name="theme-color"]');
  const koreanDescription = description.content;

  const english = {
    "flagTitle": "You found the flag!",
    "flagDescription": "Welcome to Hwalbin, curious explorer.",
    "flagClose": "Close",
    "skip": "Skip to content",
    "navHome": "Home",
    "navAbout": "About",
    "navResearch": "Research",
    "navActivity": "Activities",
    "hero": "We are Hwalbin, a hacking team competing in international CTFs and researching security vulnerabilities.",
    "heroFootnote": "International CTFs · Security research · Bug bounties",
    "heroScroll": "Learn more",
    "exploreAbout": "About the team",
    "exploreActivities": "View activities",
    "portalTitle": "Explore Hwalbin",
    "portalIntro": "Turn a page and get to know the team.",
    "portalAbout": "How we solve and research together",
    "portalResearch": "Four perspectives, from web to cryptography",
    "portalActivity": "Our records in international CTFs",
    "paintingKicker": "One landscape, four research paths",
    "paintingTitle": "Read beyond the landscape",
    "paintingAlt": "A minhwa-inspired landscape with a hanok, pine trees, mountains, a river, and cranes",
    "aboutTitle": "About the team",
    "aboutSectionTitle": "How we work",
    "aboutPageIntro": "We analyze challenges together and share how they work.",
    "aboutLead": "Solve the challenge. Understand how it works.",
    "aboutTeam": "Hwalbin is a hacking team that competes in international CTFs and researches security vulnerabilities. We analyze challenges together, share solutions, and report vulnerabilities within the authorized scope of bug bounty programs.",
    "factActivity": "Activities",
    "factActivityValue": "International CTFs · Bug bounties",
    "factResearch": "Topics introduced",
    "factResearchValue": "Web · Systems · Reversing · Cryptography",
    "factRecord": "Public records",
    "researchTitle": "Research areas",
    "researchSectionTitle": "Four perspectives",
    "researchPageIntro": "Four perspectives on security problems.",
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
    "activitySectionTitle": "Competition results",
    "activityPageIntro": "Competition results collected in one place.",
    "internationalCTF": "International CTF",
    "featuredRank": "10<span>th</span>",
    "featuredTotal": "out of 608 teams",
    "featuredDesc": "An international online CTF.<br>We scored 1,907 points in the official results on CTFtime.",
    "resultLink": "View competition results",
    "recentRecords": "Competition history",
    "hackluRank": "24th place",
    "hitconRank": "15th place",
    "faustRank": "60th place",
    "recordSource": "Placements provided by the team",
    "faqTitle": "Frequently asked questions",
    "faqSectionTitle": "Good to know",
    "faqPageIntro": "Basic information about our team and activities.",
    "faqIntro": "About the team and our activities.",
    "faqTeamQ": "What kind of team is Hwalbin?",
    "faqTeamA": "We are a hacking team that competes in international CTFs, researches security vulnerabilities, and participates in bug bounty programs.",
    "faqFieldsQ": "Which fields do you explore?",
    "faqFieldsA": "We introduce web security, system security, reverse engineering, and cryptography.",
    "faqResearchLink": "Explore research →",
    "faqJoinQ": "Can I apply to join the team?",
    "faqJoinA": "There is currently no recruitment announcement on this website.",
    "faqRecordQ": "Where can I find competition records?",
    "faqRecordA": "Find our competition history and results on the Activities page and CTFtime.",
    "faqActivityLink": "View activities →",
    "homeLink": "Go home",
    "historyLink": "All records on CTFtime",
    "homeLabel": "Hwalbin home",
    "navLabel": "Main navigation",
    "researchLabel": "Research areas",
    "ctfLabel": "CTFtime team profile (opens in a new tab)",
    "historyLabel": "View Hwalbin’s activity on CTFtime (opens in a new tab)"
  } as const satisfies Record<string, string>;

  type TranslationKey = keyof typeof english;

  function translationKey(key: string | undefined): TranslationKey {
    if (key && Object.hasOwn(english, key)) return key as TranslationKey;
    throw new Error(`Missing translation: ${key ?? '(empty key)'}`);
  }

  const localizedContent = Array.from(document.querySelectorAll<HTMLElement>('[data-i18n]'), element => ({
    element,
    key: translationKey(element.dataset.i18n),
    korean: element.innerHTML,
  }));
  const localizedLabels = Array.from(document.querySelectorAll<HTMLElement>('[data-i18n-label]'), element => {
    const korean = element.getAttribute('aria-label');
    if (korean === null) throw new Error('A translated label needs an aria-label');
    return { element, key: translationKey(element.dataset.i18nLabel), korean };
  });
  const localizedAlts = Array.from(document.querySelectorAll<HTMLImageElement>('[data-i18n-alt]'), element => ({
    element,
    key: translationKey(element.dataset.i18nAlt),
    korean: element.alt,
  }));

  let language: Language = 'ko';
  let currentTheme: Theme = 'dark';

  function updateMenuLabel(): void {
    const open = nav.classList.contains('open');
    menuButton.textContent = language === 'en'
      ? (open ? 'Close −' : 'Menu +')
      : (open ? '닫기 −' : '메뉴 +');
  }

  function setTheme(value: Theme): void {
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

  function setLanguage(value: Language): void {
    language = value;
    root.lang = value;
    for (const { element, key, korean } of localizedContent) {
      element.innerHTML = value === 'en' ? english[key] : korean;
    }
    for (const { element, key, korean } of localizedLabels) {
      element.setAttribute('aria-label', value === 'en' ? english[key] : korean);
    }
    for (const { element, key, korean } of localizedAlts) {
      element.alt = value === 'en' ? english[key] : korean;
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
    if (savedTheme === 'light' || savedTheme === 'dark') currentTheme = savedTheme;
    const savedLanguage = localStorage.getItem('hwalbin-language');
    if (savedLanguage === 'en' || savedLanguage === 'ko') language = savedLanguage;
  } catch {
    // The site still works when browser storage is unavailable.
  }
  setLanguage(language);
  languageButton.hidden = false;

  languageButton.addEventListener('click', () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
    try { localStorage.setItem('hwalbin-language', language); } catch { /* Storage may be blocked. */ }
  });

  themeButton.addEventListener('click', () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    try { localStorage.setItem('hwalbin-theme', currentTheme); } catch { /* Storage may be blocked. */ }
  });

  function closeMenu(): void {
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
  nav.querySelectorAll<HTMLAnchorElement>('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  const tabPanels = Array.from(document.querySelectorAll<HTMLButtonElement>('[role="tab"]'), tab => {
    const panelId = tab.getAttribute('aria-controls');
    const panel = panelId && document.getElementById(panelId);
    if (!panel) throw new Error(`Missing panel for tab ${tab.id}`);
    return { tab, panel };
  });

  function activateTab(tab: HTMLButtonElement, focus = false): void {
    for (const item of tabPanels) {
      const selected = item.tab === tab;
      item.tab.setAttribute('aria-selected', String(selected));
      item.tab.tabIndex = selected ? 0 : -1;
      item.panel.hidden = !selected;
    }
    if (focus) tab.focus();
  }

  tabPanels.forEach(({ tab }, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      let next: number | undefined;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabPanels.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + tabPanels.length - 1) % tabPanels.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabPanels.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        activateTab(tabPanels[next].tab, true);
      }
    });
  });

  const painting = document.querySelector<HTMLAnchorElement>('.painting-link');
  if (painting && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    painting.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const bounds = painting.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      painting.style.setProperty('--painting-x', `${(-x * 18).toFixed(1)}px`);
      painting.style.setProperty('--painting-y', `${(-y * 12).toFixed(1)}px`);
    });
    painting.addEventListener('pointerleave', () => {
      painting.style.setProperty('--painting-x', '0px');
      painting.style.setProperty('--painting-y', '0px');
    });
  }

  console.log('[HWALBIN] 눈에 보이는 것이 전부는 아닙니다. /robots.txt를 살펴보세요.');
  console.log('[HWALBIN] There is more than meets the eye. Take a look at /robots.txt.');
  const flagDialog = required<HTMLDialogElement>('#flag-dialog');
  const flagValue = required<HTMLElement>('#flag-value');
  let logoClicks = 0;
  document.querySelectorAll<HTMLAnchorElement>('.brand').forEach(logo => {
    logo.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const home = location.pathname.endsWith('/') || location.pathname.endsWith('/index.html');
      if (!home) return;
      event.preventDefault();
      logoClicks += 1;
      if (logoClicks < 5) return;
      logoClicks = 0;
      flagValue.textContent = 'hwalbin{h3y_th3r3_w3lc0m3_t0_hw4lb1n_5ec}';
      if (!flagDialog.open) flagDialog.showModal();
    });
  });
})();
