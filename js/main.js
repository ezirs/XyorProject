/* ============================================================
   XYOR PROJECT — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Project Filter ─────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      projectCards.forEach((card, i) => {
        const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
        const show = filter === 'all' || tags.includes(filter);

        if (show) {
          card.classList.remove('hidden');
          card.style.animationDelay = `${i * 0.08}s`;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ── Scroll Reveal ──────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ── Smooth number counter ──────────────────────────────── */
  const statNums = document.querySelectorAll('.hero-stat-num[data-target]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current < target) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObserver.observe(el));
  } else {
    statNums.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      el.textContent = target + suffix;
    });
  }

  /* ── Nav active link ────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length && navLinks.length) {
    const highlightNav = () => {
      let current = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) current = sec.id;
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
  }

  /* ── Card click to detail page ──────────────────────────── */
  projectCards.forEach(card => {
    const detailUrl = card.dataset.href;
    if (detailUrl) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        // Don't navigate if clicking a link inside the card
        if (e.target.closest('a')) return;
        window.location.href = detailUrl;
      });
    }
  });

});
