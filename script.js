(() => {
  "use strict";

  const $ = (s,c=document) => c.querySelector(s);
  const $$ = (s,c=document) => Array.from(c.querySelectorAll(s));

  $$(".brand-logo img[data-fallback-src]").forEach(img => {
    function useLogoFallback(){
      const fallback = img.dataset.fallbackSrc;
      if(!fallback) return;
      delete img.dataset.fallbackSrc;
      img.src = fallback;
    }
    img.addEventListener("error", useLogoFallback, {once:true});
    // A cached decode failure can occur before this deferred script runs.
    if(img.complete) img.decode().catch(useLogoFallback);
  });

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
  // Projects cinematic auto-slider
  const sliders = $$(".project-slider[data-project-slider]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  sliders.forEach(slider => {
    const track = $(".project-track", slider);
    const viewport = $(".project-viewport", slider);
    const prev = $(".project-prev", slider);
    const next = $(".project-next", slider);
    const dotsWrap = $(".project-dots", slider);
    if(!track || !viewport || !prev || !next || !dotsWrap) return;

    const originals = Array.from(track.children);
    const count = originals.length;
    if(count < 2) return;

    const firstClone = originals[0].cloneNode(true);
    const lastClone = originals[count - 1].cloneNode(true);
    [firstClone,lastClone].forEach(clone => {
      clone.setAttribute("aria-hidden","true");
      clone.classList.add("slider-clone","visible");
      clone.classList.remove("reveal");
    });
    track.insertBefore(lastClone, originals[0]);
    track.appendChild(firstClone);

    let index = 1;
    let timer = null;
    let paused = false;
    let startX = null;

    const dots = originals.map((_, i) => {
      const dot = document.createElement("button");
      dot.className = "project-dot" + (i === 0 ? " active" : "");
      dot.type = "button";
      dot.setAttribute("role","tab");
      dot.setAttribute("aria-label","Show project " + (i + 1));
      dot.setAttribute("aria-selected",String(i === 0));
      dot.addEventListener("click",() => {
        index = i + 1;
        render(true);
        start();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    const cards = () => Array.from(track.children);
    const gap = () => parseFloat(getComputedStyle(track).gap || "22") || 22;
    const step = () => {
      const card = track.querySelector(".project-slide");
      return card ? card.getBoundingClientRect().width + gap() : viewport.clientWidth;
    };
    const logical = () => ((index - 1) % count + count) % count;

    function updateDots(){
      const active = logical();
      dots.forEach((dot,i) => {
        const on = i === active;
        dot.classList.toggle("active",on);
        dot.setAttribute("aria-selected",String(on));
      });
    }

    function updateSlideStates(){
      cards().forEach((card,i) => {
        const distance = Math.abs(i - index);
        card.classList.toggle("is-active",distance === 0);
        card.classList.toggle("is-near",distance === 1);
        card.classList.toggle("is-far",distance > 1);
      });
    }

    function render(animate = true){
      const target = track.children[index];
      if(!target) return;

      const targetCenter = target.offsetLeft + (target.offsetWidth / 2);
      const viewportCenter = viewport.clientWidth / 2;
      const translateX = viewportCenter - targetCenter;

      track.style.transition = animate && !reducedMotion
        ? "transform .78s cubic-bezier(.22,.78,.22,1)"
        : "none";
      track.style.transform = "translate3d(" + translateX + "px,0,0)";
      updateDots();
      updateSlideStates();
    }

    function nextSlide(){
      index += 1;
      render(true);
    }

    function prevSlide(){
      index -= 1;
      render(true);
    }

    function stop(){
      if(timer){
        clearInterval(timer);
        timer = null;
      }
    }

    function start(){
      stop();
      if(!reducedMotion && !paused) timer = setInterval(nextSlide,3000);
    }

    track.addEventListener("transitionend",e => {
      if(e.target !== track || e.propertyName !== "transform") return;
      if(index === count + 1){
        index = 1;
        render(false);
      } else if(index === 0){
        index = count;
        render(false);
      }
    });

    next.addEventListener("click",() => {
      nextSlide();
      start();
    });

    prev.addEventListener("click",() => {
      prevSlide();
      start();
    });

    if(canHover){
      slider.addEventListener("mouseenter",() => {
        paused = true;
        stop();
      });

      slider.addEventListener("mouseleave",() => {
        paused = false;
        start();
      });
    }

    document.addEventListener("visibilitychange",() => {
      if(document.hidden){
        stop();
      } else if(!paused){
        start();
      }
    });

    viewport.addEventListener("touchstart",e => {
      paused = true;
      stop();
      startX = e.touches[0]?.clientX ?? null;
    },{passive:true});

    viewport.addEventListener("touchend",e => {
      const endX = e.changedTouches[0]?.clientX ?? null;
      if(startX !== null && endX !== null){
        const dx = endX - startX;
        if(Math.abs(dx) > 45) (dx < 0 ? nextSlide : prevSlide)();
      }
      startX = null;
      setTimeout(() => {
        paused = false;
        start();
      },900);
    },{passive:true});

    window.addEventListener("resize",() => render(false),{passive:true});
    render(false);
    start();
  });

})();

/* Connected-edge white background remover for the homepage hero */
(() => {
  const hero = document.querySelector(".hero-laptop-image");
  if (!hero || hero.dataset.transparentProcessed === "1") return;

  hero.dataset.transparentProcessed = "1";
  let fallbackTimer = window.setTimeout(() => {
    hero.classList.add("hero-transparent-fallback");
  }, 3000);

  const fail = () => {
    window.clearTimeout(fallbackTimer);
    hero.classList.remove("hero-transparent-ready");
    hero.classList.add("hero-transparent-fallback");
  };

  const processHero = () => {
    try {
      const w = hero.naturalWidth;
      const h = hero.naturalHeight;
      if (!w || !h) return fail();

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return fail();

      ctx.drawImage(hero, 0, 0, w, h);
      const frame = ctx.getImageData(0, 0, w, h);
      const px = frame.data;
      const total = w * h;
      const state = new Uint8Array(total);
      const queue = new Int32Array(total);
      let head = 0;
      let tail = 0;

      const nearWhite = (p, limitSq = 1024) => {
        const o = p * 4;
        if (px[o + 3] === 0) return true;
        const dr = 255 - px[o];
        const dg = 255 - px[o + 1];
        const db = 255 - px[o + 2];
        return (dr * dr + dg * dg + db * db) <= limitSq;
      };

      const addSeed = p => {
        if (state[p] || !nearWhite(p)) return;
        state[p] = 1;
        queue[tail++] = p;
      };

      for (let x = 0; x < w; x++) {
        addSeed(x);
        addSeed((h - 1) * w + x);
      }
      for (let y = 0; y < h; y++) {
        addSeed(y * w);
        addSeed(y * w + (w - 1));
      }

      while (head < tail) {
        const p = queue[head++];
        const x = p % w;
        const y = (p / w) | 0;

        if (x > 0) addSeed(p - 1);
        if (x + 1 < w) addSeed(p + 1);
        if (y > 0) addSeed(p - w);
        if (y + 1 < h) addSeed(p + w);
      }

      for (let i = 0; i < total; i++) {
        if (state[i] === 1) px[i * 4 + 3] = 0;
      }

      // Feather three pixels into the white matte without crossing deep into the white service cards.
      const alphaByRing = [0, 44, 108, 184];
      for (let ring = 1; ring <= 3; ring++) {
        const nextState = ring + 1;
        const sourceState = ring;
        for (let y = 1; y < h - 1; y++) {
          const row = y * w;
          for (let x = 1; x < w - 1; x++) {
            const p = row + x;
            if (state[p] !== 0 || !nearWhite(p, 3600)) continue;
            if (
              state[p - 1] === sourceState ||
              state[p + 1] === sourceState ||
              state[p - w] === sourceState ||
              state[p + w] === sourceState
            ) {
              state[p] = nextState;
            }
          }
        }
        for (let i = 0; i < total; i++) {
          if (state[i] === nextState) {
            px[i * 4 + 3] = Math.min(px[i * 4 + 3], alphaByRing[ring]);
          }
        }
      }

      ctx.putImageData(frame, 0, 0);

      canvas.toBlob(blob => {
        if (!blob) return fail();
        const url = URL.createObjectURL(blob);

        hero.addEventListener("load", () => {
          window.clearTimeout(fallbackTimer);
          hero.classList.remove("hero-transparent-fallback");
          hero.classList.add("hero-transparent-ready");
          URL.revokeObjectURL(url);
        }, { once: true });

        hero.src = url;
        hero.removeAttribute("srcset");
      }, "image/png");
    } catch (error) {
      fail();
    }
  };

  if (hero.complete && hero.naturalWidth) processHero();
  else hero.addEventListener("load", processHero, { once: true });
})();
