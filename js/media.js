const MEDIA_LIBRARY = {
  heroShowreel: {
    title: "Hero Showreel",
    sources: {
      hero: {
        kind: "video",
        src: "assets/media/HEROREEL.mp4",
        width: 1920,
        height: 1080,
        syncVideoRatio: true,
        muted: true,
        loop: true,
        playsinline: true
      }
    },
    placeholder: {
      eyebrow: "Hero Video",
      title: "Showreel ready",
      detail: "assets/media/HEROREEL.mp4",
      background: "linear-gradient(160deg, #1a1508 0%, #0b0a08 40%, #0d1218 100%)"
    }
  },
  aboutPortrait: {
    title: "About Portrait",
    sources: {
      default: {
        kind: "image",
        src: "assets/images/ABPORTRAIT.jpg",
        alt: "Abil Sebastian portrait"
      }
    },
    placeholder: {
      eyebrow: "Portrait",
      title: "About portrait",
      detail: "assets/images/ABPORTRAIT.jpg",
      background: "linear-gradient(160deg, #191712 0%, #11100d 50%, #0b0a08 100%)"
    }
  },
  // Update work card titles, categories, and clients here.
  work01: {
    title: "Not My Section - EP 01",
    category: "Restaurant - Split-screen",
    client: "Vapiano Latvia",
    sources: {
      thumb: {
        kind: "video",
        src: "assets/media/works/ohhmybad.mp4",
        muted: true,
        loop: true,
        playsinline: true
      },
      modal: {
        kind: "video",
        src: "assets/media/works/ohhmybad.mp4",
        playsinline: true
      }
    },
    placeholder: {
      eyebrow: "Restaurant",
      title: "Not My Section - EP 01",
      detail: "assets/media/works/ohhmybad.mp4",
      background: "linear-gradient(170deg, #3d1a05 0%, #1a0d02 40%, #0b0a08 100%)"
    }
  },
  work02: {
    title: "Brand Identity Reel",
    category: "Brand - Identity",
    client: "Vapiano Latvia",
    sources: {
        default: {
            kind: "video",
            src: "assets/media/works/SUNDAYOPENING_FINAL.mp4",
            muted: true,
            loop: true,
            playsinline: true
        },
        modal: {
            kind: "video",
            src: "assets/media/works/SUNDAYOPENING_FINAL.mp4",
            playsinline: true
        }
    },
    placeholder: {
      eyebrow: "Brand",
      title: "Brand Identity Reel",
      detail: "assets/media/works/SUNDAYOPENING_FINAL.mp4",
      background: "linear-gradient(160deg, #0a1520 0%, #0d2035 50%, #080e18 100%)"
    }
  },
  work03: {
    title: "Coffee Story",
    category: "Storytelling - Short Film",
    client: "Vapiano Latvia",
    sources: {
        default: {
            kind: "video",
            src: "assets/media/works/coffestoryfinal_ENG.mp4",
            playsinline: true
        },
        modal: {
            kind: "video",
            src: "assets/media/works/coffestoryfinal_ENG.mp4",
            playsinline: true
        }
        
    },
    placeholder: {
      eyebrow: "Short Film",
      title: "Serenity.",
      detail: "Add a local media file in js/media.js",
      background: "linear-gradient(150deg, #1a1206 0%, #2d1e07 50%, #0e0b04 100%)"
    }
  },
  work04: {
    title: "Atmosphere Series",
    category: "Restaurant - Social",
    client: "Casa Nostra Riga",
    sources: {},
    placeholder: {
      eyebrow: "Restaurant",
      title: "Atmosphere Series",
      detail: "Add a local media file in js/media.js",
      background: "linear-gradient(155deg, #102018 0%, #0a1810 50%, #060e0a 100%)"
    }
  },
  work05: {
    title: "Product Launch Reel",
    category: "Brand - Product",
    client: "Riga Brand",
    sources: {},
    placeholder: {
      eyebrow: "Brand",
      title: "Product Launch Reel",
      detail: "Add a local media file in js/media.js",
      background: "linear-gradient(165deg, #1a1008 0%, #150c06 50%, #0c0804 100%)"
    }
  },
  work06: {
    title: "Roads & Horizons",
    category: "Cinematic - Travel",
    client: "Personal Work",
    sources: {},
    placeholder: {
      eyebrow: "Travel",
      title: "Roads & Horizons",
      detail: "Add a local media file in js/media.js",
      background: "linear-gradient(160deg, #0a0f1a 0%, #0e1524 50%, #08090e 100%)"
    }
  },
  work07: {
    title: "Behind the Section",
    category: "BTS - Social",
    client: "Vapiano Latvia",
    sources: {},
    placeholder: {
      eyebrow: "Behind The Scenes",
      title: "Behind the Section",
      detail: "Add a local media file in js/media.js",
      background: "linear-gradient(155deg, #1c1005 0%, #2a1808 50%, #100904 100%)"
    }
  }
};

function getMediaEntry(key) {
  return MEDIA_LIBRARY[key] || null;
}

function getMediaSource(key, variant = "default") {
  const entry = getMediaEntry(key);
  if (!entry || !entry.sources) {
    return null;
  }

  return (
    entry.sources[variant] ||
    entry.sources.default ||
    entry.sources.modal ||
    entry.sources.hero ||
    Object.values(entry.sources)[0] ||
    null
  );
}

function hasMediaSource(key, variant = "default") {
  const source = getMediaSource(key, variant);
  return Boolean(source && source.src);
}

function getProjectCopy(key) {
  const entry = getMediaEntry(key);

  if (!entry) {
    return null;
  }

  return {
    title: entry.title || "",
    category: entry.category || "",
    client: entry.client || "",
    ariaLabel: entry.ariaLabel || (entry.title ? `Open ${entry.title}` : "Open project")
  };
}

function createMediaNode(source, options = {}) {
  if (!source || !source.src) {
    return null;
  }

  if (source.kind === "image") {
    const image = document.createElement("img");
    image.src = source.src;
    image.alt = source.alt || "";
    image.loading = options.loading || "lazy";
    image.decoding = "async";
    image.className = "media-node media-node--image";
    return image;
  }

  if (source.kind === "embed") {
    const frame = document.createElement("iframe");
    frame.src = source.src;
    frame.allow = source.allow || "autoplay; fullscreen";
    frame.allowFullscreen = true;
    frame.setAttribute("frameborder", "0");
    frame.className = "media-node media-node--embed";
    return frame;
  }

  if (source.kind === "video") {
    const video = document.createElement("video");
    video.src = source.src;
    video.className = "media-node media-node--video";
    video.playsInline = options.playsinline ?? source.playsinline ?? true;
    video.loop = options.loop ?? source.loop ?? false;
    video.muted = options.muted ?? source.muted ?? false;
    video.controls = options.controls ?? source.controls ?? false;
    video.preload = options.preload || source.preload || "metadata";

    if (source.poster) {
      video.poster = source.poster;
    }

    if (options.autoplay ?? source.autoplay ?? false) {
      video.autoplay = true;
      video.muted = options.muted ?? source.muted ?? true;
    }

    return video;
  }

  return null;
}

function createPlaceholder(key, variant = "default") {
  const entry = getMediaEntry(key);
  const placeholder = entry && entry.placeholder ? entry.placeholder : {};
  const shell = document.createElement("div");
  const detailText = placeholder.detail || "Add a local file path in js/media.js";

  shell.className = "media-placeholder";
  shell.style.setProperty(
    "--media-placeholder-bg",
    placeholder.background || "linear-gradient(160deg, #181512 0%, #11100d 60%, #090807 100%)"
  );

  const eyebrow = document.createElement("span");
  eyebrow.className = "media-placeholder-eyebrow";
  eyebrow.textContent = placeholder.eyebrow || variant;

  const title = document.createElement("strong");
  title.className = "media-placeholder-title";
  title.textContent = placeholder.title || (entry ? entry.title : "Media placeholder");

  const detail = document.createElement("span");
  detail.className = "media-placeholder-detail";
  detail.textContent = detailText;

  shell.append(eyebrow, title, detail);
  return shell;
}

function toBooleanFlag(value) {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
}

function getSlotOptions(slot) {
  return {
    autoplay: toBooleanFlag(slot.dataset.mediaAutoplay),
    controls: toBooleanFlag(slot.dataset.mediaControls),
    loop: toBooleanFlag(slot.dataset.mediaLoop),
    muted: toBooleanFlag(slot.dataset.mediaMuted),
    playsinline: toBooleanFlag(slot.dataset.mediaPlaysinline),
    preload: slot.dataset.mediaPreload || undefined
  };
}

function applyMediaAspectRatio(slot, source, node) {
  if (!slot) {
    return;
  }

  if (source && source.width && source.height) {
    slot.style.setProperty("--media-aspect-ratio", `${source.width} / ${source.height}`);
    return;
  }

  if (!node) {
    return;
  }

  if (node instanceof HTMLVideoElement) {
    const syncVideoRatio = () => {
      if (!node.videoWidth || !node.videoHeight) {
        return;
      }

      slot.style.setProperty("--media-aspect-ratio", `${node.videoWidth} / ${node.videoHeight}`);
    };

    if (node.readyState >= 1) {
      syncVideoRatio();
    } else {
      node.addEventListener("loadedmetadata", syncVideoRatio, { once: true });
    }
  }
}

function showPlaceholder(slot, mediaKey, mediaVariant) {
  slot.replaceChildren(createPlaceholder(mediaKey, mediaVariant));
  slot.dataset.mediaState = "placeholder";
  return null;
}

function renderMediaSlot(slot, key, variant = "default", options = {}) {
  if (!slot) {
    return null;
  }

  const mediaKey = key || slot.dataset.mediaKey;
  const mediaVariant = variant || slot.dataset.mediaVariant || "default";
  const source = getMediaSource(mediaKey, mediaVariant);

  slot.replaceChildren();

  if (!source || !source.src) {
    return showPlaceholder(slot, mediaKey, mediaVariant);
  }

  const node = createMediaNode(source, { ...getSlotOptions(slot), ...options });

  if (!node) {
    return showPlaceholder(slot, mediaKey, mediaVariant);
  }

  applyMediaAspectRatio(slot, source, node);

  const fallback = () => {
    showPlaceholder(slot, mediaKey, mediaVariant);
  };

  node.addEventListener("error", fallback, { once: true });
  slot.appendChild(node);
  slot.dataset.mediaState = "ready";
  return node;
}

function renderAllMediaSlots() {
  document.querySelectorAll("[data-media-slot]").forEach((slot) => {
    if (slot.dataset.mediaLazy === "true") {
      return;
    }

    renderMediaSlot(slot, slot.dataset.mediaKey, slot.dataset.mediaVariant);
  });
}

window.MediaLibrary = {
  entries: MEDIA_LIBRARY,
  getEntry: getMediaEntry,
  getProjectCopy,
  getSource: getMediaSource,
  hasSource: hasMediaSource,
  createMediaNode,
  createPlaceholder,
  renderMediaSlot,
  renderAllMediaSlots
};

window.MediaLibrary.renderAllMediaSlots();
