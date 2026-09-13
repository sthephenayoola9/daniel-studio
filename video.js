/* ==========================================
   DANIEL — EDITORIAL MINIMALISM PORTFOLIO
   Fullscreen Video Lightbox Modal Manager
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.video-lightbox-modal');
  const closeBtn = document.querySelector('.lightbox-close-btn');
  const videoElement = document.querySelector('.lightbox-video-element');
  const videoTriggers = document.querySelectorAll('[data-video-src]');

  if (!modal || !videoElement) return;

  // Open Lightbox
  function openLightbox(videoSrc) {
    if (!videoSrc) return;
    
    // Set video source
    videoElement.src = videoSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Auto play video safely
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log('Autoplay prevented or video loading: ', err);
      });
    }

    // Disable Lenis scrolling while video is active if present
    if (window.lenis) {
      window.lenis.stop();
    }
  }

  // Close Lightbox
  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    videoElement.pause();
    videoElement.currentTime = 0;
    videoElement.src = '';

    if (window.lenis) {
      window.lenis.start();
    }
  }

  // Event Listeners for triggers
  videoTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const videoSrc = trigger.getAttribute('data-video-src');
      openLightbox(videoSrc);
    });
  });

  // Close Button Click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // Click Outside Video Container to Close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Escape Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
});
