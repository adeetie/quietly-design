/* Quietly Design System — Interactive JS */

(function () {

  // ─── Accordion ──────────────────────────────────────────────

  function initAccordions() {
    document.querySelectorAll('.ds-accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const accordion = trigger.closest('.ds-accordion');
        const isOpen = accordion.classList.contains('open');

        // Close all others
        document.querySelectorAll('.ds-accordion.open').forEach(a => {
          if (a !== accordion) a.classList.remove('open');
        });

        accordion.classList.toggle('open', !isOpen);
      });
    });

    // Open first accordion by default
    const first = document.querySelector('.ds-accordion');
    if (first) first.classList.add('open');
  }

  // ─── Copy Code ──────────────────────────────────────────────

  function initCodeCopy() {
    document.querySelectorAll('.ds-code-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const codeEl = btn.closest('.ds-code');
        const text = codeEl.querySelector('code')?.textContent || codeEl.textContent.replace('Copy', '').trim();
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  // ─── Swatch Copy (click to copy hex) ────────────────────────

  function initSwatchCopy() {
    document.querySelectorAll('.ds-swatch-card[data-hex]').forEach(card => {
      card.addEventListener('click', () => {
        const hex = card.dataset.hex;
        if (!hex) return;
        navigator.clipboard.writeText(hex).then(() => {
          const orig = card.querySelector('.ds-swatch-hex');
          if (!orig) return;
          const original = orig.textContent;
          orig.textContent = 'Copied!';
          orig.style.color = '#009DA3';
          setTimeout(() => {
            orig.textContent = original;
            orig.style.color = '';
          }, 1500);
        });
      });
    });
  }

  // ─── Active nav link ────────────────────────────────────────

  function initNavHighlight() {
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('.ds-nav a').forEach(a => {
      if (a.getAttribute('href') === current) {
        a.classList.add('active');
      }
    });
  }

  // ─── Smooth scroll to open accordion ────────────────────────

  function initHashOpen() {
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const accordion = target.closest('.ds-accordion') || target;
    if (accordion.classList.contains('ds-accordion')) {
      // Close all first
      document.querySelectorAll('.ds-accordion.open').forEach(a => a.classList.remove('open'));
      accordion.classList.add('open');
      setTimeout(() => accordion.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }

  // ─── Init ────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initCodeCopy();
    initSwatchCopy();
    initNavHighlight();
    initHashOpen();
  });

})();
