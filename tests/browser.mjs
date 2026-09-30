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

  await desktop.locator('[data-work-carousel]').scrollIntoViewIfNeeded();
  await desktop.waitForTimeout(250);
  const firstWork=await desktop.locator('.project-card.is-active h3').innerText();
  assert.equal(firstWork,'New Royal Tiles');
  await desktop.waitForTimeout(2250);
  console.log('EARLY PAGE ERRORS',JSON.stringify(errors));
  console.log('AIMAD SCRIPT DEBUG',JSON.stringify(await desktop.evaluate(()=>window.__aimadDebug||null)));
  const carouselDebug=await desktop.locator('[data-work-carousel]').evaluate(el=>({ticks:el.dataset.autoTicks,hidden:document.hidden,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,scroll:el.querySelector('.work-viewport').scrollLeft}));
  console.log('WORK CAROUSEL DEBUG',JSON.stringify(carouselDebug));
  const autoWork=await desktop.locator('.project-card.is-active h3').innerText();
  assert.equal(autoWork,'Sugumar Portfolio','Work carousel should auto-swipe after 2 seconds');
  await desktop.locator('.work-next').click();
  assert.equal(await desktop.locator('.project-card.is-active h3').innerText(),'VIP-Hunter');
  await desktop.locator('.work-prev').click();
  assert.equal(await desktop.locator('.project-card.is-active h3').innerText(),'Sugumar Portfolio');
  console.log('2-second selected-work swipe carousel: PASS');

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
