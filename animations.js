/* ==========================================
   DANIEL — ALDENA STUDIO CRIMSON REDESIGN
   GSAP Animations, Slider & Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // 1. Custom Cursor Interactions
  const cursor = document.querySelector('.custom-cursor');
  const cursorText = document.querySelector('.custom-cursor-text');

  if (cursor && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive Hover Classes
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .btn-editorial, .service-item, .card-arrow-btn, .card-play-action');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // Play Reel Cursor Triggers
    const videoThumbnails = document.querySelectorAll('.video-thumbnail-wrapper');
    videoThumbnails.forEach((thumb) => {
      thumb.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-play');
        cursorText.textContent = 'PLAY REEL';
      });
      thumb.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-play');
      });
    });
  }

  // 2. Hero Interactive Slider (Aldena Studio Card Widget)
  const heroCardData = [
    {
      counter: '01/04',
      title: 'Brand Identity & Films',
      desc: 'We believe a cinematic story is a body of work, not just a video. Elevating luxury brands through light and emotion.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      counter: '02/04',
      title: 'High Fashion Cinema',
      desc: '35mm texture, bold shadow work, and haute couture choreography captured across iconic European architecture.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      counter: '03/04',
      title: 'Automotive Kinetics',
      desc: 'High-octane midnight motion tracking sleek automotive silhouettes under atmospheric city lights.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    },
    {
      counter: '04/04',
      title: 'Destination Stories',
      desc: 'Intimate, emotionally resonant documentary films set against dramatic mountain and coastal landscapes.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    }
  ];

  let currentCardIndex = 0;
  const cardCounter = document.getElementById('heroCardCounter');
  const cardTitle = document.getElementById('heroCardTitle');
  const cardDesc = document.getElementById('heroCardDesc');
  const cardAction = document.querySelector('.card-play-action');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');

  function updateHeroCard(index) {
    if (!cardTitle || !cardDesc) return;
    const data = heroCardData[index];

    gsap.to(['#heroCardCounter', '#heroCardTitle', '#heroCardDesc'], {
      opacity: 0,
      y: -10,
      duration: 0.25,
      onComplete: () => {
        cardCounter.textContent = data.counter;
        cardTitle.textContent = data.title;
        cardDesc.textContent = data.desc;
        cardAction.setAttribute('data-video-src', data.video);

        gsap.to(['#heroCardCounter', '#heroCardTitle', '#heroCardDesc'], {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
        });
      }
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentCardIndex = (currentCardIndex - 1 + heroCardData.length) % heroCardData.length;
      updateHeroCard(currentCardIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentCardIndex = (currentCardIndex + 1) % heroCardData.length;
      updateHeroCard(currentCardIndex);
    });
  }

  // 3. Hero Entrance Animations
  gsap.from('.hero-giant-title', {
    y: 60,
    opacity: 0,
    duration: 1.4,
    ease: 'power3.out',
    delay: 0.2,
  });

  gsap.from('.hero-tagline-block', {
    y: 30,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.4,
  });

  gsap.from('.hero-floating-card', {
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.5,
  });

  // 4. Services Hover Image Follower
  const serviceItems = document.querySelectorAll('.service-item');
  const previewContainer = document.querySelector('.service-preview-container');
  const previewImg = document.querySelector('.service-preview-img');

  if (serviceItems.length > 0 && previewContainer && window.innerWidth > 768) {
    let pMouseX = 0;
    let pMouseY = 0;
    let containerX = 0;
    let containerY = 0;

    window.addEventListener('mousemove', (e) => {
      pMouseX = e.clientX;
      pMouseY = e.clientY;
    });

    function updatePreviewPos() {
      containerX += (pMouseX - containerX) * 0.15;
      containerY += (pMouseY - containerY) * 0.15;
      previewContainer.style.left = `${containerX}px`;
      previewContainer.style.top = `${containerY}px`;
      requestAnimationFrame(updatePreviewPos);
    }
    requestAnimationFrame(updatePreviewPos);

    serviceItems.forEach((item) => {
      item.addEventListener('mouseenter', function () {
        const imgSrc = this.getAttribute('data-preview');
        if (imgSrc) {
          previewImg.src = imgSrc;
          previewContainer.classList.add('active');
        }
      });

      item.addEventListener('mouseleave', function () {
        previewContainer.classList.remove('active');
      });
    });
  }

  // 5. Experience Counter Animation
  const counterElements = document.querySelectorAll('.counter-val');
  counterElements.forEach((counter) => {
    const targetVal = parseInt(counter.getAttribute('data-target'), 10);
    
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val);
          },
        });
      },
    });
  });

  // 6. Section Titles & Dividers GSAP Reveals
  const sectionTags = document.querySelectorAll('.section-tag, .section-title-large');
  sectionTags.forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
      },
    });
  });
});
