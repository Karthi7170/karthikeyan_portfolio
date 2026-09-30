(() => {
  'use strict';
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
  const progress=$('.scroll-progress');
  const header=$('.site-header');
  const menu=$('.menu-toggle');
  const mobileNav=$('#mobile-nav');
  const navLinks=$$('.nav-link');
  const sections=$$('main section[id]');
  const toast=$('.toast');

  function setMenu(open){
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close menu':'Open menu');
    mobileNav.classList.toggle('is-open',open);
  }
  menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
  $$('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  document.addEventListener('click',e=>{if(!mobileNav.contains(e.target)&&!menu.contains(e.target))setMenu(false)});

  let raf=0;
  function updateScroll(){
    raf=0;
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    progress.style.width=Math.min(100,Math.max(0,scrollY/max*100))+'%';
    header.style.borderBottomColor=scrollY>16?'rgba(94,129,182,.24)':'rgba(105,138,192,.12)';
    const marker=scrollY+Math.min(innerHeight*.34,320);
    let active='home';
    for(const section of sections){if(section.offsetTop<=marker)active=section.id;else break}
    navLinks.forEach(link=>{
      const on=link.getAttribute('href')==='#'+active;
      link.classList.toggle('is-active',on);
      if(on)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
    });
  }
  function onScroll(){if(!raf)raf=requestAnimationFrame(updateScroll)}
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',onScroll,{passive:true});
  updateScroll();

  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },{threshold:.08,rootMargin:'0px 0px -35px 0px'});
    $$('.reveal').forEach(el=>io.observe(el));
  }else{$$('.reveal').forEach(el=>el.classList.add('is-visible'))}

  // Selected Work carousel: cinematic horizontal swipe every 3 seconds.
  // Autoplay pauses on hover/focus/touch and is disabled for reduced-motion users.
  const workCarousel=$('[data-work-carousel]');
  if(workCarousel){
    const viewport=$('.work-viewport',workCarousel);
    const slides=Array.from(workCarousel.querySelectorAll('[data-work-slide]'));
    const dots=Array.from(workCarousel.querySelectorAll('[data-work-dot]'));
    const prev=$('.work-prev',workCarousel);
    const next=$('.work-next',workCarousel);
    const status=$('#work-carousel-status');
    let workIndex=0;
    let workTimer=0;
    let resumeTimer=0;
    let scrollTimer=0;
    let programmatic=false;
    const labels=slides.map(slide=>slide.querySelector('h3')?.textContent.trim()||'Project');

    function updateWorkUI(index,{scroll=true,smooth=true,announce=false}={}){
      workIndex=(index+slides.length)%slides.length;
      slides.forEach((slide,i)=>{
        const active=i===workIndex;
        slide.classList.toggle('is-active',active);
        if(active)slide.setAttribute('aria-current','true');else slide.removeAttribute('aria-current');
      });
      dots.forEach((dot,i)=>{
        const active=i===workIndex;
        dot.classList.toggle('is-active',active);
        dot.setAttribute('aria-selected',String(active));
      });
      if(status&&announce)status.textContent='Showing project '+(workIndex+1)+' of '+slides.length+': '+labels[workIndex];
      if(scroll){
        programmatic=true;
        requestAnimationFrame(()=>requestAnimationFrame(()=>{
          const left=Math.max(0,slides[workIndex].offsetLeft-viewport.offsetLeft);
          viewport.scrollTo({left,behavior:smooth&&!reduceMotion.matches?'smooth':'auto'});
          setTimeout(()=>{programmatic=false},700);
        }));
      }
    }
    function stopAuto(){if(workTimer){clearInterval(workTimer);workTimer=0}}
    function startAuto(){
      stopAuto();
      workTimer=setInterval(()=>updateWorkUI(workIndex+1,{scroll:true,smooth:true}),3000);
    }
    function restartLater(delay=3800){
      stopAuto();clearTimeout(resumeTimer);
      resumeTimer=setTimeout(startAuto,delay);
    }

    prev?.addEventListener('click',()=>{updateWorkUI(workIndex-1,{announce:true});restartLater()});
    next?.addEventListener('click',()=>{updateWorkUI(workIndex+1,{announce:true});restartLater()});
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{updateWorkUI(i,{announce:true});restartLater()}));

    viewport.addEventListener('pointerdown',()=>{stopAuto();clearTimeout(resumeTimer)},{passive:true});
    viewport.addEventListener('pointerup',()=>restartLater(3500),{passive:true});
    viewport.addEventListener('touchend',()=>restartLater(3500),{passive:true});
    viewport.addEventListener('scroll',()=>{
      if(programmatic)return;
      clearTimeout(scrollTimer);
      scrollTimer=setTimeout(()=>{
        let nearest=0,dist=Infinity;
        slides.forEach((slide,i)=>{
          const d=Math.abs(slide.offsetLeft-viewport.scrollLeft);
          if(d<dist){dist=d;nearest=i}
        });
        if(nearest!==workIndex)updateWorkUI(nearest,{scroll:false,announce:true});
      },130);
    },{passive:true});


    updateWorkUI(0,{scroll:false});
    startAuto();
  }

  if(finePointer.matches&&!reduceMotion.matches){
    const frame=$('.motion-frame');
    const visual=$('.hero-visual');
    if(frame&&visual){
      let tiltFrame=0,x=0,y=0;
      visual.addEventListener('pointermove',e=>{
        const r=visual.getBoundingClientRect();
        x=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1));
        y=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));
        if(tiltFrame)return;
        tiltFrame=requestAnimationFrame(()=>{
          tiltFrame=0;
          frame.style.transform='perspective(1400px) rotateY('+(-7+x*4).toFixed(2)+'deg) rotateX('+(2-y*3).toFixed(2)+'deg) translate3d(0,0,0)';
        });
      },{passive:true});
      visual.addEventListener('pointerleave',()=>frame.style.transform='');
    }
    $$('[data-tilt]').forEach(card=>{
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        card.style.transform='rotateX('+(-y*3).toFixed(2)+'deg) rotateY('+(x*4).toFixed(2)+'deg)';
      },{passive:true});
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }

  const video=$('#hero-motion-video');
  if(video){
    const tryPlay=()=>{const p=video.play();if(p&&typeof p.catch==='function')p.catch(()=>{})};
    if(document.visibilityState==='visible')tryPlay();
    document.addEventListener('visibilitychange',()=>document.visibilityState==='visible'?tryPlay():video.pause());
    video.addEventListener('error',()=>video.classList.add('video-fallback'));
  }

  function notify(message){
    toast.textContent=message;
    toast.classList.add('is-visible');
    clearTimeout(notify.timer);
    notify.timer=setTimeout(()=>toast.classList.remove('is-visible'),2200);
  }

  const copy=$('.email-copy');
  if(copy){
    copy.addEventListener('click',async()=>{
      const email=copy.dataset.copyEmail;
      let ok=false;
      try{
        if(navigator.clipboard&&isSecureContext){await navigator.clipboard.writeText(email);ok=true}
        else{
          const t=document.createElement('textarea');t.value=email;t.style.position='fixed';t.style.opacity='0';
          document.body.appendChild(t);t.select();ok=document.execCommand('copy');t.remove();
        }
      }catch(_){}
      notify(ok?'Email copied':'Email: '+email);
    });
  }

  const form=$('#contact-form');
  if(form){
    form.addEventListener('submit',e=>{
      if(!form.reportValidity()){e.preventDefault();return}
      e.preventDefault();
      const name=$('#contact-name').value.trim();
      const email=$('#contact-email').value.trim();
      const project=$('#contact-project').value;
      const message=$('#contact-message').value.trim();
      if(message.length<10){$('#contact-message').setCustomValidity('Please tell me a little more about your idea.');$('#contact-message').reportValidity();return}
      $('#contact-message').setCustomValidity('');
      const lines=['Hi AI x MAD, I found your website.','','Name: '+name];
      if(email)lines.push('Email: '+email);
      if(project)lines.push('Project type: '+project);
      lines.push('','My idea:',message);
      const a=document.createElement('a');
      a.href='https://wa.me/919944754339?text='+encodeURIComponent(lines.join('\n'));
      a.target='_blank';a.rel='noopener noreferrer';a.click();
    });
    $('#contact-message').addEventListener('input',e=>e.currentTarget.setCustomValidity(''));
  }

  const panel=$('#wa-panel'),launcher=$('.wa-launcher'),close=$('.wa-close');
  function setWa(open){
    if(!panel||!launcher)return;
    panel.hidden=!open;
    launcher.setAttribute('aria-expanded',String(open));
    launcher.setAttribute('aria-label',open?'Close WhatsApp chat preview':'Open WhatsApp chat preview');
  }
  if(panel&&launcher&&close){
    setWa(false);
    launcher.addEventListener('click',e=>{e.preventDefault();setWa(panel.hidden)});
    launcher.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();launcher.click()}});
    close.addEventListener('click',()=>{setWa(false);launcher.focus()});
  }

  const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());
})();