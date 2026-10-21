#!/usr/bin/env python3
"""Draw the SteadyBooks share image from scratch.

Does not open or paint over any existing raster. Renders a 1200x630 PNG
with Pillow and writes the same bytes to both:

  client/public/og-image-v2.png
  client/public/og-image.png

Requires Pillow. Fonts live in scripts/fonts/ (SIL Open Font License).

Usage:
  python3 scripts/make-og-image.py
"""

from __future__ import annotations

import io
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path(__file__).resolve().parent / "fonts"
OUT_V2 = ROOT / "client" / "public" / "og-image-v2.png"
OUT_LEGACY = ROOT / "client" / "public" / "og-image.png"

W, H = 1200, 630
SCALE = 2

NAVY = (27, 42, 74)
WHITE = (255, 255, 255)
CREAM = (247, 244, 238)
ACCENT = (130, 160, 210)
TAGLINE_COLOR = (214, 222, 238)
SUBLINE_COLOR = (186, 198, 218)
STRIPE = (43, 62, 102)

WORDMARK = "SteadyBooks"
MARK = "SB"
TAGLINE = "100% remote, serving clients across the US"
SUBLINE = "QuickBooks Certified ProAdvisor · Bookkeeping for small businesses"

FORBIDDEN = ("Allen", "Texas", "accounting", "accountant", "CPA")


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / name), size)


def ink_bbox(text: str, face: ImageFont.FreeTypeFont) -> tuple[int, int, int, int]:
    layer = Image.new("L", (face.size * len(text) + 32, face.size * 3), 0)
    ImageDraw.Draw(layer).text((16, face.size), text, font=face, fill=255)
    box = layer.getbbox()
    if box is None:
        raise SystemExit(f"font produced no ink for {text!r}")
    return box


def render() -> Image.Image:
    for label in (WORDMARK, MARK, TAGLINE, SUBLINE):
        for word in FORBIDDEN:
            if word.lower() in label.lower():
                raise SystemExit(f"refusing to draw forbidden word {word!r}")
        if label == "TX" or " TX" in label or label.endswith("TX"):
            raise SystemExit("refusing to draw TX")

    sw, sh = W * SCALE, H * SCALE
    image = Image.new("RGB", (sw, sh), NAVY)
    draw = ImageDraw.Draw(image)

    word_font = font("PlayfairDisplay-Bold.ttf", 72 * SCALE)
    tag_font = font("DMSans-Medium.ttf", 32 * SCALE)
    sub_font = font("DMSans-Medium.ttf", 24 * SCALE)

    word_box = word_font.getbbox(WORDMARK)
    tag_box = tag_font.getbbox(TAGLINE)
    sub_box = sub_font.getbbox(SUBLINE)
    word_h = word_box[3] - word_box[1]
    tag_h = tag_box[3] - tag_box[1]
    sub_h = sub_box[3] - sub_box[1]

    left = 92 * SCALE
    logo = 128 * SCALE
    radius = 28 * SCALE
    stroke = 6 * SCALE
    gap = 36 * SCALE
    below = 44 * SCALE
    line_gap = 18 * SCALE

    block_h = logo + below + tag_h + line_gap + sub_h
    top = (sh - block_h) // 2
    logo_box = (left, top, left + logo, top + logo)

    # Stroke is centered on the path, so inset by half the width. The full
    # rounded rectangle, including both corners, stays inside logo_box.
    inset = stroke // 2
    stroke_box = (
        logo_box[0] + inset,
        logo_box[1] + inset,
        logo_box[2] - inset,
        logo_box[3] - inset,
    )
    draw.rounded_rectangle(stroke_box, radius=radius, outline=WHITE, width=stroke)

    mark_size = 58 * SCALE
    mark_font = font("PlayfairDisplay-Bold.ttf", mark_size)
    while True:
        mb = ink_bbox(MARK, mark_font)
        mw, mh = mb[2] - mb[0], mb[3] - mb[1]
        inner_pad = 22 * SCALE
        if mw <= logo - stroke * 2 - inner_pad * 2 and mh <= logo - stroke * 2 - inner_pad * 2:
            break
        mark_size -= SCALE
        if mark_size < 20 * SCALE:
            raise SystemExit("SB mark does not fit inside the logo box")
        mark_font = font("PlayfairDisplay-Bold.ttf", mark_size)

    # Center the ink, not the em box, so the letters sit in the middle.
    cx = (logo_box[0] + logo_box[2]) // 2
    cy = (logo_box[1] + logo_box[3]) // 2
    draw.text(
        (cx - (mb[0] + mb[2]) // 2 + 16, cy - (mb[1] + mb[3]) // 2 + mark_size),
        MARK,
        font=mark_font,
        fill=CREAM,
    )

    text_x = logo_box[2] + gap
    # Optically center the wordmark on the logo (Playfair sits a little high).
    word_y = top + (logo - word_h) // 2 - word_box[1] + 2 * SCALE
    draw.text((text_x, word_y), WORDMARK, font=word_font, fill=WHITE)

    underline_y = word_y + word_box[3] + 16 * SCALE
    underline_w = 156 * SCALE
    underline_h = 5 * SCALE
    if underline_y + underline_h > top + logo:
        underline_y = top + logo - underline_h - 8 * SCALE
    draw.rounded_rectangle(
        (text_x, underline_y, text_x + underline_w, underline_y + underline_h),
        radius=underline_h // 2,
        fill=ACCENT,
    )

    tag_y = top + logo + below - tag_box[1]
    sub_y = tag_y + tag_box[3] + line_gap
    draw.text((left, tag_y), TAGLINE, font=tag_font, fill=TAGLINE_COLOR)
    draw.text((left, sub_y), SUBLINE, font=sub_font, fill=SUBLINE_COLOR)

    sub_right = left + sub_box[2]
    stripe_start = max(sub_right + 36 * SCALE, int(sw * 0.78))
    draw_stripes(image, stripe_start)

    # Keep the logo stroke and SB ink fully inside the canvas.
    if logo_box[0] < 48 * SCALE or logo_box[1] < 48 * SCALE:
        raise SystemExit("logo is too close to the canvas edge")
    if top + block_h > sh - 48 * SCALE:
        raise SystemExit("text block is too close to the bottom edge")
    if sub_right > stripe_start - 24 * SCALE:
        raise SystemExit("subline collides with the diagonal lines")

    final = image.resize((W, H), Image.Resampling.LANCZOS)
    if final.size != (W, H):
        raise SystemExit(f"unexpected size {final.size}")
    return final


def draw_stripes(image: Image.Image, start_x: int) -> None:
    """Subtle diagonal lines, faded in from start_x and only on the right."""
    sw, sh = image.size
    lines = Image.new("RGB", image.size, NAVY)
    pen = ImageDraw.Draw(lines)
    spacing = 32 * SCALE
    for i in range(-4, 28):
        x0 = start_x - 80 * SCALE + i * spacing
        pen.line(
            [(x0, -40 * SCALE), (x0 + int(sh * 0.55), sh + 40 * SCALE)],
            fill=STRIPE,
            width=2 * SCALE,
        )

    mask = Image.new("L", image.size, 0)
    fade = 90 * SCALE
    pixels = mask.load()
    for y in range(sh):
        for x in range(max(0, start_x), sw):
            t = min(1.0, (x - start_x) / fade)
            pixels[x, y] = int(170 * t)
    image.paste(lines, (0, 0), mask)


def main() -> None:
    image = render()
    buffer = io.BytesIO()
    image.save(buffer, format="PNG", optimize=True)
    data = buffer.getvalue()
    OUT_V2.write_bytes(data)
    OUT_LEGACY.write_bytes(data)
    print(f"wrote {OUT_V2.relative_to(ROOT)} and {OUT_LEGACY.relative_to(ROOT)}")
    print(f"size {image.size[0]}x{image.size[1]} bytes {len(data)}")


if __name__ == "__main__":
    main()
