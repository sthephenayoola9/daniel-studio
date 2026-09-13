/* ==========================================
   DANIEL — EDITORIAL MINIMALISM PORTFOLIO
   Main Application Script (Lenis & Interactivity)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Synchronize Lenis with GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0, 0);
    }

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          lenis.scrollTo(targetEl, { offset: -60, duration: 1.5 });
        }
      });
    });
  }

  // 2. Navigation Scroll Blur & Background Change
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight based on scroll position
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggleBtn = document.querySelector('.mobile-menu-toggle');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggleBtn && mobileNavDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('active');
      const isOpened = mobileNavDrawer.classList.contains('active');
      if (isOpened) {
        mobileToggleBtn.children[0].style.transform = 'translateY(7.5px) rotate(45deg)';
        mobileToggleBtn.children[1].style.opacity = '0';
        mobileToggleBtn.children[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
        document.body.style.overflow = 'hidden';
      } else {
        mobileToggleBtn.children[0].style.transform = 'none';
        mobileToggleBtn.children[1].style.opacity = '1';
        mobileToggleBtn.children[2].style.transform = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('active');
        mobileToggleBtn.children[0].style.transform = 'none';
        mobileToggleBtn.children[1].style.opacity = '1';
        mobileToggleBtn.children[2].style.transform = 'none';
        document.body.style.overflow = 'auto';
      });
    });
  }

  // 4. Booking Form Handling
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('.form-submit-btn span');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'SESSION REQUESTED ✓';
      submitBtn.style.color = 'var(--accent-gold)';

      setTimeout(() => {
        bookingForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.color = '';
      }, 4000);
    });
  }
});
