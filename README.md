# Beyond Beautiful Interfaces

**UI/UX, AI and the future of digital product design.**
A 30-minute interactive guest lecture by Sanisha Maharjan for Reliance International Academy, Nepal.

It's a static HTML/CSS/JavaScript site with no build step, no backend and no dependencies. Fonts are bundled locally, so it works without internet once loaded.

## Run it locally

The presenter window needs the page served over `http://`. Opening the file directly (`file://`) blocks the sync between windows.

```bash
cd beyond-beautiful-interfaces
python3 -m http.server 8000
# open http://localhost:8000
```

Any static server works. If you use VS Code, the Live Server extension is fine too.

## Presenting

| Key | Action |
|---|---|
| `→` `Space` `PgDn` `Enter` | Next reveal / next slide (works with USB clickers) |
| `←` `PgUp` | Previous |
| `Home` / `End` | First / last slide |
| `1`–`9` | Jump to a slide |
| `F` | Full screen |
| `N` | Notes panel on the same screen (for rehearsing) |
| `P` | Open the **presenter window** |
| `T` | Start/pause the 45-second activity timer (slide 4) |
| `B` | Switch the food-app example between *Pretty* and *Clear* (slide 3) |
| `?` | Shortcut help |

Move the mouse to show the controls (bottom right). They fade when you stop moving.

**Recommended setup with a projector:**

1. Set the display to **Extend**, not Mirror.
2. Open the deck, press `P`, and allow pop-ups if asked.
3. Drag the slides window to the projector and press `F`. Keep the presenter window on your laptop.
4. In the presenter window, press **Start timer** when you begin.

The presenter window shows the current slide, what comes next, your notes, elapsed time, time on this slide, and a pace indicator (*On track*, *Behind*, *Over time*) based on each slide's target minutes. You can control the deck from either window.

**Deep links:** `#5` opens slide 5, and `#5.2` opens slide 5 at reveal 2.

## Project structure

```
index.html            The slides (9 sections)
presenter.html        Presenter view: notes, timer, next-slide preview
css/deck.css          All styles (stage is designed at 1600×900, scaled to fit)
js/deck.js            Navigation, reveals, interactions, sync
js/notes.js           Speaker notes and target minutes per slide (edit here)
assets/fonts/         Instrument Serif, Inter Tight, JetBrains Mono (SIL OFL)
assets/screenshots/   Put figma.png, lovable.png, base44.png here (see below)
docs/                 Presenter notes, rehearsal guide, prep checklist
.nojekyll             Tells GitHub Pages to serve files as-is
```

### Adding real product screenshots (slide 7)

Slide 7 currently shows simple neutral wireframe placeholders. To use real screenshots, save them as:

- `assets/screenshots/figma.png`
- `assets/screenshots/lovable.png`
- `assets/screenshots/base44.png`

They're cropped to a wide strip from the top-left, so a 1600×900 capture of the main editor works best. Take them yourself from your own accounts the week of the lecture, so they show the current interface. If a file is missing, the placeholder appears automatically.

## Deploying to GitHub Pages

**Proposed repository:** `maharjansanisha/beyond-beautiful-interfaces` (public)
**Resulting URL:** `https://maharjansanisha.github.io/beyond-beautiful-interfaces/`

All asset paths are relative, so they work under that sub-path without changes.

### Option A — GitHub CLI

```bash
cd beyond-beautiful-interfaces
gh auth login                       # if not already signed in
git init -b main
git add .
git commit -m "Beyond Beautiful Interfaces: guest lecture deck"
gh repo create beyond-beautiful-interfaces --public --source=. --push
gh api -X POST repos/maharjansanisha/beyond-beautiful-interfaces/pages \
  -f "source[branch]=main" -f "source[path]=/"
```

The site is usually live within one or two minutes. Check progress under **Settings → Pages** or the **Actions** tab.

### Option B — github.com in the browser

1. Go to <https://github.com/new>, name it `beyond-beautiful-interfaces`, make it **Public**, and don't add a README.
2. Choose **uploading an existing file**, then drag in everything inside the project folder, including the `assets`, `css`, `js` and `docs` folders and the `.nojekyll` file. Commit.
3. Go to **Settings → Pages → Build and deployment**, set Source to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. Wait a minute, then open the URL shown at the top of the Pages settings.

> Note: GitHub Pages on a free account needs a **public** repo. The presenter notes are in `js/notes.js`, so anyone with the link could read them. That's normal for a talk, but keep it in mind.

## Accuracy notes

Tool descriptions on slide 7 were checked against official sources in November 2026:

- Figma Help Center: Figma Make (prompt-to-app, publishing, backend support), First Draft, and the Figma agent.
- Lovable docs: full-stack generation, built-in backend (Lovable Cloud) or Supabase, Git sync.
- Base44 docs and site: natural-language, no-code app builder that generates the interface and backend, with GitHub sync.

These products change often. Re-check them the week of the lecture (see `docs/PREP-CHECKLIST.md`).
