// media.js - central media registry, rendering helpers, and shared placeholders

const MEDIA_LIBRARY = {
  heroShowreel: {
    title: 'Hero Showreel',
    sources: {
      hero: {
        kind: 'video',
        src: 'assets/media/waitisover_reel2_60fps.mp4',
        poster: 'assets/images/hero/showreel-poster.jpg',
        muted: true,
        loop: true,
        playsinline: true
      }
    },
    placeholder: {
      eyebrow: 'Hero Video',
      title: 'Drop your showreel on disk',
      detail: 'assets/media/hero/showreel.mp4',
      background: 'linear-gradient(160deg, #1a1508 0%, #0b0a08 40%, #0d1218 100%)'
    }
  },
  aboutPortrait: {
    title: 'About Portrait',
    sources: {
      default: {
        kind: 'image',
        src: 'assets/images/ABPORTRAIT.jpg',
        alt: 'Abil Sebastian portrait'
      }
    },
    placeholder: {
      eyebrow: 'Portrait',
      title: 'Add your about photo',
      detail: 'assets/images/abil-portrait.jpg',
      background: 'linear-gradient(160deg, #191712 0%, #11100d 50%, #0b0a08 100%)'
    }
  },
  work01: {
    title: 'Not My Section - EP 01',
    sources: {
      thumb: {
        kind: 'image',
        src: 'assets/images/work/not-my-section-ep01.jpg',
        alt: 'Not My Section EP 01 thumbnail'
      },
      modal: {
        kind: 'video',
        src: 'assets/media/works/ohhmybad.mp4',
        poster: 'assets/images/work/not-my-section-ep01.jpg'
      }
    },
    placeholder: {
      eyebrow: 'Restaurant',
      title: 'Not My Section - EP 01',
      detail: 'assets/media/work/not-my-section-ep01.mp4',
      background: 'linear-gradient(170deg, #3d1a05 0%, #1a0d02 40%, #0b0a08 100%)'
    }
  },
  work02: {
    title: 'Brand Identity Reel',
    sources: {
      thumb: {
        kind: 'image',
        src: 'assets/images/work/brand-identity-reel.jpg',
        alt: 'Brand Identity Reel thumbnail'
      },
      modal: {
        kind: 'video',
        src: 'assets/media/work/brand-identity-reel.mp4',
        poster: 'assets/images/work/brand-identity-reel.jpg'
      }
    },
    placeholder: {
      eyebrow: 'Brand',
      title: 'Brand Identity Reel',
      detail: 'assets/media/work/brand-identity-reel.mp4',
      background: 'linear-gradient(160deg, #0a1520 0%, #0d2035 50%, #080e18 100%)'
    }
  },
  work03: {
    title: 'Serenity',
    sources: {
      thumb: {
        kind: 'image',
        src: 'assets/images/work/serenity.jpg',
        alt: 'Serenity short film thumbnail'
      },
      modal: {
        kind: 'video',
        src: 'assets/media/work/serenity.mp4',
        poster: 'assets/images/work/serenity.jpg'
      }
    },
    placeholder: {
      eyebrow: 'Film',
      title: 'Serenity',
      detail: 'assets/media/work/serenity.mp4',
      background: 'linear-gradient(150deg, #1a1206 0%, #2d1e07 50%, #0e0b04 100%)'
    }
  },
  work04: {
    title: 'Atmosphere Series',
    sources: {
      thumb: {
        kind: 'image',
        src: 'assets/images/work/atmosphere-series.jpg',
        alt: 'Atmosphere Series thumbnail'
      },
      modal: {
        kind: 'video',
        src: 'assets/media/work/atmosphere-series.mp4',
        poster: 'assets/images/work/atmosphere-series.jpg'
      }
    },
    placeholder: {
      eyebrow: 'Restaurant',
      title: 'Atmosphere Series',
      detail: 'assets/media/work/atmosphere-series.mp4',
      background: 'linear-gradient(155deg, #102018 0%, #0a1810 50%, #060e0a 100%)'
    }
  },
  work05: {
    title: 'Product Launch Reel',
    sources: {
      thumb: {
        kind: 'image',
        src: 'assets/images/work/product-launch-reel.jpg',
        alt: 'Product Launch Reel thumbnail'
      },
      modal: {
        kind: 'video',
        src: 'assets/media/work/product-launch-reel.mp4',
        poster: 'assets/images/work/product-launch-reel.jpg'
      }
    },
    placeholder: {
      eyebrow: 'Brand',
      title: 'Product Launch Reel',
      detail: 'assets/media/work/product-launch-reel.mp4',
      background: 'linear-gradient(165deg, #1a1008 0%, #150c06 50%, #0c0804 100%)'
    }
  },
  work06: {
    title: 'Roads & Horizons',
    sources: {
      thumb: {
        kind: 'image',
        src: 'assets/images/work/roads-and-horizons.jpg',
        alt: 'Roads and Horizons thumbnail'
      },
      modal: {
        kind: 'video',
        src: 'assets/media/work/roads-and-horizons.mp4',
        poster: 'assets/images/work/roads-and-horizons.jpg'
      }
    },
    placeholder: {
      eyebrow: 'Travel',
      title: 'Roads & Horizons',
      detail: 'assets/media/work/roads-and-horizons.mp4',
      background: 'linear-gradient(160deg, #0a0f1a 0%, #0e1524 50%, #08090e 100%)'
    }
  },
  work07: {
    title: 'Behind the Section',
    sources: {
      thumb: {
        kind: 'image',
        src: 'assets/images/work/behind-the-section.jpg',
        alt: 'Behind the Section thumbnail'
      },
      modal: {
        kind: 'video',
        src: 'assets/media/work/behind-the-section.mp4',
        poster: 'assets/images/work/behind-the-section.jpg'
      }
    },
    placeholder: {
      eyebrow: 'Behind The Scenes',
      title: 'Behind the Section',
      detail: 'assets/media/work/behind-the-section.mp4',
      background: 'linear-gradient(155deg, #1c1005 0%, #2a1808 50%, #100904 100%)'
    }
  }
};

function getMediaEntry(key) {
  return MEDIA_LIBRARY[key] || null;
}

function getMediaSource(key, variant = 'default') {
  const entry = getMediaEntry(key);
  if (!entry || !entry.sources) return null;

  return (
    entry.sources[variant] ||
    entry.sources.default ||
    entry.sources.modal ||
    entry.sources.hero ||
    Object.values(entry.sources)[0] ||
    null
  );
}

function hasMediaSource(key, variant = 'default') {
  const source = getMediaSource(key, variant);
  return Boolean(source && source.src);
}

function createMediaNode(source, options = {}) {
  if (!source || !source.src) return null;

  if (source.kind === 'image') {
    const image = document.createElement('img');
    image.src = source.src;
    image.alt = source.alt || '';
    image.loading = options.loading || 'lazy';
    image.decoding = 'async';
    image.className = 'media-node media-node--image';
    return image;
  }

  if (source.kind === 'embed') {
    const frame = document.createElement('iframe');
    frame.src = source.src;
    frame.allow = source.allow || 'autoplay; fullscreen';
    frame.allowFullscreen = true;
    frame.setAttribute('frameborder', '0');
    frame.className = 'media-node media-node--embed';
    return frame;
  }

  if (source.kind === 'video') {
    const video = document.createElement('video');
    video.src = source.src;
    video.className = 'media-node media-node--video';
    video.playsInline = options.playsinline ?? source.playsinline ?? true;
    video.loop = options.loop ?? source.loop ?? false;
    video.muted = options.muted ?? source.muted ?? false;
    video.controls = options.controls ?? source.controls ?? false;
    video.preload = options.preload || source.preload || 'metadata';

    if (source.poster) {
      video.poster = source.poster;
    }

    if (options.autoplay ?? source.autoplay ?? false) {
      video.autoplay = true;
      video.muted = true;
    }

    return video;
  }

  return null;
}

function createPlaceholder(key, variant = 'default') {
  const entry = getMediaEntry(key);
  const placeholder = entry && entry.placeholder ? entry.placeholder : {};
  const shell = document.createElement('div');

  shell.className = 'media-placeholder';
  shell.style.setProperty('--media-placeholder-bg', placeholder.background || 'linear-gradient(160deg, #181512 0%, #11100d 60%, #090807 100%)');

  const eyebrow = document.createElement('span');
  eyebrow.className = 'media-placeholder-eyebrow';
  eyebrow.textContent = placeholder.eyebrow || variant;

  const title = document.createElement('strong');
  title.className = 'media-placeholder-title';
  title.textContent = placeholder.title || (entry ? entry.title : 'Media placeholder');

  const detail = document.createElement('span');
  detail.className = 'media-placeholder-detail';
  detail.textContent = placeholder.detail || 'Add a local file path in js/media.js';

  shell.append(eyebrow, title, detail);
  return shell;
}

function renderMediaSlot(slot, key, variant = 'default', options = {}) {
  if (!slot) return null;

  const mediaKey = key || slot.dataset.mediaKey;
  const mediaVariant = variant || slot.dataset.mediaVariant || 'default';
  const source = getMediaSource(mediaKey, mediaVariant);

  slot.replaceChildren();

  if (!source || !source.src) {
    slot.appendChild(createPlaceholder(mediaKey, mediaVariant));
    slot.dataset.mediaState = 'placeholder';
    return null;
  }

  const node = createMediaNode(source, options);

  if (!node) {
    slot.appendChild(createPlaceholder(mediaKey, mediaVariant));
    slot.dataset.mediaState = 'placeholder';
    return null;
  }

  slot.appendChild(node);
  slot.dataset.mediaState = 'ready';
  return node;
}

function renderAllMediaSlots() {
  document.querySelectorAll('[data-media-slot]').forEach((slot) => {
    renderMediaSlot(slot, slot.dataset.mediaKey, slot.dataset.mediaVariant);
  });
}

window.MediaLibrary = {
  entries: MEDIA_LIBRARY,
  getEntry: getMediaEntry,
  getSource: getMediaSource,
  hasSource: hasMediaSource,
  createMediaNode,
  createPlaceholder,
  renderMediaSlot,
  renderAllMediaSlots
};

window.MediaLibrary.renderAllMediaSlots();
