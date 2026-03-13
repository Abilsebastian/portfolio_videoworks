// hero.js - hero showreel playback using the shared media registry

const heroPoster = document.getElementById('heroPoster');
const heroVid = document.getElementById('heroVid');
const HERO_MEDIA_KEY = heroVid ? heroVid.dataset.mediaKey : '';

function playHero() {
  if (!window.MediaLibrary || !heroVid || !heroPoster) return;

  if (!window.MediaLibrary.hasSource(HERO_MEDIA_KEY, 'hero')) {
    window.MediaLibrary.renderMediaSlot(heroVid, HERO_MEDIA_KEY, 'hero');
    heroPoster.classList.add('gone');
    return;
  }

  if (heroVid.dataset.mediaLoaded === 'true') {
    heroPoster.classList.add('gone');
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
  heroPoster.classList.add('gone');
}

if (heroPoster && heroVid) {
  if (!window.MediaLibrary || !window.MediaLibrary.hasSource(HERO_MEDIA_KEY, 'hero')) {
    playHero();
  } else {
    heroPoster.addEventListener('click', playHero);
    heroPoster.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      playHero();
    });
  }
}
