/* AI X MAD — progressive enhancement for the black-and-blue portfolio. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const header = $('.header');
  const menu = $('.menu-button');
  const nav = $('#primary-nav');
  const navLinks = $$('.nav-item');
  const toast = $('.toast');
  let toastTimer;

  // Compact mobile menu with proper expanded state.
  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('is-open');
  }
  menu.addEventListener('click', () => {
    const opening = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(opening));
    menu.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', opening);
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) closeMenu();
  }, { passive: true });

  // Theme switch; light is the visual default, preference is opt-in.
  const themeButton = $('.theme-toggle');
  function setTheme(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeButton.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeButton.querySelector('.theme-glyph').textContent = dark ? '☀' : '◐';
    $('meta[name="theme-color"]').setAttribute('content', dark ? '#02050c' : '#060b16');
    try { localStorage.setItem('aimad-theme', dark ? 'dark' : 'light'); } catch (_) { /* private browsing */ }
  }
  try {
    if (localStorage.getItem('aimad-theme') === 'dark') setTheme('dark');
  } catch (_) { /* private browsing */ }
  themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  // Scroll progress and active section links, throttled with rAF.
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  let scrollTicking = false;
  function updateScroll() {
    scrollTicking = false;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    $('.scroll-progress').style.width = Math.min(100, Math.max(0, 100 * window.scrollY / max)) + '%';
    header.classList.toggle('is-scrolled', window.scrollY > 20);
    // Select by document position, not observer callback order: the hero
    // must remain the active section after returning to the top.
    const viewportMarker = window.scrollY + Math.min(window.innerHeight * .35, 340);
    let activeId = 'home';
    for (const section of sections) {
      if (section.offsetTop <= viewportMarker) activeId = section.id;
      else break;
    }
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === '#' + activeId;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateScroll();

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -35px 0px', threshold: 0.05 });
    $$('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // Filter the real project links without replacing them or changing URLs.
  const filterButtons = $$('.filter-button');
  const projectCards = $$('.project');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-selected', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  }));

  // Native <dialog> quick navigation, keyboard shortcut and click-away close.
  const commandDialog = $('.command-dialog');
  const commandTrigger = $('.command-trigger');
  const commandClose = $('.command-close');
  function openCommand() {
    closeMenu();
    if (!commandDialog.open && typeof commandDialog.showModal === 'function') commandDialog.showModal();
    else if (commandDialog.open) commandDialog.close();
  }
  commandTrigger.addEventListener('click', openCommand);
  commandClose.addEventListener('click', () => commandDialog.close());
  $$('.command-dialog nav a').forEach(link => link.addEventListener('click', () => commandDialog.close()));
  commandDialog.addEventListener('click', event => {
    const rect = commandDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) commandDialog.close();
  });
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openCommand();
    }
  });

  // Small confirmation shown only after a successful copy.
  function notify(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2500);
  }
  const copyButton = $('.email-copy');
  copyButton.addEventListener('click', async () => {
    const email = copyButton.dataset.copyEmail;
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        copied = true;
      } else {
        const input = document.createElement('textarea');
        input.value = email;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        copied = document.execCommand('copy');
        input.remove();
      }
    } catch (_) { /* browser or user may deny clipboard */ }
    notify(copied ? 'EMAIL COPIED — LET’S CREATE ✳' : 'SELECT THE EMAIL TO COPY IT');
  });

  // Subtle pointer light: the opening screen is type-only by design.
  const pointerGlow = $('.pointer-glow');
  if (pointerGlow && finePointer.matches && !reduceMotion.matches) {
    window.addEventListener('pointermove', event => {
      pointerGlow.style.transform = 'translate3d('
        + (event.clientX - 115) + 'px,' + (event.clientY - 115) + 'px,0)';
    }, { passive: true });
  }

  // Cinematic hero lighting responds to pointer movement without introducing images.
  const hero = $('.hero');
  if (hero && finePointer.matches && !reduceMotion.matches) {
    let pointerFrame = 0;
    hero.addEventListener('pointermove', event => {
      if (pointerFrame) return;
      const x = event.clientX;
      const y = event.clientY;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty('--pointer-x', Math.max(0, Math.min(100, (x - rect.left) / rect.width * 100)) + '%');
        hero.style.setProperty('--pointer-y', Math.max(0, Math.min(100, (y - rect.top) / rect.height * 100)) + '%');
      });
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      hero.style.removeProperty('--pointer-x');
      hero.style.removeProperty('--pointer-y');
    });
  }

  // WhatsApp contact form: prepare the message; the visitor sends it in WhatsApp.
  // Without JS the GET form still opens WhatsApp with its message field.
  const contactForm = $('#contact-form');
  if (contactForm) {
    const nameField = $('#contact-name');
    const messageField = $('#contact-message');
    [nameField, messageField].forEach(field => {
      field.addEventListener('input', () => field.setCustomValidity(''));
    });
    contactForm.addEventListener('submit', event => {
      if (!contactForm.reportValidity()) {
        event.preventDefault();
        return;
      }
      const name = nameField.value.trim();
      const message = messageField.value.trim();
      if (!name) {
        event.preventDefault();
        nameField.setCustomValidity('Please enter your name.');
        nameField.reportValidity();
        return;
      }
      if (message.length < 10) {
        event.preventDefault();
        messageField.setCustomValidity('Please add at least 10 characters about your idea.');
        messageField.reportValidity();
        return;
      }
      event.preventDefault();
      const email = $('#contact-email').value.trim();
      const project = $('#contact-project').value;
      const lines = [
        'Hi Karthikeyan, I found your AI X MAD portfolio.',
        '',
        'Name: ' + name
      ];
      if (email) lines.push('Email: ' + email);
      if (project) lines.push('Project type: ' + project);
      lines.push('', 'My idea:', message);
      const url = 'https://wa.me/919944754339?text=' + encodeURIComponent(lines.join('\n'));
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    });
  }

  // Dismissible on-page WhatsApp prompt. Never automatically sends a message.
  // The launcher remains a real WhatsApp link when JavaScript is unavailable.
  const whatsappWidget = $('.whatsapp-widget');
  const whatsappPanel = $('#wa-panel');
  const whatsappLauncher = $('.wa-launcher');
  const whatsappClose = $('.wa-close');
  if (whatsappWidget && whatsappPanel && whatsappLauncher && whatsappClose) {
    const compactScreen = window.matchMedia('(max-width: 600px)');
    function setWhatsappOpen(open) {
      whatsappPanel.hidden = !open;
      whatsappWidget.classList.toggle('is-open', open);
      whatsappLauncher.setAttribute('aria-expanded', String(open));
      whatsappLauncher.setAttribute('aria-label', open ? 'Close WhatsApp chat preview' : 'Open WhatsApp chat preview');
    }
    setWhatsappOpen(!compactScreen.matches);
    whatsappLauncher.addEventListener('click', event => {
      event.preventDefault();
      setWhatsappOpen(whatsappPanel.hidden);
    });
    whatsappLauncher.addEventListener('keydown', event => {
      if (event.code === 'Space') {
        event.preventDefault();
        whatsappLauncher.click();
      }
    });
    whatsappClose.addEventListener('click', () => {
      setWhatsappOpen(false);
      whatsappLauncher.focus();
    });
    compactScreen.addEventListener('change', event => setWhatsappOpen(!event.matches));
  }

  $('#year').textContent = String(new Date().getFullYear());
})();
