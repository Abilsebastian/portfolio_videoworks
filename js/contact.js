// contact.js — Contact form submission handler

const form    = document.getElementById('contactForm');
const submitBtn = form.querySelector('.fsub');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    submitBtn.textContent = 'Fill all fields ✕';
    submitBtn.style.background = '#4a2020';
    setTimeout(() => {
      submitBtn.textContent = 'Send message →';
      submitBtn.style.background = '';
    }, 2500);
    return;
  }

  // ─────────────────────────────────────────────────────
  // OPTION A — Formspree (free, no backend needed)
  // 1. Go to https://formspree.io and create a free account
  // 2. Create a new form, get your endpoint URL
  // 3. Replace the fetch URL below with your Formspree endpoint
  //    e.g. 'https://formspree.io/f/xabc1234'
  //
  // OPTION B — EmailJS (send direct from browser)
  // See https://www.emailjs.com for setup
  //
  // OPTION C — mailto fallback (zero setup, basic)
  // Uncomment the block below and remove the fetch block
  // ─────────────────────────────────────────────────────

  // ── Formspree fetch ──
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // ← replace

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  })
    .then((res) => {
      if (res.ok) {
        submitBtn.textContent = 'Sent ✓';
        submitBtn.style.background = '#2a4a2a';
        form.reset();
        setTimeout(() => {
          submitBtn.textContent = 'Send message →';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Server error');
      }
    })
    .catch(() => {
      // ── Mailto fallback if fetch fails ──
      const subject  = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body     = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:hello@draftclub.studio?subject=${subject}&body=${body}`;
      submitBtn.textContent = 'Send message →';
      submitBtn.disabled = false;
    });

  /* ── OPTION C: pure mailto (uncomment to use instead) ──
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:hello@draftclub.studio?subject=${subject}&body=${body}`;
  */
});
