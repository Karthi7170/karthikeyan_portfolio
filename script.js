(() => {
  "use strict";
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const menu=$(".menu-btn"), mobile=$(".mobile-nav");
  function setMenu(open){ if(!menu||!mobile)return; menu.setAttribute("aria-expanded",String(open)); mobile.classList.toggle("open",open); }
  menu?.addEventListener("click",()=>setMenu(menu.getAttribute("aria-expanded")!=="true"));
  $$(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
  document.addEventListener("click",e=>{ if(menu&&mobile&&!menu.contains(e.target)&&!mobile.contains(e.target))setMenu(false); });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape")setMenu(false); });

  const launcher=$(".wa-launcher"), panel=$(".wa-panel"), close=$(".wa-close");
  function setWA(open){ if(!launcher||!panel)return; panel.hidden=!open; }
  launcher?.addEventListener("click",()=>setWA(panel.hidden)); close?.addEventListener("click",()=>setWA(false));

  const onePageLinks=$(".onepage-nav a[href^='#']");
  const onePageSections=$(".page-section[id]");
  if(onePageLinks.length && onePageSections.length){
    const updateActive=()=>{
      const marker=window.scrollY+110;
      let active="home";
      for(const section of onePageSections){
        if(section.offsetTop<=marker) active=section.id;
        else break;
      }
      onePageLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+active));
    };
    window.addEventListener("scroll",updateActive,{passive:true});
    window.addEventListener("resize",updateActive,{passive:true});
    updateActive();
  }

  const year=$("#year"); if(year)year.textContent=new Date().getFullYear();

  const filters=$$(".filter-bar button"), projects=$$("[data-type]");
  filters.forEach(btn=>btn.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active"));btn.classList.add("active");
    const type=btn.dataset.filter;
    projects.forEach(card=>card.classList.toggle("hidden",type!=="all"&&card.dataset.type!==type));
  }));

  const form=$("#contact-form");
  form?.addEventListener("submit",e=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const name=$("#contact-name")?.value.trim()||"";
    const email=$("#contact-email")?.value.trim()||"";
    const phone=$("#contact-phone")?.value.trim()||"";
    const service=$("#contact-service")?.value||"";
    const budget=$("#contact-budget")?.value||"";
    const message=$("#contact-message")?.value.trim()||"";
    const text=["Hi AI x MAD, I want to discuss a project.","","Name: "+name,"Email: "+email,"Phone: "+phone,"Service: "+service,"Budget: "+budget,"","Project details:",message].join("\n");
    window.open("https://wa.me/919944754339?text="+encodeURIComponent(text),"_blank","noopener,noreferrer");
  });
})();