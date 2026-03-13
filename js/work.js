// work.js — Filter buttons + click-to-open modal

const filterBtns = document.querySelectorAll('.fil');
const workItems  = document.querySelectorAll('.wi');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('on'));
    btn.classList.add('on');

    const cat = btn.dataset.filter;

    workItems.forEach((item) => {
      const show = cat === 'all' || item.dataset.cat === cat;
      item.style.display = show ? '' : 'none';
    });
  });
});

// Open modal on work item click
workItems.forEach((item) => {
  item.addEventListener('click', () => {
    const videoUrl = item.dataset.video;
    if (videoUrl) openModal(videoUrl);
  });
});
