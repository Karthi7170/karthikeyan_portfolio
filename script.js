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
  // Projects auto-slider
  const sliders = $(".project-slider[data-project-slider]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  sliders.forEach(slider => {
    const track=$(".project-track",slider), viewport=$(".project-viewport",slider), prev=$(".project-prev",slider), next=$(".project-next",slider), dotsWrap=$(".project-dots",slider);
    if(!track||!viewport||!prev||!next||!dotsWrap) return;
    const originals=Array.from(track.children), count=originals.length;
    if(count<2) return;
    originals.forEach(card=>{const clone=card.cloneNode(true);clone.setAttribute("aria-hidden","true");clone.classList.add("slider-clone","visible");clone.classList.remove("reveal");track.appendChild(clone);});
    let index=0,timer=null,paused=false,startX=null;
    const dots=originals.map((_,i)=>{const dot=document.createElement("button");dot.className="project-dot"+(i===0?" active":"");dot.type="button";dot.setAttribute("role","tab");dot.setAttribute("aria-label","Show project "+(i+1));dot.setAttribute("aria-selected",String(i===0));dot.addEventListener("click",()=>{index=i;render(true);start();});dotsWrap.appendChild(dot);return dot;});
    const gap=()=>parseFloat(getComputedStyle(track).gap||"18")||18;
    const step=()=>{const card=track.querySelector(".project-slide");return card?card.getBoundingClientRect().width+gap():viewport.clientWidth;};
    const logical=()=>((index%count)+count)%count;
    function updateDots(){const active=logical();dots.forEach((dot,i)=>{const on=i===active;dot.classList.toggle("active",on);dot.setAttribute("aria-selected",String(on));});}
    function render(animate=true){track.style.transition=animate&&!reducedMotion?"transform .6s cubic-bezier(.22,.61,.36,1)":"none";track.style.transform="translate3d("+(-index*step())+"px,0,0)";updateDots();}
    function nextSlide(){index+=1;render(true);}
    function prevSlide(){if(index===0){index=count;render(false);requestAnimationFrame(()=>requestAnimationFrame(()=>{index=count-1;render(true);}));}else{index-=1;render(true);}}
    function stop(){if(timer){clearInterval(timer);timer=null;}}
    function start(){stop();if(!reducedMotion&&!paused) timer=setInterval(nextSlide,3000);}
    track.addEventListener("transitionend",()=>{if(index>=count){index%=count;render(false);}});
    next.addEventListener("click",()=>{nextSlide();start();});
    prev.addEventListener("click",()=>{prevSlide();start();});
    slider.addEventListener("mouseenter",()=>{paused=true;stop();});
    slider.addEventListener("mouseleave",()=>{paused=false;start();});
    viewport.addEventListener("touchstart",e=>{paused=true;stop();startX=e.touches[0]?.clientX??null;},{passive:true});
    viewport.addEventListener("touchend",e=>{const endX=e.changedTouches[0]?.clientX??null;if(startX!==null&&endX!==null){const dx=endX-startX;if(Math.abs(dx)>45)(dx<0?nextSlide:prevSlide)();}startX=null;setTimeout(()=>{paused=false;start();},900);},{passive:true});
    window.addEventListener("resize",()=>render(false),{passive:true});
    render(false);start();
  });

})();