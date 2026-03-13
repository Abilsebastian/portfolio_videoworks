// reveal.js — IntersectionObserver scroll reveals
const revealEls = document.querySelectorAll('[data-r]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px',
});

revealEls.forEach((el, i) => {
  // Stagger delay per group of 5
  el.style.transitionDelay = (i % 5) * 0.09 + 's';
  observer.observe(el);
});
