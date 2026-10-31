'use strict';
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
toggle.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(expanded)); navigation.classList.toggle('is-open', expanded); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const config = window.RETRO_CONFIG || {};
const email = typeof config.email === 'string' ? config.email.trim() : '';
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
 const emailLink = document.querySelector('#contact-email'); const cta = document.querySelector('#contact-cta');
 emailLink.textContent = email; emailLink.href = 'mailto:' + email; emailLink.hidden = false;
 cta.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Engineering enquiry — Retro Dynamics'); cta.hidden = false;
 document.querySelector('#contact-placeholder').hidden = true;
}
for (const field of ['phone', 'location']) { if (typeof config[field] === 'string' && config[field].trim()) { const element = document.querySelector('#contact-' + field); element.textContent = config[field].trim(); element.hidden = false; } }
document.querySelector('#year').textContent = new Date().getFullYear();

// Render only explicitly configured, valid public social profile URLs.
const socials = config.socials || {};
const socialContainer = document.querySelector('#social-links');
const socialNames = { linkedin: 'LinkedIn', instagram: 'Instagram', youtube: 'YouTube' };
for (const [key, label] of Object.entries(socialNames)) {
  try {
    const value = typeof socials[key] === 'string' ? socials[key].trim() : '';
    if (!value) continue;
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) continue;
    const link = document.createElement('a');
    link.href = url.href; link.textContent = label + ' ↗';
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    socialContainer.appendChild(link); socialContainer.hidden = false;
  } catch { /* Invalid profile URLs stay hidden. */ }
}
