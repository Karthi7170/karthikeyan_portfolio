import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const base='http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const errors=[];mkdirSync('artifacts',{recursive:true});
try{
  const desktop=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
  desktop.on('pageerror',e=>errors.push('desktop: '+e.message));
  await desktop.goto(base,{waitUntil:'domcontentloaded'});
  await desktop.waitForSelector('.hero-grid');
  assert.equal(await desktop.title(),'AI x MAD — Web, App & AI Studio');
  assert.match(await desktop.locator('.hero h1').innerText(),/AI x MAD/);
  assert.match(await desktop.locator('.hero h1').innerText(),/blueprint/i);
  assert.equal(await desktop.locator('#hero-motion-video').count(),1);
  assert.equal(await desktop.locator('.project-card').count(),4);
  assert.equal(await desktop.locator('.contact-form').count(),1);
  assert.equal(await desktop.locator('.browser-stage').count(),0,'Oversized browser mockup should be removed');
  assert.equal(await desktop.locator('.service-card').count(),3);
  const serviceBoxes=await desktop.locator('.service-card').evaluateAll(cards=>cards.map(c=>({top:c.getBoundingClientRect().top,left:c.getBoundingClientRect().left,width:c.getBoundingClientRect().width,tools:c.querySelectorAll('.tool-cube').length})));
  assert.ok(serviceBoxes.every(x=>x.tools>=4),'Each service should show at least four tool logos');
  assert.ok(Math.max(...serviceBoxes.map(x=>x.top))-Math.min(...serviceBoxes.map(x=>x.top))<8,'Desktop services should share one row');
  assert.equal(await desktop.locator('.site-thumbnail img').count(),4,'Every project should use a live-site thumbnail');
  assert.equal(await desktop.locator('.wa-launcher svg').count(),1,'WhatsApp launcher should use the icon');
  assert.equal(await desktop.locator('meta[name="theme-color"]').getAttribute('content'),'#f4f6f8');
  const heroSurface=await desktop.locator('.executive-hero-grid').evaluate(el=>({bg:getComputedStyle(el).backgroundColor,radius:getComputedStyle(el).borderRadius}));
  assert.equal(heroSurface.bg,'rgb(255, 255, 255)','Hero should use a clean white business surface');
  assert.equal(heroSurface.radius,'28px','Hero should use the executive rounded shell');
  const serviceBackgrounds=await desktop.locator('.service-card').evaluateAll(cards=>cards.map(c=>getComputedStyle(c).backgroundColor));
  assert.ok(serviceBackgrounds.every(v=>v==='rgb(255, 255, 255)'),'Services should use consistent professional white cards');
  const activeThumbFilter=await desktop.locator('.project-card.is-active .site-thumbnail img').evaluate(el=>getComputedStyle(el).filter);
  assert.equal(/grayscale\(1\)/.test(activeThumbFilter),false,'Active project thumbnail should retain color');
  const primaryButtonBg=await desktop.locator('.button-primary').evaluate(el=>getComputedStyle(el).backgroundColor);
  assert.equal(primaryButtonBg,'rgb(49, 94, 251)','Primary CTA should use the cobalt business accent');
  const workBg=await desktop.locator('#work').evaluate(el=>getComputedStyle(el).backgroundColor);
  assert.equal(workBg,'rgb(17, 19, 24)','Work section should use the dark editorial band');
  const heroFont=await desktop.locator('.hero h1').evaluate(el=>getComputedStyle(el).fontFamily);
  assert.match(heroFont,/Sora/,'Hero typography should use the new professional display font');


  await desktop.locator('[data-work-carousel]').scrollIntoViewIfNeeded();
  await desktop.waitForTimeout(250);
  const firstWork=await desktop.locator('.project-card.is-active h3').innerText();
  assert.equal(firstWork,'New Royal Tiles');
  const activeCardWidth=(await desktop.locator('.project-card.is-active').boundingBox()).width;
  assert.ok(activeCardWidth>=480&&activeCardWidth<=700,'Active project card should stay medium-sized on desktop');
  await desktop.waitForTimeout(3250);
  const autoWork=await desktop.locator('.project-card.is-active h3').innerText();
  assert.equal(autoWork,'Sugumar Portfolio','Work carousel should auto-swipe after 3 seconds');
  await desktop.locator('.work-next').click();
  assert.equal(await desktop.locator('.project-card.is-active h3').innerText(),'VIP-Hunter');
  await desktop.locator('.work-prev').click();
  assert.equal(await desktop.locator('.project-card.is-active h3').innerText(),'Sugumar Portfolio');
  console.log('3-second medium selected-work swipe carousel: PASS');

  await desktop.locator('.wa-launcher').click();
  assert.equal(await desktop.locator('#wa-panel').isVisible(),true);
  await desktop.locator('.wa-close').click();
  assert.equal(await desktop.locator('#wa-panel').isVisible(),false);

  await desktop.locator('#contact-name').fill('Alex Example');
  await desktop.locator('#contact-email').fill('alex@example.com');
  await desktop.locator('#contact-project').selectOption('Website development');
  await desktop.locator('#contact-message').fill('I need a premium responsive website for my company.');
  await desktop.evaluate(()=>{
    window.__wa='';
    const old=HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click=function(){
      if(this.href.startsWith('https://wa.me/919944754339?text=')){window.__wa=this.href;return}
      return old.call(this);
    };
  });
  await desktop.locator('.contact-form button[type="submit"]').click();
  const wa=await desktop.evaluate(()=>window.__wa);
  assert.ok(wa.startsWith('https://wa.me/919944754339?text='));
  const msg=new URL(wa).searchParams.get('text');
  assert.ok(msg.includes('Alex Example')&&msg.includes('Website development'));

  await desktop.evaluate(async()=>{await document.fonts.ready;window.scrollTo(0,0)});
  await desktop.waitForTimeout(500);
  await desktop.screenshot({path:'artifacts/desktop-hero.png',animations:'disabled'});
  for(const el of await desktop.locator('.reveal').all()){if(await el.isVisible())await el.scrollIntoViewIfNeeded()}
  await desktop.evaluate(()=>window.scrollTo(0,0));
  await desktop.waitForTimeout(120);
  await desktop.screenshot({path:'artifacts/desktop-full.png',fullPage:true,animations:'disabled'});
  assert.equal(await desktop.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);

  const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'no-preference'});
  mobile.on('pageerror',e=>errors.push('mobile: '+e.message));
  await mobile.goto(base,{waitUntil:'domcontentloaded'});
  assert.equal(await mobile.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  assert.equal(await mobile.locator('.service-card').count(),3);
  assert.equal(await mobile.locator('.tool-cube').count()>=12,true);
  await mobile.locator('.menu-toggle').click();
  assert.equal(await mobile.locator('.mobile-nav').isVisible(),true);
  await mobile.locator('.mobile-nav a[href="#work"]').click();
  assert.equal(await mobile.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  await mobile.evaluate(async()=>{await document.fonts.ready;window.scrollTo(0,0)});
  await mobile.waitForTimeout(450);
  await mobile.screenshot({path:'artifacts/mobile-hero.png',animations:'disabled'});
  for(const el of await mobile.locator('.reveal').all()){if(await el.isVisible())await el.scrollIntoViewIfNeeded()}
  await mobile.evaluate(()=>window.scrollTo(0,0));
  await mobile.waitForTimeout(100);
  await mobile.screenshot({path:'artifacts/mobile-full.png',fullPage:true,animations:'disabled'});
  assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);

  await mobile.setViewportSize({width:320,height:760});
  await mobile.waitForTimeout(80);
  assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);

  const uhd=await browser.newPage({viewport:{width:3840,height:2160},reducedMotion:'no-preference'});
  uhd.on('pageerror',e=>errors.push('uhd: '+e.message));
  await uhd.goto(base,{waitUntil:'domcontentloaded'});
  await uhd.evaluate(async()=>{await document.fonts.ready});
  assert.equal(await uhd.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);
  assert.ok((await uhd.locator('.motion-frame').boundingBox()).width>650);
  await uhd.screenshot({path:'artifacts/4k-hero.png',animations:'disabled'});

  const reduced=await browser.newPage({viewport:{width:1024,height:768},reducedMotion:'reduce'});
  await reduced.goto(base,{waitUntil:'domcontentloaded'});
  assert.ok(parseFloat(await reduced.locator('.reveal').first().evaluate(el=>getComputedStyle(el).transitionDuration)) <= 0.00002);
  await reduced.close();

  assert.deepEqual(errors,[]);
  console.log('Desktop template, contact workflow and motion hero: PASS');
  console.log('Mobile 390px and 320px responsive layout: PASS');
  console.log('4K 3840x2160 layout: PASS');
  console.log('Browser smoke suite: ALL PASSED');
}finally{await browser.close()}
