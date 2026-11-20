/* Before You Go to Heaven — Main JavaScript */

(function () {
  'use strict';

  // Header scroll effect
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.classList.toggle('open');
      menu.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll-reveal for .fade-in elements
  var faders = document.querySelectorAll('.fade-in');
  if (faders.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    faders.forEach(function (el) { observer.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('visible'); });
  }

  // Random book cover animations on each page load
  var frontAnims = [
    'cover-anim-fade-rise',
    'cover-anim-fade-scale',
    'cover-anim-slide-left',
    'cover-anim-slide-right',
    'cover-anim-flip-in',
    'cover-anim-drop-bounce',
    'cover-anim-zoom-spin',
    'cover-anim-tilt-rise'
  ];
  var backAnims = [
    'back-anim-reveal-right',
    'back-anim-reveal-down',
    'back-anim-reveal-fan',
    'back-anim-reveal-scale'
  ];

  document.querySelectorAll('.book-cover-scene').forEach(function (scene) {
    var front = scene.querySelector('.book-cover-front');
    var back = scene.querySelector('.book-cover-back');
    if (front) {
      front.classList.add(frontAnims[Math.floor(Math.random() * frontAnims.length)]);
    }
    if (back) {
      back.classList.add(backAnims[Math.floor(Math.random() * backAnims.length)]);
    }
  });

  // Active nav link
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
