const heroPoster = document.getElementById("heroPoster");
const heroVideoSlot = document.getElementById("heroVid");
const heroTitle = document.getElementById("heroTitle");
const heroLocation = document.getElementById("heroLoc");
const heroDescription = document.getElementById("heroDesc");

function splitHeroTitle() {
  if (!heroTitle || heroTitle.dataset.splitReady === "true") {
    return;
  }

  const splitNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const fragment = document.createDocumentFragment();

      node.textContent.split("").forEach((character) => {
        if (character === " ") {
          fragment.appendChild(document.createTextNode(" "));
          return;
        }

        const span = document.createElement("span");
        span.className = "char";
        span.textContent = character;
        fragment.appendChild(span);
      });

      node.parentNode.replaceChild(fragment, node);
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "BR") {
      [...node.childNodes].forEach(splitNode);
    }
  };

  [...heroTitle.childNodes].forEach(splitNode);

  heroTitle.querySelectorAll(".char").forEach((character, index) => {
    character.style.animationDelay = index * 0.045 + 0.25 + "s";
  });

  heroTitle.dataset.splitReady = "true";
}

function animateHeroSupportingText() {
  if (!heroLocation || !heroDescription) {
    return;
  }

  heroLocation.style.opacity = "0";
  heroLocation.style.transform = "translateY(14px)";
  heroLocation.style.transition = "opacity 0.7s 0.9s ease, transform 0.7s 0.9s ease";

  heroDescription.style.opacity = "0";
  heroDescription.style.transform = "translateY(14px)";
  heroDescription.style.transition = "opacity 0.7s 1.1s ease, transform 0.7s 1.1s ease";

  window.requestAnimationFrame(() => {
    heroLocation.style.opacity = "0.8";
    heroLocation.style.transform = "translateY(0)";
    heroDescription.style.opacity = "1";
    heroDescription.style.transform = "translateY(0)";
  });
}

function hideHeroPoster() {
  if (!heroPoster) {
    return;
  }

  heroPoster.classList.add("gone");
  heroPoster.setAttribute("aria-hidden", "true");
}

function playHero() {
  if (!heroVideoSlot || !window.MediaLibrary) {
    return;
  }

  const mediaKey = heroVideoSlot.dataset.mediaKey;
  const mediaVariant = heroVideoSlot.dataset.mediaVariant || "hero";

  if (!window.MediaLibrary.hasSource(mediaKey, mediaVariant)) {
    window.MediaLibrary.renderMediaSlot(heroVideoSlot, mediaKey, mediaVariant);
    hideHeroPoster();
    return;
  }

  const node = window.MediaLibrary.renderMediaSlot(heroVideoSlot, mediaKey, mediaVariant, {
    autoplay: true,
    loop: true,
    muted: true,
    playsinline: true,
    preload: "auto"
  });

  hideHeroPoster();

  if (node && typeof node.play === "function") {
    const attempt = node.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {});
    }
  }
}

function initHeroPosterTrigger() {
  if (!heroPoster) {
    return;
  }

  heroPoster.addEventListener("click", playHero);
  heroPoster.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    playHero();
  });
}

function initHeroAutoplay() {
  if (!heroVideoSlot || !window.MediaLibrary) {
    return;
  }

  const mediaKey = heroVideoSlot.dataset.mediaKey;
  const mediaVariant = heroVideoSlot.dataset.mediaVariant || "hero";

  if (!window.MediaLibrary.hasSource(mediaKey, mediaVariant)) {
    return;
  }

  playHero();
}

function initHeroParallax() {
  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  window.gsap.to("#heroContent", {
    y: -80,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
}

splitHeroTitle();
animateHeroSupportingText();
initHeroPosterTrigger();
initHeroAutoplay();
initHeroParallax();

window.playHero = playHero;
