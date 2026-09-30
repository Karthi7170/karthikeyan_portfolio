(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const header = $(".site-header");
  const progress = $(".scroll-progress");
  const menu = $(".menu-toggle");
  const mobileNav = $("#mobile-nav");
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");
  const toast = $(".toast");

  function setMenu(open) {
    if (!menu || !mobileNav) return;
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileNav.classList.toggle("is-open", open);
  }

  menu?.addEventListener("click", () => {
    setMenu(menu.getAttribute("aria-expanded") !== "true");
  });

  $$("#mobile-nav a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") setMenu(false);
  });

  document.addEventListener("click", e => {
    if (!mobileNav || !menu) return;
    if (!mobileNav.contains(e.target) && !menu.contains(e.target)) setMenu(false);
  });

  let raf = 0;
  function updateScroll() {
    raf = 0;

    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) progress.style.width = Math.min(100, Math.max(0, window.scrollY / max * 100)) + "%";

    if (header) {
      header.style.borderBottomColor = window.scrollY > 12
        ? "rgba(61,160,255,.30)"
        : "rgba(61,160,255,.18)";
    }

    const marker = window.scrollY + Math.min(window.innerHeight * 0.33, 280);
    let active = "home";

    for (const section of sections) {
      if (section.offsetTop <= marker) active = section.id;
      else break;
    }

    navLinks.forEach(link => {
      const isActive = link.getAttribute("href") === "#" + active;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function onScroll() {
    if (!raf) raf = requestAnimationFrame(updateScroll);
  }

  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  updateScroll();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -28px 0px"
    });

    $$(".reveal").forEach(el => observer.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("is-visible"));
  }

  const waPanel = $("#wa-panel");
  const waLauncher = $(".wa-launcher");
  const waClose = $(".wa-close");

  function setWhatsApp(open) {
    if (!waPanel || !waLauncher) return;
    waPanel.hidden = !open;
    waLauncher.setAttribute("aria-expanded", String(open));
  }

  if (waPanel && waLauncher) {
    setWhatsApp(false);
    waLauncher.addEventListener("click", () => setWhatsApp(waPanel.hidden));
    waClose?.addEventListener("click", () => setWhatsApp(false));
  }

  const form = $("#contact-form");

  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  form?.addEventListener("submit", e => {
    e.preventDefault();

    if (!form.reportValidity()) return;

    const name = $("#contact-name")?.value.trim() || "";
    const email = $("#contact-email")?.value.trim() || "";
    const phone = $("#contact-phone")?.value.trim() || "";
    const service = $("#contact-service")?.value || "";
    const message = $("#contact-message")?.value.trim() || "";

    const text = [
      "Hi AI x MAD, I found your portfolio website.",
      "",
      "Name: " + name,
      "Email: " + email,
      "Phone: " + phone,
      "Service: " + service,
      "",
      "Project details:",
      message
    ].join("\n");

    const url = "https://wa.me/919944754339?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener,noreferrer");
    notify("Opening WhatsApp with your enquiry");
  });

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();