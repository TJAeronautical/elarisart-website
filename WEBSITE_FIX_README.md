# Elaris website — homepage hero fix

## What was wrong

* `assets/elaris-home-art.jpg` on `main` is a 400 x 533 px truncated JPEG (7.5 KB), so the
  homepage hero shows a blurry, cut-off image.
* `styles.css` still carried ~26 KB of dead, truncated base64 image rules from the earlier
  attempts (the reason the hero used to render blank).

## What this changes (10 files)

| File | Change |
|---|---|
| `assets/elaris-home-art.jpg` | Replaced with the full 1200 x 1600 black & white artwork (475 KB, progressive JPEG) |
| `styles.css` | Removes the dead base64 rules; hero image cropped like the reference on phones (`height: min(110vw, 72svh)`), kept inside the viewport on desktop (`min(82vh, 60vw)`); mobile menu texture now uses the real file; header wordmark never wraps |
| `index.html` + 7 other pages | Only the `?v=` cache-busting keys (`styles.css?v=20260919-1715`) |

## Apply it — pick ONE

### A. GitHub Desktop / File Explorer (no terminal)

1. Unzip `elarisart-website-hero-fix-files.zip` **over** your local `elarisart-website` folder
   (say Yes to replace — it is the same 10 paths).
2. In GitHub Desktop: commit "Homepage hero: full-resolution artwork" → **Push origin**.

### B. Git command line (from inside your local clone)

```bash
git checkout main
git pull
git am "C:\Users\tjaer\Downloads\elarisart-hero-fix.patch"
git push
```

### C. Not cloned yet

```bash
cd %USERPROFILE%\Downloads
git clone https://github.com/TJAeronautical/elarisart-website
cd elarisart-website
git am ..\elarisart-hero-fix.patch
git push
```

Cloudflare picks up the push and redeploys. Hard-refresh the phone (or open in a private tab)
to see the new hero — the `?v=` keys force the new CSS and image.

## Verify

1. Open the homepage on a phone: navy header → sharp full-width artwork → grey
   "MALDIVIAN CONTEMPORARY ARTIST" band → paragraph.
2. Open on desktop: the artwork fills the width but stays inside one screen height.
3. `curl -sI https://elarisartstudio.com/assets/elaris-home-art.jpg | findstr Length`
   should show ~486000 bytes (not 7500).
