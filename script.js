(() => {
  "use strict";

  const $ = (s,c=document) => c.querySelector(s);
  const $$ = (s,c=document) => Array.from(c.querySelectorAll(s));

  const menu = $(".menu-btn");
  const mobileNav = $(".mobile-nav");
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");

  function setMenu(open){
    if(!menu || !mobileNav) return;
    menu.setAttribute("aria-expanded", String(open));
    mobileNav.classList.toggle("open", open);
  }

  menu?.addEventListener("click", () => {
    setMenu(menu.getAttribute("aria-expanded") !== "true");
  });

  $$(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", e => {
    if(e.key === "Escape") setMenu(false);
  });

  document.addEventListener("click", e => {
    if(menu && mobileNav && !menu.contains(e.target) && !mobileNav.contains(e.target)){
      setMenu(false);
    }
  });

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if(!id || id === "#") return;
      const target = $(id);
      if(!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({top, behavior:"smooth"});
      history.replaceState(null,"",id);
    });
  });

  const usesAnchorNav = navLinks.some(link => (link.getAttribute("href") || "").startsWith("#"));
  function updateActiveNav(){
    if(!usesAnchorNav) return;
    const marker = window.scrollY + 150;
    let active = "home";
    for(const section of sections){
      if(section.offsetTop <= marker) active = section.id;
      else break;
    }
    navLinks.forEach(link => {
      const isActive = link.getAttribute("href") === "#" + active;
      link.classList.toggle("active", isActive);
      if(isActive) link.setAttribute("aria-current","page");
      else link.removeAttribute("aria-current");
    });
  }

  if(usesAnchorNav){
    window.addEventListener("scroll", updateActiveNav, {passive:true});
    window.addEventListener("resize", updateActiveNav, {passive:true});
    updateActiveNav();
  }

  if("IntersectionObserver" in window){
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:"0px 0px -40px 0px"});
    $$(".reveal").forEach(el => observer.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("visible"));
  }

  const form = $("#contact-form");
  const status = $(".form-status");

  form?.addEventListener("submit", e => {
    e.preventDefault();

    if(!form.checkValidity()){
      form.reportValidity();
      if(status){
        status.textContent = "Please complete all required fields.";
        status.style.color = "#b42318";
      }
      return;
    }

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const phone = $("#phone").value.trim();
    const service = $("#service").value;
    const message = $("#message").value.trim();

    const text = [
      "Hi AI × MAD, I'd like to discuss a project.",
      "",
      "Name: " + name,
      "Email: " + email,
      "Phone: " + phone,
      "Service: " + service,
      "",
      "Message:",
      message
    ].join("\n");

    if(status){
      status.textContent = "Thanks! Your enquiry is ready in WhatsApp.";
      status.style.color = "#17733a";
    }

    window.open(
      "https://wa.me/919944754339?text=" + encodeURIComponent(text),
      "_blank",
      "noopener,noreferrer"
    );

    form.reset();
  });

  const year = $("#year");
  if(year) year.textContent = new Date().getFullYear();

  if(location.hash){
    const target = $(location.hash);
    if(target){
      requestAnimationFrame(() => {
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({top, behavior:"auto"});
      });
    }
  }
})();