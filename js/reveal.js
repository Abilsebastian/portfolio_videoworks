const revealElements = document.querySelectorAll("[data-r]");

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = (index % 5) * 0.09 + "s";
    observer.observe(element);
  });
}

const statElements = document.querySelectorAll(".stat-n[data-count]");

if (statElements.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target;
        const target = Number.parseInt(element.dataset.count || "0", 10);
        const suffix = element.dataset.suffix || "";
        const duration = 1200;
        const steps = 40;
        const increment = target / steps;
        const interval = duration / steps;
        let current = 0;

        element.textContent = "0" + suffix;

        const timer = window.setInterval(() => {
          current = Math.min(current + increment, target);
          element.textContent = Math.floor(current) + suffix;

          if (current >= target) {
            window.clearInterval(timer);
          }
        }, interval);

        counterObserver.unobserve(element);
      });
    },
    { threshold: 0.6 }
  );

  statElements.forEach((element) => {
    counterObserver.observe(element);
  });
}

if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.32;
      const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.32;
      button.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}
