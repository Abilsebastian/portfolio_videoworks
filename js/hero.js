// hero.js - hero showreel playback using the shared media registry

const heroPoster = document.getElementById('heroPoster');
const heroVid = document.getElementById('heroVid');
const HERO_MEDIA_KEY = heroVid ? heroVid.dataset.mediaKey : '';

function hideHeroPoster() {
  if (!heroPoster) return;

  heroPoster.classList.add('gone');
  heroPoster.setAttribute('aria-hidden', 'true');
}

function autoplayHero() {
  if (!window.MediaLibrary || !heroVid) return;

  if (!window.MediaLibrary.hasSource(HERO_MEDIA_KEY, 'hero')) {
    window.MediaLibrary.renderMediaSlot(heroVid, HERO_MEDIA_KEY, 'hero');
    hideHeroPoster();
    return;
  }

  const node = window.MediaLibrary.renderMediaSlot(heroVid, HERO_MEDIA_KEY, 'hero', {
    autoplay: true,
    loop: true,
    muted: true,
    playsinline: true,
    preload: 'auto'
  });

  if (!node) return;

  heroVid.dataset.mediaLoaded = 'true';
  hideHeroPoster();

  if (typeof node.play === 'function') {
    const playAttempt = node.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {
        // Keep the rendered video in place even if autoplay is blocked.
      });
    }
  }
}

if (heroVid) {
  autoplayHero();
}
