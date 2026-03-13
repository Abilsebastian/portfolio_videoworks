// modal.js — Video lightbox

const modal      = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const mIframe    = document.getElementById('mIframe');

function openModal(videoUrl) {
  mIframe.src = videoUrl;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  mIframe.src = '';                    // stop video playback
  document.body.style.overflow = '';
}

// Close on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Close button
modalClose.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Expose globally so work.js can call it
window.openModal = openModal;
