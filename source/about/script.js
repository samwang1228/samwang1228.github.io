/**
 * About Page Interactive Script
 * Handles bilingual switching (English default) & mobile navigation
 */

(function () {
  'use strict';

  // 1. Language Toggle Logic
  const LANG_STORAGE_KEY = 'portfolio_preferred_lang';
  const DEFAULT_LANG = 'en'; // Default to English as requested

  function getInitialLanguage() {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'zh' || saved === 'en' ? saved : DEFAULT_LANG;
  }

  function setLanguage(lang) {
    const isEn = lang === 'en';
    document.body.classList.remove('lang-en', 'lang-zh');
    document.body.classList.add(isEn ? 'lang-en' : 'lang-zh');

    // Update active button state
    const enBtns = document.querySelectorAll('.lang-btn-en');
    const zhBtns = document.querySelectorAll('.lang-btn-zh');

    enBtns.forEach((btn) => btn.classList.toggle('active', isEn));
    zhBtns.forEach((btn) => btn.classList.toggle('active', !isEn));

    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = isEn ? 'en' : 'zh-TW';
  }

  // 2. Initialize DOM event listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    setLanguage(getInitialLanguage());

    // Bind language buttons
    document.querySelectorAll('.lang-btn-en').forEach((btn) => {
      btn.addEventListener('click', () => setLanguage('en'));
    });

    document.querySelectorAll('.lang-btn-zh').forEach((btn) => {
      btn.addEventListener('click', () => setLanguage('zh'));
    });

    // 3. Mobile Navigation Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-xmark');
        }
      });

      // Close menu when clicking any nav link
      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
          }
        });
      });
    }

    // 4. Smooth Anchor Link Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });

    // 5. Smart Auto-Image Loader for Placeholders
    document.querySelectorAll('[data-auto-img]').forEach((box) => {
      const imgSrc = box.getAttribute('data-auto-img');
      if (!imgSrc) return;

      const testImg = new Image();
      testImg.onload = function () {
        const altText = box.querySelector('h4')?.textContent?.trim() || 'Photo';
        box.classList.add('has-image');
        box.innerHTML = '';
        const realImg = document.createElement('img');
        realImg.src = imgSrc;
        realImg.alt = altText;
        box.appendChild(realImg);
      };
      testImg.src = imgSrc;
    });
  });
})();
