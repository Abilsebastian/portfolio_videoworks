const workCards = [...document.querySelectorAll(".wcard")];
const workPin = document.getElementById("workPin");
const workRail = document.getElementById("workRail");
const workProgressBar = document.getElementById("workProgressBar");
let horizontalTween = null;

function openWorkCard(card) {
  if (!card || !window.Modal) {
    return;
  }

  window.Modal.openByKey(card.dataset.mediaKey);
}

workCards.forEach((card) => {
  card.addEventListener("click", () => {
    openWorkCard(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openWorkCard(card);
  });
});

function destroyHorizontalWork() {
  if (horizontalTween) {
    if (horizontalTween.scrollTrigger) {
      horizontalTween.scrollTrigger.kill();
    }

    horizontalTween.kill();
    horizontalTween = null;
  }

  if (workRail) {
    workRail.style.transform = "";
  }

  if (workProgressBar) {
    workProgressBar.style.width = "0%";
  }
}

function initHorizontalWork() {
  if (!workPin || !workRail || !window.gsap || !window.ScrollTrigger) {
    return;
  }

  destroyHorizontalWork();

  if (window.innerWidth <= 900) {
    return;
  }

  const scrollAmount = Math.max(workRail.scrollWidth - workPin.clientWidth, 0);

  if (scrollAmount <= 0) {
    return;
  }

  horizontalTween = window.gsap.to(workRail, {
    x: -scrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: workPin,
      pin: true,
      scrub: 1.1,
      start: "top top",
      end: () => "+=" + scrollAmount,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (workProgressBar) {
          workProgressBar.style.width = self.progress * 100 + "%";
        }
      }
    }
  });

  if (window.SiteRuntime && typeof window.SiteRuntime.refreshScroll === "function") {
    window.SiteRuntime.refreshScroll();
  }
}

let resizeTimer = null;

window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(initHorizontalWork, 150);
});

window.addEventListener("load", initHorizontalWork);
initHorizontalWork();
