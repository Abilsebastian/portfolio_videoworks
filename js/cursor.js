const dot = document.getElementById("cur");
const ring = document.getElementById("cur-r");
const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;

if (dot && ring && prefersFinePointer) {
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    window.requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll("[data-view-cursor]").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      dot.classList.add("view-mode");
    });

    element.addEventListener("mouseleave", () => {
      dot.classList.remove("view-mode");
    });

    element.addEventListener("focus", () => {
      dot.classList.add("view-mode");
    });

    element.addEventListener("blur", () => {
      dot.classList.remove("view-mode");
    });
  });
}
