const nav = document.getElementById("nav");
const desktopScrollQuery = window.matchMedia("(min-width: 901px)");

window.SiteRuntime = window.SiteRuntime || {};
window.SiteRuntime.lenis = null;
window.SiteRuntime.lenisTicker = null;

function setNavScrolled(scrollValue = window.scrollY) {
  if (!nav) {
    return;
  }

  nav.classList.toggle("scrolled", scrollValue > 40);
}

function refreshScrollTriggers() {
  if (window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }
}

function destroySmoothScroll() {
  const { lenis, lenisTicker } = window.SiteRuntime;

  if (!lenis) {
    return;
  }

  if (window.gsap && lenisTicker) {
    window.gsap.ticker.remove(lenisTicker);
  }

  if (typeof lenis.destroy === "function") {
    lenis.destroy();
  }

  window.SiteRuntime.lenis = null;
  window.SiteRuntime.lenisTicker = null;
  document.documentElement.classList.remove("has-smooth-scroll");
}

function createSmoothScroll() {
  if (!desktopScrollQuery.matches || !window.Lenis) {
    destroySmoothScroll();
    return null;
  }

  if (window.SiteRuntime.lenis) {
    return window.SiteRuntime.lenis;
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  const lenis = new window.Lenis({
    duration: 1.15,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1
  });

  lenis.on("scroll", ({ scroll }) => {
    setNavScrolled(scroll);

    if (window.ScrollTrigger) {
      window.ScrollTrigger.update();
    }
  });

  if (window.gsap) {
    const ticker = (time) => {
      lenis.raf(time * 1000);
    };

    window.gsap.ticker.add(ticker);
    window.gsap.ticker.lagSmoothing(0);
    window.SiteRuntime.lenisTicker = ticker;
  } else {
    const frame = (time) => {
      if (window.SiteRuntime.lenis !== lenis) {
        return;
      }

      lenis.raf(time);
      window.requestAnimationFrame(frame);
    };

    window.requestAnimationFrame(frame);
  }

  if (typeof lenis.resize === "function") {
    window.addEventListener("load", () => {
      lenis.resize();
    });
  }

  window.SiteRuntime.lenis = lenis;
  document.documentElement.classList.add("has-smooth-scroll");
  return lenis;
}

function syncScrollMode() {
  if (desktopScrollQuery.matches) {
    createSmoothScroll();
  } else {
    destroySmoothScroll();
  }

  setNavScrolled();
  window.requestAnimationFrame(refreshScrollTriggers);
}

window.SiteRuntime.refreshScroll = () => {
  if (window.SiteRuntime.lenis && typeof window.SiteRuntime.lenis.resize === "function") {
    window.SiteRuntime.lenis.resize();
  }

  refreshScrollTriggers();
};

setNavScrolled();
syncScrollMode();

window.addEventListener(
  "scroll",
  () => {
    if (!window.SiteRuntime.lenis) {
      setNavScrolled();
    }
  },
  { passive: true }
);

if (typeof desktopScrollQuery.addEventListener === "function") {
  desktopScrollQuery.addEventListener("change", syncScrollMode);
} else if (typeof desktopScrollQuery.addListener === "function") {
  desktopScrollQuery.addListener(syncScrollMode);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  const targetId = link.getAttribute("href");

  if (!targetId || targetId === "#") {
    return;
  }

  const target = document.querySelector(targetId);
  if (!target) {
    return;
  }

  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (window.SiteRuntime.lenis) {
      window.SiteRuntime.lenis.scrollTo(target, { offset: -24 });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
