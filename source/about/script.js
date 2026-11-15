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

    // Update lightbox if currently open
    if (typeof updateActiveLightbox === 'function') {
      updateActiveLightbox();
    }
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

    // 6. Modern Glassmorphism Lightbox Controller
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
      const lightboxImg = document.getElementById('lightbox-img');
      const lightboxTag = document.getElementById('lightbox-tag');
      const lightboxTitle = document.getElementById('lightbox-title');
      const closeBtn = lightbox.querySelector('.lightbox-close');
      const prevBtn = lightbox.querySelector('.lightbox-prev');
      const nextBtn = lightbox.querySelector('.lightbox-next');
      const backdrop = lightbox.querySelector('.lightbox-backdrop');

      let currentGallery = [];
      let currentIndex = -1;

      function getCurrentLang() {
        return document.body.classList.contains('lang-zh') ? 'zh' : 'en';
      }

      function updateLightboxContent() {
        if (currentIndex < 0 || currentIndex >= currentGallery.length) return;
        const item = currentGallery[currentIndex];
        const lang = getCurrentLang();
        const imgSrc = item.dataset.imgSrc || item.querySelector('img')?.getAttribute('src');
        const tag = lang === 'zh' ? (item.dataset.tagZh || '') : (item.dataset.tagEn || '');
        const title = lang === 'zh' ? (item.dataset.titleZh || item.querySelector('img')?.alt || '') : (item.dataset.titleEn || item.querySelector('img')?.alt || '');

        if (imgSrc) {
          lightboxImg.src = imgSrc;
          lightboxImg.alt = title;
        }

        if (tag) {
          lightboxTag.textContent = tag;
          lightboxTag.style.display = 'inline-block';
        } else {
          lightboxTag.style.display = 'none';
        }

        lightboxTitle.textContent = title;
      }

      window.updateActiveLightbox = function () {
        if (lightbox.classList.contains('active')) {
          updateLightboxContent();
        }
      };

      function openLightbox(item) {
        if (!item) return;
        const isGallery = item.dataset.lightbox === 'gallery';

        if (isGallery) {
          currentGallery = Array.from(document.querySelectorAll('[data-lightbox="gallery"]'));
          currentIndex = currentGallery.indexOf(item);
          if (prevBtn) prevBtn.style.display = currentGallery.length > 1 ? 'flex' : 'none';
          if (nextBtn) nextBtn.style.display = currentGallery.length > 1 ? 'flex' : 'none';
        } else {
          currentGallery = [item];
          currentIndex = 0;
          if (prevBtn) prevBtn.style.display = 'none';
          if (nextBtn) nextBtn.style.display = 'none';
        }

        updateLightboxContent();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => {
          if (!lightbox.classList.contains('active')) {
            lightboxImg.src = '';
          }
        }, 300);
      }

      function showPrev() {
        if (currentGallery.length <= 1) return;
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxContent();
      }

      function showNext() {
        if (currentGallery.length <= 1) return;
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightboxContent();
      }

      // Attach click listeners to all triggers
      document.querySelectorAll('.lightbox-trigger, [data-lightbox]').forEach((el) => {
        el.addEventListener('click', (e) => {
          // Do not open if clicking an interactive child (link, button, etc.)
          if (e.target.closest('a') || e.target.closest('button')) return;
          openLightbox(el);
        });
      });

      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
      if (backdrop) backdrop.addEventListener('click', closeLightbox);
      if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
      if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
      });
    }
  });
})();
