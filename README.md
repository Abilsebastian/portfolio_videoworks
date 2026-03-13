# Abil Sebastian — Portfolio
**draftClub Studios** · Filmmaker & Content Creator · Riga, Latvia

---

## 📁 Project Structure

```
portfolio/
├── index.html              ← Main HTML (all sections)
│
├── css/
│   ├── reset.css           ← Base browser reset
│   ├── variables.css       ← Design tokens (colours, fonts, spacing)
│   ├── base.css            ← Body, grain overlay, cursor, footer
│   ├── nav.css             ← Navigation bar
│   ├── hero.css            ← Hero section + video player
│   ├── about.css           ← About / bio section
│   ├── work.css            ← Work grid + thumbnails
│   ├── services.css        ← Services list
│   ├── contact.css         ← Contact section + form
│   ├── modal.css           ← Video lightbox modal
│   ├── animations.css      ← Scroll reveal transitions
│   └── responsive.css      ← Mobile / tablet breakpoints
│
├── js/
│   ├── cursor.js           ← Custom cursor + ring
│   ├── nav.js              ← Scroll-aware nav
│   ├── reveal.js           ← IntersectionObserver reveals
│   ├── hero.js             ← Showreel video loader  ← UPDATE THIS
│   ├── work.js             ← Filter buttons + click handlers
│   ├── modal.js            ← Video lightbox open/close
│   └── contact.js          ← Form submission (Formspree)  ← UPDATE THIS
│
├── assets/
│   ├── images/
│   │   ├── abil.jpg        ← Your portrait (replace placeholder)
│   │   └── work/
│   │       ├── vapiano-ep01.jpg   ← Work thumbnail images
│   │       ├── brand-reel.jpg
│   │       └── ...
│   └── video/
│       └── showreel.mp4    ← Optional: self-hosted showreel
│
└── .vscode/
    ├── settings.json       ← Auto-format, Live Server config
    └── extensions.json     ← Recommended extensions
```

---

## 🚀 Getting Started

### 1. Open in VS Code
```bash
# In terminal, navigate to this folder then:
code .
```

### 2. Install recommended extensions
VS Code will prompt you — click **Install All**.  
The key one is **Live Server** (ritwickdey.LiveServer).

### 3. Launch with Live Server
Right-click `index.html` → **Open with Live Server**  
Or click **Go Live** in the bottom-right status bar.  
Opens at `http://127.0.0.1:5500`

---

## ✏️ Customisation Checklist

### Videos
| File | What to change |
|------|---------------|
| `js/hero.js` | Replace `YOUR_VIDEO_ID` in `SHOWREEL_URL` with your YouTube/Vimeo ID |
| `index.html` | Replace `data-video="..."` on each `.wi` work item with your embed URLs |

**YouTube embed format:**
```
https://www.youtube.com/embed/VIDEO_ID?autoplay=1
```
**Vimeo embed format:**
```
https://player.vimeo.com/video/VIDEO_ID?autoplay=1
```
**Vimeo background (hero loop):**
```
https://player.vimeo.com/video/VIDEO_ID?autoplay=1&loop=1&muted=1&background=1
```

### Your photo
Place your portrait in `assets/images/abil.jpg` and update `index.html`:
```html
<!-- Find the about-img div and replace the placeholder with: -->
<img src="assets/images/abil.jpg" alt="Abil Sebastian"/>
```

### Work thumbnail images
Place images in `assets/images/work/` and add to each work item:
```html
<img src="assets/images/work/your-image.jpg" alt="Project title" class="wi-img"/>
```

### Contact form
In `js/contact.js`, replace `YOUR_FORM_ID` with your Formspree ID:
```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```
Free setup at [formspree.io](https://formspree.io).

### Colours & fonts
All design tokens live in `css/variables.css`.  
Change `--amber` to shift the accent colour across the whole site.

### Work items
In `index.html`, find each `.wi` block and update:
- `data-cat` — `"restaurant"` | `"brand"` | `"film"`
- `data-video` — your embed URL
- `.wi-cat`, `.wi-title`, `.wi-client` — project metadata

---

## 🌐 Deployment (free)

### Netlify (recommended — drag & drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `portfolio/` folder onto the page
3. Done — live URL in seconds, custom domain available

### Vercel
```bash
npm i -g vercel
vercel
```

### GitHub Pages
1. Push to a GitHub repo
2. Settings → Pages → Deploy from branch `main` / `root`

---

## 📱 Browser Support
Chrome · Firefox · Safari · Edge — all modern browsers.  
The custom cursor is hidden on touch devices automatically.

---

*Built for Abil Sebastian / draftClub Studios — 2025*
