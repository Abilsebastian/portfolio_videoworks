const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalMedia = document.getElementById("modalMedia");
let activeModalNode = null;

function stopSmoothScroll() {
  if (window.SiteRuntime && window.SiteRuntime.lenis) {
    window.SiteRuntime.lenis.stop();
  }
}

function startSmoothScroll() {
  if (window.SiteRuntime && window.SiteRuntime.lenis) {
    window.SiteRuntime.lenis.start();
  }
}

function clearModalMedia() {
  if (activeModalNode && typeof activeModalNode.pause === "function") {
    activeModalNode.pause();
  }

  activeModalNode = null;

  if (modalMedia) {
    modalMedia.replaceChildren();
  }
}

function openModalByKey(mediaKey) {
  if (!modal || !modalMedia || !window.MediaLibrary) {
    return;
  }

  clearModalMedia();

  const source =
    window.MediaLibrary.getSource(mediaKey, "modal") ||
    window.MediaLibrary.getSource(mediaKey, "thumb") ||
    window.MediaLibrary.getSource(mediaKey, "default");

  if (!source || !source.src) {
    modalMedia.appendChild(window.MediaLibrary.createPlaceholder(mediaKey, "modal"));
  } else {
    activeModalNode = window.MediaLibrary.createMediaNode(source, {
      autoplay: source.kind === "video",
      controls: source.kind === "video",
      loop: false,
      muted: false,
      playsinline: true,
      preload: "auto"
    });

    if (activeModalNode) {
      activeModalNode.addEventListener(
        "error",
        () => {
          clearModalMedia();
          modalMedia.appendChild(window.MediaLibrary.createPlaceholder(mediaKey, "modal"));
        },
        { once: true }
      );

      modalMedia.appendChild(activeModalNode);

      if (typeof activeModalNode.play === "function") {
        const attempt = activeModalNode.play();
        if (attempt && typeof attempt.catch === "function") {
          attempt.catch(() => {});
        }
      }
    }
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  stopSmoothScroll();
}

function closeModal() {
  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  clearModalMedia();
  startSmoothScroll();
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

window.Modal = {
  close: closeModal,
  openByKey: openModalByKey
};
