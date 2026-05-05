// ============================================================
//  C. Nyalchand & Sons — Interactive Scripts
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 0. Hero Slider ────────────────────────────────────────
  const slider    = document.getElementById('hero-slider');
  const prevBtn   = document.getElementById('hero-prev');
  const nextBtn   = document.getElementById('hero-next');
  const dotsWrap  = document.getElementById('hero-dots');

  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    let current  = 0;
    let autoTimer;

    // Build dot nav
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = () => dotsWrap.querySelectorAll('.hero-dot');

    function goTo(n) {
      slides[current].classList.remove('active');
      dots()[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots()[current].classList.add('active');
    }

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
    slider.addEventListener('mouseleave', startAuto);

    // Touch swipe support
    let touchX = 0;
    slider.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      const diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
    });

    startAuto();
  }

  // ── 1. Dark Mode Toggle ──────────────────────────────────
  const darkToggle = document.getElementById('dark-mode-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Load saved preference or OS preference
  const savedTheme = localStorage.getItem('cnsons-theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (darkToggle) darkToggle.checked = true;
  }

  if (darkToggle) {
    darkToggle.addEventListener('change', () => {
      if (darkToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('cnsons-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('cnsons-theme', 'light');
      }
    });
  }

  // ── 2. Hamburger / Mobile Menu ────────────────────────────
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('nav-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── 3. Scroll Reveal Animations ──────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger siblings inside a grid
            const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
            siblings.forEach((el, idx) => {
              setTimeout(() => el.classList.add('visible'), idx * 80);
            });
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ── 4. Contact Form Validation & UX ──────────────────────
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    // Add floating-label effect
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('focus', () => field.parentElement.classList.add('focused'));
      field.addEventListener('blur',  () => {
        if (!field.value) field.parentElement.classList.remove('focused');
      });
      // Pre-fill state
      if (field.value) field.parentElement.classList.add('focused');
    });

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.field-error').forEach(el => el.remove());
      contactForm.querySelectorAll('.input-wrap').forEach(el => el.classList.remove('error'));

      const nameField  = document.getElementById('contact-name');
      const emailField = document.getElementById('contact-email');
      const msgField   = document.getElementById('contact-message');

      if (nameField && nameField.value.trim().length < 2) {
        showFieldError(nameField, 'Please enter your name.');
        valid = false;
      }

      if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        showFieldError(emailField, 'Please enter a valid email address.');
        valid = false;
      }

      if (msgField && msgField.value.trim().length < 10) {
        showFieldError(msgField, 'Please write a message (at least 10 characters).');
        valid = false;
      }

      if (valid) {
        // Simulate submit
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;

        setTimeout(() => {
          contactForm.style.display = 'none';
          if (formSuccess) {
            formSuccess.classList.add('visible');
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 1000);
      }
    });
  }

  function showFieldError(field, message) {
    const wrap = field.closest('.input-wrap');
    if (wrap) wrap.classList.add('error');
    const err = document.createElement('span');
    err.className = 'field-error';
    err.textContent = message;
    field.after(err);
  }

  // ── 5. Image Zoom / Tilt on Product Cards ─────────────────
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = (-dy * 4).toFixed(2);
      const rotY   = ( dx * 4).toFixed(2);
      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── 6. Category Card Icon Pulse on Hover ──────────────────
  document.querySelectorAll('.category-card').forEach(card => {
    const icon = card.querySelector('.cat-icon');
    card.addEventListener('mouseenter', () => icon && icon.classList.add('pulse'));
    card.addEventListener('mouseleave', () => icon && icon.classList.remove('pulse'));
  });

  // ── 7. Sticky Nav Shadow on Scroll ───────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── 8. Hero Parallax ─────────────────────────────────────
  const heroBanner = document.querySelector('.hero-banner');
  if (heroBanner) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      heroBanner.style.backgroundPositionY = `${offset * 0.4}px`;
    }, { passive: true });
  }

  // ── 9. Enquiry Modal (kurtas page) ───────────────────────
  const modal       = document.getElementById('enquiry-modal');
  const modalClose  = document.getElementById('modal-close');
  const modalTitle  = document.getElementById('modal-product-title');

  if (modal) {
    document.querySelectorAll('.btn-enquiry').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-product');
        if (modalTitle) modalTitle.textContent = title || 'this product';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // Modal form submit
    const modalForm = document.getElementById('enquiry-form');
    const modalSuccess = document.getElementById('enquiry-success');
    if (modalForm) {
      modalForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = modalForm.querySelector('button[type="submit"]');
        btn.textContent = 'Sending…';
        btn.disabled = true;
        setTimeout(() => {
          modalForm.style.display = 'none';
          if (modalSuccess) modalSuccess.style.display = 'block';
          setTimeout(closeModal, 2500);
        }, 900);
      });
    }
  }

});
