const nav = document.getElementById("nav");

window.SiteRuntime = window.SiteRuntime || {};

function setNavScrolled(scrollValue = window.scrollY) {
  if (!nav) {
    return;
  }

  nav.classList.toggle("scrolled", scrollValue > 40);
}

function initSmoothScroll() {
  if (!window.Lenis) {
    return null;
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  const lenis = new window.Lenis({
    duration: 1.25,
    smoothWheel: true,
    touchMultiplier: 1.1
  });

  const frame = (time) => {
    lenis.raf(time);
    window.requestAnimationFrame(frame);
  };

  window.requestAnimationFrame(frame);

  lenis.on("scroll", ({ scroll }) => {
    setNavScrolled(scroll);

    if (window.ScrollTrigger) {
      window.ScrollTrigger.update();
    }
  });

  return lenis;
}

window.SiteRuntime.lenis = initSmoothScroll();
window.SiteRuntime.refreshScroll = () => {
  if (window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }
};

setNavScrolled();

window.addEventListener(
  "scroll",
  () => {
    if (!window.SiteRuntime.lenis) {
      setNavScrolled();
    }
  },
  { passive: true }
);

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
