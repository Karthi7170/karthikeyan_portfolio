import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import test from 'node:test';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');
const js=readFileSync(new URL('../script.js',import.meta.url),'utf8');

test('AI x MAD brand-first structure and navigation',()=>{
  for(const id of ['home','services','work','process','contact']) assert.match(html,new RegExp('id="'+id+'"'));
  assert.match(html,/AI x MAD/);
  assert.match(html,/Creative technology studio/);
  assert.match(html,/href="#work"/);
  assert.match(html,/href="#contact"/);
});

test('Reference-inspired hero uses Higgsfield motion and original UI overlay',()=>{
  const hero=html.match(/<section id="home"[\s\S]*?<\/section>/)?.[0]??'';
  assert.match(hero,/id="hero-motion-video"/);
  assert.match(hero,/class="motion-ui"/);
  assert.match(hero,/class="ui-orbit/);
  assert.match(hero,/Motion generated for AI x MAD with Higgsfield/);
  assert.doesNotMatch(hero,/portrait\.webp/i);
  assert.doesNotMatch(hero,/HIGGSFIELD_MOTION_URL/);
});

test('Professional type and responsive layout are present',()=>{
  assert.match(html,/Inter\+Tight/);
  assert.match(css,/"Inter Tight"/);
  for(const bp of ['1100px','900px','650px','390px']) assert.ok(css.includes('@media(max-width:'+bp+')'));
  assert.match(css,/prefers-reduced-motion:reduce/);
  assert.match(css,/\.motion-frame/);
});

test('All existing portfolio destinations are preserved',()=>{
  for(const url of ['https://royaltiles.vercel.app/','https://sugumar-portfolio-beta.vercel.app/','https://vip-hunter.vercel.app/','https://www.deccanmatric.in/']) assert.ok(html.includes(url),url);
  assert.equal((html.match(/data-work-slide/g)??[]).length,4);
});

test('Contact and WhatsApp workflow remains functional',()=>{
  assert.match(html,/id="contact-form"/);
  assert.match(html,/name="phone" value="919944754339"/);
  assert.match(html,/https:\/\/wa\.me\/919944754339/);
  assert.match(html,/karthikumaran7170@gmail\.com/);
  assert.match(js,/encodeURIComponent\(lines\.join\('\\n'\)\)/);
  assert.match(js,/https:\/\/wa\.me\/919944754339\?text=/);
});

test('JavaScript parses and interactive behavior is wired',()=>{
  new Script(js,{filename:'script.js'});
  assert.match(js,/IntersectionObserver/);
  assert.match(js,/menu\.addEventListener/);
  assert.match(js,/video\.play\(\)/);
  assert.match(js,/\.motion-frame/);
  assert.match(js,/navigator\.clipboard/);
});

test('External project links are protected',()=>{
  const targets=html.match(/target="_blank"/g)??[];
  const rels=html.match(/target="_blank" rel="noopener noreferrer"/g)??[];
  assert.equal(targets.length,rels.length);
  assert.doesNotMatch(html,/href="#"/);
});


test('Selected work is a user-controllable 2-second swipe carousel',()=>{
  assert.match(html,/data-work-carousel/);
  assert.equal((html.match(/data-work-slide/g)??[]).length,4);
  assert.equal((html.match(/data-work-dot=/g)??[]).length,4);
  assert.match(html,/class="[^"]*work-prev[^"]*"/);
  assert.match(html,/class="[^"]*work-next[^"]*"/);
  assert.match(css,/scroll-snap-type:x mandatory/);
  assert.match(css,/\.project-card\.is-active/);
  assert.match(js,/setInterval\([\s\S]*?updateWorkUI\(workIndex\+1,[\s\S]*?2000\)/);
  assert.match(js,/reduceMotion\.matches/);
  assert.match(js,/pointerdown',\(\)=>\{stopAuto/);
});
