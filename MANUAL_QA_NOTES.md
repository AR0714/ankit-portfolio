# Manual QA notes — please verify after deploy

Two things could not be verified in the development browser pane used while building
the GridPulse / Transformer DGA case study. Both need one pass in a real browser on
the deployed site.

## 1. Lightbox closing (gallery)

Where: `/projects/transformer-dga` → **Gallery** (also every other project page and the
Research & Publications conference photo — same component pattern).

Why it is unverified: the dev browser pane renders zero animation frames, so
framer-motion exit animations never complete and the dialog never unmounts. Opening the
lightbox, the alt text, and Next/Previous cycling were all verified.

Check, after opening any gallery image:

- [ ] **Escape** closes the lightbox
- [ ] The **✕** button closes it
- [ ] Clicking the **dark backdrop** (outside the image) closes it
- [ ] Clicking the **image itself** does *not* close it
- [ ] After closing, the page scrolls normally again (no stuck `overflow: hidden`)
- [ ] Keyboard focus returns to the page behind, not lost

## 2. Live dashboard iframe

Where: `/projects/transformer-dga` → **Try the live dashboard** → *Launch live demo*.

Why it is unverified: the dev browser pane blocks external navigation, so the iframe
stayed on `about:blank`. The click-to-load markup, scenario buttons and the GIF
fallback were verified. `curl -I https://transformer-dga.netlify.app` returns 200 with
no `X-Frame-Options` and no `frame-ancestors`, so framing *should* be allowed — but it
was never seen actually rendering.

Check on desktop (≥ 768px wide):

- [ ] Clicking **Launch live demo** loads the dashboard inside the embed (not a blank
      or "refused to connect" frame)
- [ ] The scenario buttons (Normal / Thermal T3 / Arcing D2) reload the frame and the
      dashboard reflects the selected scenario
- [ ] **Open in new tab** opens the same scenario in a new tab
- [ ] On mobile (< 768px) no iframe appears — only the **Open live dashboard** button,
      and it works

If framing turns out to be blocked, the fix is to drop the iframe and keep the demo GIF
plus the "Open live dashboard" button on all widths; the GIF fallback is already there.
