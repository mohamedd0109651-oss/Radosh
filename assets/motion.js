/* ============================================================
   MAGICAL MOTION — Luxury Interaction Layer
   Redesigned for Pearl & Liquid Gold theme.
   ============================================================ */

(function () {
  'use strict';

  const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNavLinks();
    initMagicalCursor();
    initScrollReveal();
    initMagneticElements();
    initNavbarShrink();
    initSuccessBoxObserver();
  });

  /* ── 0. PERSISTENT THEME TOGGLE (Light / Dark) ── */
  function initThemeToggle() {
    const root = document.documentElement;

    const applyTheme = (theme) => {
      root.setAttribute('data-theme', theme);
      try { localStorage.setItem('site-theme', theme); } catch (e) {}
    };

    // Ensure theme is correctly applied (in case theme-init.js wasn't present)
    if (!root.getAttribute('data-theme')) {
      let saved = 'light';
      try { saved = localStorage.getItem('site-theme') === 'dark' ? 'dark' : 'light'; } catch (e) {}
      applyTheme(saved);
    }

    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = 'true';
      btn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });

    // Sync across tabs / pages
    window.addEventListener('storage', (e) => {
      if (e.key === 'site-theme' && e.newValue) {
        root.setAttribute('data-theme', e.newValue);
      }
    });
  }

  /* ── 0b. MOBILE NAV LINKS (index.html capsule navbar) ── */
  function initMobileNavLinks() {
    const btn = document.getElementById('nav-toggle-btn');
    const links = document.querySelector('.site-nav .nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      links.classList.toggle('open');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x-lg');
      }
    });

    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* ── 1. MAGICAL CURSOR (Desktop Only) ── */
  function initMagicalCursor() {
    if (isCoarsePointer) return;

    const cursor = document.createElement('div');
    cursor.id = 'magical-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      let dx = mouseX - cursorX;
      let dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
      requestAnimationFrame(animate);
    }
    animate();

    // Interaction states
    const updateCursor = (hovering) => {
      if (hovering) {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.background = 'rgba(230, 213, 184, 0.3)';
        cursor.style.mixBlendMode = 'difference';
      } else {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = '#e6d5b8';
        cursor.style.mixBlendMode = 'multiply';
      }
    };

    const bindInteractive = () => {
      document.querySelectorAll('a, button, .port-card, .nav-item, input, textarea, .media-card').forEach(el => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = 'true';
        el.addEventListener('mouseenter', () => updateCursor(true));
        el.addEventListener('mouseleave', () => updateCursor(false));
      });
    };

    bindInteractive();
    new MutationObserver(bindInteractive).observe(document.body, { childList: true, subtree: true });
  }

  /* ── 2. SCROLL REVEAL (Cinematic) ── */
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const observeAll = () => {
      document.querySelectorAll('.fade-up, .port-card, .media-card, .panel, .stat-card, .info-card').forEach(el => {
        if (el.dataset.revealBound) return;
        el.dataset.revealBound = 'true';
        if (!el.classList.contains('fade-up')) el.classList.add('fade-up');
        observer.observe(el);
      });
    };

    observeAll();
    new MutationObserver(observeAll).observe(document.body, { childList: true, subtree: true });
  }

  /* ── 3. MAGNETIC ATTRACTION ── */
  function initMagneticElements() {
    if (isCoarsePointer) return;

    const bindMagnets = () => {
      document.querySelectorAll('.btn-login, .btn-send, .btn-publish, .brand').forEach(m => {
        if (m.dataset.magneticBound) return;
        m.dataset.magneticBound = 'true';
        
        m.addEventListener('mousemove', (e) => {
          const rect = m.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          m.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
        });
        
        m.addEventListener('mouseleave', () => {
          m.style.transform = `translate3d(0, 0, 0)`;
        });
      });
    };

    bindMagnets();
    new MutationObserver(bindMagnets).observe(document.body, { childList: true, subtree: true });
  }

  /* ── 4. NAVBAR CONDENSE ── */
  function initNavbarShrink() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ── 5. SUCCESS BOX OBSERVER ── */
  function initSuccessBoxObserver() {
    const box = document.getElementById('success-box');
    if (!box) return;
    const mo = new MutationObserver(() => {
      if (box.style.display === 'block') {
        requestAnimationFrame(() => box.classList.add('visible'));
      }
    });
    mo.observe(box, { attributes: true, attributeFilter: ['style'] });
  }

})();
