(() => {
  "use strict";

  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));

  document.body.classList.add("tab-view");

  const menu=$(".menu-btn");
  const mobile=$(".mobile-nav");
  function setMenu(open){
    if(!menu||!mobile) return;
    menu.setAttribute("aria-expanded",String(open));
    mobile.classList.toggle("open",open);
  }
  menu?.addEventListener("click",()=>setMenu(menu.getAttribute("aria-expanded")!=="true"));
  $$(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
  document.addEventListener("click",e=>{
    if(menu&&mobile&&!menu.contains(e.target)&&!mobile.contains(e.target)) setMenu(false);
  });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape") setMenu(false); });

  const sections=$$(".page-section[id]");
  const navLinks=$$(".onepage-nav a[href^='#']");

  function validSectionId(raw){
    const id=(raw||"").replace(/^#/,"");
    return sections.some(section=>section.id===id) ? id : "home";
  }

  function activateTab(id, options={}){
    const target=validSectionId(id);
    sections.forEach(section=>{
      const active=section.id===target;
      section.classList.toggle("is-active",active);
      section.setAttribute("aria-hidden",String(!active));
    });

    navLinks.forEach(link=>{
      const active=link.getAttribute("href")==="#"+target;
      link.classList.toggle("active",active);
      if(active) link.setAttribute("aria-current","page");
      else link.removeAttribute("aria-current");
    });

    document.body.dataset.activeTab=target;
    document.title = target==="home"
      ? "AI × MAD — Digital Solutions for a Brighter Tomorrow"
      : target.charAt(0).toUpperCase()+target.slice(1)+" — AI × MAD";

    if(options.scroll!==false){
      window.scrollTo({top:0,left:0,behavior:options.smooth?"smooth":"auto"});
    }
  }

  function routeFromLocation(){
    activateTab(validSectionId(location.hash),{scroll:true});
  }

  $$('a[href^="#"]').forEach(link=>{
    link.addEventListener("click",e=>{
      const hash=link.getAttribute("href");
      if(!hash || hash==="#") return;
      const id=validSectionId(hash);
      if(!sections.some(section=>section.id===id)) return;
      e.preventDefault();
      if(location.hash!==("#"+id)){
        history.pushState({tab:id},"","#"+id);
      }
      activateTab(id,{scroll:true});
      setMenu(false);
    });
  });

  window.addEventListener("popstate",routeFromLocation);
  window.addEventListener("hashchange",routeFromLocation);

  const initial=validSectionId(location.hash);
  if(!location.hash || location.hash==="#"){
    history.replaceState({tab:"home"},"","#home");
  }
  activateTab(initial,{scroll:false});

  const launcher=$(".wa-launcher");
  const panel=$(".wa-panel");
  const close=$(".wa-close");
  function setWA(open){
    if(!launcher||!panel) return;
    panel.hidden=!open;
  }
  launcher?.addEventListener("click",()=>setWA(panel.hidden));
  close?.addEventListener("click",()=>setWA(false));

  const year=$("#year");
  if(year) year.textContent=new Date().getFullYear();

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
    const text=[
      "Hi AI x MAD, I want to discuss a project.","",
      "Name: "+name,
      "Email: "+email,
      "Phone: "+phone,
      "Service: "+service,
      "Budget: "+budget,"",
      "Project details:",message
    ].join("\n");
    window.open("https://wa.me/919944754339?text="+encodeURIComponent(text),"_blank","noopener,noreferrer");
  });
})();