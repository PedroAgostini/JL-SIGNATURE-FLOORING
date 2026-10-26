---
name: JL Signature Flooring
description: Owner-led Kansas City flooring crew; one page laid like the logo's parquet in black lacquer, gold leaf and white oak.
colors:
  lacquer: "#0f0c09"
  lacquer-2: "#17120d"
  lacquer-3: "#221a12"
  seam: "#050403"
  gold: "#c9963a"
  gold-hi: "#f2e39a"
  gold-soft: "#d9b866"
  gold-deep: "#9a6e22"
  oak: "#dfcdac"
  oak-2: "#d2bd97"
  oak-3: "#c4ac82"
  ink: "#17120d"
  ink-2: "#5a4934"
  on-gold: "#150f08"
  bone: "#f4ede1"
  bone-2: "#c4b394"
  taupe: "#9d8d72"
  error: "#e0866a"
typography:
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(2.5rem, 1.4rem + 2.9vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(2.15rem, 1.35rem + 2.7vw, 3.9rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(1.35rem, 1.15rem + 0.6vw, 1.7rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.012em"
  lead:
    fontFamily: "Albert Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.08rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Albert Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"kern\", \"liga\""
  label:
    fontFamily: "Albert Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    letterSpacing: "0.16em"
  button:
    fontFamily: "Albert Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    letterSpacing: "0.06em"
  code:
    fontFamily: "Albert Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    letterSpacing: "0.08em"
    fontFeature: "\"tnum\""
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 4.2vw, 56px)"
  section: "clamp(80px, 10vw, 148px)"
  block-gap: "clamp(36px, 5vw, 64px)"
  header: "76px"
  seam-tight: "6px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-gold:
    textColor: "{colors.on-gold}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "15px 24px"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "15px 24px"
  button-line-hover:
    textColor: "{colors.gold-hi}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.oak}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "15px 24px"
  field-dark:
    backgroundColor: "{colors.lacquer}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    height: "52px"
    padding: "0 14px"
  service-chip:
    backgroundColor: "{colors.lacquer}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    height: "44px"
    padding: "0 12px"
  service-chip-selected:
    textColor: "{colors.on-gold}"
  photo-chip:
    backgroundColor: "rgba(10, 8, 6, 0.86)"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "7px 11px 7px 10px"
  service-tab:
    backgroundColor: "transparent"
    textColor: "{colors.bone-2}"
    rounded: "{rounded.none}"
    height: "64px"
    padding: "0 18px"
  service-tab-selected:
    textColor: "{colors.on-gold}"
  panel:
    backgroundColor: "{colors.lacquer-2}"
    rounded: "{rounded.none}"
    padding: "20px"
  quote-card:
    backgroundColor: "{colors.oak-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(28px, 3.4vw, 48px)"
  quote-card-main:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.oak}"
---

# Design System: JL Signature Flooring

## Overview

**Creative North Star: "Parquet Grid"**

The page is laid like the logo's parquet: a 45 degree plank grid of real floors, set in warm black lacquer and gold leaf, with white oak for the light passages. Photographs are planks; gold is the seam between them. The hero is a full-bleed photograph of a finished floor under a lacquer wash, with the estimate form set inside a fine gold line drawing of the logo diamond; the same diamond recurs everywhere small: chip markers, list bullets, map pins, process markers, the before/after knob, the process step markers.

Sections alternate between two grounds. Dark lacquer passages (hero, services, work, why, FAQ, estimate, footer) carry bone text and gold accents; white oak passages (about, compare, reviews, process) carry ink text over a real oak grain plate washed at 90% oak. A two-course gold plank strip with black seams (the threshold) marks the hand-off from hero to page. Every corner is square; depth comes from lacquer tone steps, gold hairlines and the photographs themselves, not from rounded cards.

Every service owns one sample code, No. 01 to No. 06, reused across the hero chips, the compare table, the footer list and the estimate form. The signature interaction is a scroll-driven Three.js build of a floor inside Why Choose Us: as the visitor scrolls, a section of floor is installed in five steps (subfloor prep, moisture check, underlayment, plank by plank, trim and finish), with the step list lit in gold beside it. Every frame is a pure function of scroll progress, so scrolling back rewinds it.

**Key Characteristics:**
- Square corners everywhere (0px), including third-party widgets.
- Gold leaf is a gradient (128deg, five stops), never a flat yellow, on every large gold fill.
- Black seams (2 to 6px) between photos and gold, as in real parquet.
- The diamond (45 degree square) is the only ornament.
- Sample codes No. 01 to No. 06 tie every service surface together.
- Photos carry one corner chip naming room and material.

## Colors

A strict three-material ink set: black lacquer, gold leaf, white oak, plus the wood in the photographs. No neutral greys; every neutral leans warm (hue about 67 to 83 in OKLCH).

### Primary
- **Gold Leaf** (gold, with the leaf gradient `linear-gradient(128deg, #e3c46b 0%, #c9963a 34%, #f3e9a0 58%, #d4ae57 78%, #b98a32 100%)`): primary buttons, selected tabs and chips, the diamond frame, the threshold strip, the portfolio seams, the "7+ Years" board, the before/after line and knob. Flat gold is for small marks only: chip diamonds, list bullets, sample-code text, pins, the nav underline, required asterisks.
- **Burnished Highlight** (gold-hi): focus outlines, hover text, active pins' numerals, the "After" tag.
- **Soft Gilt** (gold-soft): gold text on lacquer (highlighted headline words, header phone, small caps headings in the footer and quick estimate).
- **Old Gilt** (gold-deep): scrollbar thumb and dashed placeholder outlines; gold text on oak only when large.

### Neutral
- **Black Lacquer** (lacquer): page ground, form and field fills, drawer, mobile bar.
- **Lacquer Panel** (lacquer-2): raised panels: the hero estimate card, the process build stage, the why and estimate sections.
- **Lacquer Board** (lacquer-3): photo tile backing and the dark boards in the why grid.
- **Seam Black** (seam): the black joints between planks.
- **White Oak** (oak), **Oak Grain** (oak-2), **Oak Shade** (oak-3): light passages, review cards, photo backing on oak.
- **Ink** (ink) and **Walnut Ink** (ink-2): text and rules on oak; ink also fills the main review card and the ink button.
- **On-Gold Ink** (on-gold): every label or numeral sitting on gold leaf.
- **Bone** (bone) and **Bone Muted** (bone-2): primary and secondary text on lacquer.
- **Taupe** (taupe): placeholders, optional-field hints, fine print and footer base.
- **Ember** (error): field error borders and messages; the only off-palette hue, warm by design.

### Named Rules
**The Leaf Not Paint Rule.** Any gold surface larger than a mark is the leaf gradient. Flat `gold` is reserved for marks under about 16px and for text.

**The No Grey Rule.** Every neutral is lacquer, oak, bone or taupe. Gold hairlines are `rgba(201, 150, 58, a)` at 0.14 (inner dividers), 0.25 (container rules) and 0.35 (field and container edges); hover lifts them to `rgba(217, 184, 102, 0.7 to 0.8)`.

## Typography

**Display Font:** Gloock (with Georgia, serif)
**Body Font:** Albert Sans (with Segoe UI, system-ui, sans-serif)
**Label Font:** Albert Sans, uppercase, wide tracked

**Character:** A high-contrast single-weight serif with the confidence of the logo's serif JL monogram, over a clean geometric sans that echoes the logo's tracked "FLOORING". Gloock is never bolded; Albert Sans does all the weight work at 600.

### Hierarchy
- **Display** (Gloock 400, clamp(2.6rem, 1.3rem + 3vw, 4.4rem) on desktop, 2.2 to 2.7rem under 560px, 1.02): the hero headline only, with key service words in soft gilt.
- **Headline** (Gloock 400, clamp(2.15rem, 1.35rem + 2.7vw, 3.9rem), 1.04): section titles, balanced, about 14 to 15ch.
- **Title** (Gloock 400, clamp(1.35rem, 1.15rem + 0.6vw, 1.7rem), 1.15): card, step and compare titles. Gloock also sets FAQ questions, review quotes, board figures and the mobile drawer links.
- **Lead** (Albert Sans 400, clamp(1.08rem, 1rem + 0.3vw, 1.25rem)): section intros in bone-2 or walnut ink, max 56ch.
- **Body** (Albert Sans 400, 1.0625rem, 1.6): running text, 42 to 62ch.
- **Label** (Albert Sans 600, 0.72 to 0.82rem, 0.14 to 0.2em, uppercase): nav, photo chips, form labels, compare row heads, footer headings.
- **Button** (Albert Sans 600, 0.95rem, 0.06em, uppercase).
- **Code** (Albert Sans 600, tabular numerals, 0.08em): sample codes "No. 03" / "03" in gold.

### Named Rules
**The One Code Rule.** A service is always introduced with its sample code in tabular gold numerals before its name, and the code is the same on every surface.

**The Serif Never Bolds Rule.** Gloock stays at 400. Emphasis in display text is color (soft gilt), not weight.

## Layout

A centered wrap of `min(1280px, 100% - 2 * gutter)` with a fluid gutter and fluid section padding. Section heads are split: headline left, a short bone-2 note right, aligned to the baseline (`justify-content: space-between; align-items: end`). Two-column feature grids use unequal fractions (1 : 1.1, 0.8 : 1.4, 1.1 : 0.9) with clamp gaps of 40 to 120px.

The hero is a two-column grid over a full-bleed photo: copy left (1.08fr, max 640px), the estimate form card right (0.92fr, max 500px) on a 96% lacquer panel with a leaf top edge, framed by a 45 degree gold line diamond. Under 920px it stacks, copy first. The portfolio is a six-column parquet of photo tiles of different spans on a gold leaf bed with 6px seams. The why section pairs the copy with four differentiator planks (diamond marker, Gloock title, one line) on a gold leaf bed with 6px seams, then a sticky scroll stage for the 3D process build: step list left (0.78fr), WebGL stage right (1.42fr), a 3px leaf progress bar along its base.

Breakpoints: 1180px (nav tightens, footer to two columns), 920px (drawer navigation, single-column grids, diamond moves above the copy at 66vw and overlaps it, tabs become a horizontal scroller, fixed mobile call/text/estimate bar appears), 700px (compare table restacks into three columns per row), 560px (single-column forms and footer, full-width buttons).

## Elevation & Depth

Mostly flat and tonal. Depth comes from three lacquer steps (lacquer, lacquer-2, lacquer-3), gold hairlines drawn as inset 1px box-shadows, and the photographs. Soft, downward, blurred shadows appear only under gold objects that sit on something and under the differentiator bed. The hero adds depth with motion: the background photo drifts slower than the page on scroll.

### Shadow Vocabulary
- **Leaf rest** (`box-shadow: 0 10px 22px -12px rgba(0, 0, 0, 0.55)`): gold buttons at rest.
- **Leaf lift** (`box-shadow: 0 16px 26px -12px rgba(0, 0, 0, 0.6)`): gold buttons on hover.
- **Plank bed** (`box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.8)`): the why differentiators.
- **Marker drop** (`box-shadow: 0 6px 14px -6px rgba(0, 0, 0, 0.7)` / `0 8px 20px -6px rgba(0, 0, 0, 0.6)`): the before/after knob.
- **Gold hairline** (`box-shadow: inset 0 0 0 1px rgba(201, 150, 58, 0.25 to 0.35)`): panels, forms, the room shell, the line button.

### Named Rules
**The Lacquer Step Rule.** Raise a surface by stepping lacquer to lacquer-2 or lacquer-3 and adding a gold hairline, not by adding a shadow.

## Shapes

Square corners throughout (0px), forced onto Leaflet tooltips and controls too. The one silhouette is the diamond: the 45 degree square of the logo, used at every scale from the 6px list bullet to the hero line diamond behind the form. Secondary cuts follow plank geometry: the about photo's gold leaf corner triangle (30% of the width), and the compare swatches' clipped bottom-left corner. Seams are solid black bands, never hairline grey.

## Components

### Buttons
Tactile, lettered like a sign, never rounded.
- **Shape:** square (0px), padding 15px 24px, 12px 18px in the header.
- **Gold (primary):** leaf gradient at 220% width, on-gold ink label with an arrow icon. Hover slides the gradient to 100% (0.7s) like light crossing gold leaf, lifts 2px and deepens the shadow.
- **Line:** transparent with a gold hairline (0.55 alpha), bone label; hover turns hairline and text to gold-hi and lifts 2px.
- **Ink:** for oak passages: ink fill, oak label; hover to #2a2017 and lift 2px.
- **Focus:** 2px gold-hi outline, 3px offset (global).

### Chips
- **Photo chip:** one per photo, bottom-left 12px, 86% black plate, uppercase tracked label "Room · Material" led by a 7px gold diamond. While photos are provisional a gold-hi "Sample" prefix shows.
- **Service card:** photo (4:3) over a lacquer-2 body with a Gloock title, one line of copy, a "Best for" line and a gold uppercase "Get a free quote" link that prefills the estimate form; six cards laid in a gold leaf bed with 6px seams (3 columns, 2 under 1100px, a swipe carousel at 82% card width under 640px).
- **Service chip (quick estimate):** radio chip in a 3 by 2 grid, 44px tall (40px in the hero on desktop), lacquer with a 0.35 gold hairline, gold code numeral before the name; selected turns to leaf with on-gold text.

### Cards / Containers
- **Corner Style:** square.
- **Panels:** lacquer-2 with a gold hairline, 18 to 44px internal padding.
- **Boards:** leaf or lacquer-3 planks inside a seam-black bed, Gloock figure over a short note, laid in from their sides on reveal.
- **Quote cards:** oak-2 side cards and one ink main card with a large gold Gloock quote mark. Placeholders carry a dashed gold outline inset 10px.

### Inputs / Fields
- **Style:** 52px tall, lacquer fill, 1px gold border at 0.35, square, bone text, taupe placeholder, gold caret.
- **Focus:** border and 1px ring in gold-hi, no glow.
- **Error:** ember border plus ember message beneath.
- **Segmented choice:** three equal 48px cells with gold hairlines; selected fills with leaf.

### Navigation
Fixed 76px header (64px under 920px), transparent over the hero, turning 97% lacquer with a gold hairline under it once scrolled. Links are uppercase labels at 0.82rem / 0.16em; a 1px gold underline wipes in from the left on hover and for the current section. The phone number sits in soft gilt. Under 920px a full-screen lacquer drawer drops in with Gloock links at 2.1rem, and a fixed bottom bar offers Call, Text and the gold estimate button.

### Process Build (signature)
A sticky stage that holds for about four and a half viewport heights of scroll. Left, five numbered steps with diamond markers; the active step fills with leaf and opens its line of copy, finished steps keep a faint gold fill. Right, a WebGL floor section on a lacquer plinth with a gold edge is installed as the visitor scrolls: a gold straightedge passes and low spots fill, a moisture meter lands and its reading (a lacquer chip with a gold numeral) counts up, underlayment unrolls, planks drop in row by row with staggered joints, baseboards settle and a warm light sweeps the new finish. Under 920px the stage sits on top and only the active step shows. With reduced motion it renders finished and static; without WebGL a still photo stands in.

### Before / After
A 16:10 frame with a 3px leaf divider and a leaf diamond knob carrying an on-gold arrows icon; corner tags in the photo-chip style, "After" in gold-hi.

### Threshold
A 20px band of two staggered courses of gold leaf planks (176px long, 2px seams, offset half a plank) between seam-black borders, marking the edge of the hero.

## Do's and Don'ts

### Do:
- **Do** use the leaf gradient for every gold fill larger than a mark, and on-gold ink (#150f08) for anything sitting on it.
- **Do** keep every corner square (0px), including embedded widgets.
- **Do** separate photos from gold with solid seams (6px in the portfolio, 8px in the board bed).
- **Do** label every photo with one bottom-left chip: room and material, led by a gold diamond.
- **Do** introduce each service with its sample code (No. 01 LVP, 02 Laminate, 03 Hardwood, 04 Refinishing, 05 Stairs, 06 Trim) in tabular gold.
- **Do** alternate lacquer and white oak passages; on oak, switch text to ink and walnut ink and the button to ink.
- **Do** ease everything with `cubic-bezier(0.16, 1, 0.3, 1)` and gate entrances and plank drift behind `prefers-reduced-motion: no-preference`.

### Don't:
- **Don't** introduce cool or neutral greys; every neutral is warm lacquer, oak, bone or taupe.
- **Don't** use green anywhere (brand commitment).
- **Don't** fill large surfaces with flat yellow gold.
- **Don't** round corners or add pill shapes.
- **Don't** bold Gloock; emphasis in display type is soft gilt.
- **Don't** use shadows to separate panels; step the lacquer and add a gold hairline.
