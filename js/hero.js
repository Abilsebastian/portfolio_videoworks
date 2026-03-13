// hero.js — Hero showreel background video

// ─────────────────────────────────────────────
// ↓↓↓  REPLACE WITH YOUR ACTUAL VIDEO URL  ↓↓↓
//
// YouTube (muted loop):
//   https://www.youtube.com/embed/YOUR_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_ID&controls=0&modestbranding=1&playsinline=1
//
// Vimeo (background mode):
//   https://player.vimeo.com/video/YOUR_ID?autoplay=1&loop=1&muted=1&background=1
//
// Self-hosted (see index.html for <video> tag approach):
//   Replace iframe with: <video src="assets/video/showreel.mp4" autoplay muted loop playsinline></video>
// ─────────────────────────────────────────────
const SHOWREEL_URL = 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID&controls=0&modestbranding=1&playsinline=1';

const heroPoster = document.getElementById('heroPoster');
const heroVid    = document.getElementById('heroVid');

function playHero() {
  const iframe = document.createElement('iframe');
  iframe.src    = SHOWREEL_URL;
  iframe.allow  = 'autoplay; fullscreen';
  iframe.setAttribute('frameborder', '0');
  heroVid.appendChild(iframe);
  heroPoster.classList.add('gone');
}

heroPoster.addEventListener('click', playHero);
