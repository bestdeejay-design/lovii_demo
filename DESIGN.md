# LOVII Design System

## App Header (`#app-header`)

| Property | Value |
|---|---|
| Height | `44px` |
| Padding | `8px` (all sides, box-sizing border-box) |
| Layout | Flex, `align-items: center`, `justify-content: space-between` |
| Background | `var(--bg)` → `#ffffff` |

### Logo (`#app-logo`)

| Property | Value |
|---|---|
| Height | `28px` |
| Position | Left side |
| Padding from edge | `8px` (via header padding) |
| File | `assets/lovii-logo-light.svg` |

### Avatar / Profile Icon (`.avatar-icon`)

| Property | Value |
|---|---|
| Size | `28×28px` |
| Border radius | `8px` |
| Implementation | Inline SVG (not an image file) |
| Background | `var(--pink)` → `#f64a8a` |
| Icon content | White person silhouette (head + body) with checkmark |
| Position | Right side |
| Padding from edge | `8px` (via header padding) |
| Wrapper | `.avatar-wrap` — `position: relative` |

### Notification Dot (`.notif-dot`)

| Property | Value |
|---|---|
| Position | Absolute on `.avatar-wrap`: `top: -2px; right: -2px` |
| Size | `10×10px` |
| Color | `var(--pink)` → `#f64a8a` |
| Border | `2px solid var(--bg)` (prevents bleed into icon) |
| Shape | Circle (`border-radius: 50%`) |

### Rules
- No bell icon — only logo (left) + profile avatar (right)
- Logo and avatar must be the same height/size (`28px`)
- Equal spacing: `8px` from all edges
- Notification dot on avatar only, not on a separate bell

---

# Top Card (Location + Promo)

```
┌─ top-card ────────────────────────────────────┐
│  📍 Москва                      Сменить       │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
│  [Акция]                                       │
│  −20% на выпечку                     🕐 4 ч   │
│  В Пекарне #23 до конца дня                    │
│  Подробнее ›                                    │
└────────────────────────────────────────────────┘
```

## Container (`.top-card`)

| Property | Value |
|---|---|
| Background | `#fff` (white) |
| Border | `1px solid var(--border)` |
| Border radius | `14px` |
| Shadow | `0 2px 12px rgba(0,0,0,0.04)` |
| Margin | `8px 16px` |
| Overflow | `hidden` |

## Location Row (`.top-card-loc`)

| Property | Value |
|---|---|
| Layout | Flex, `align-items: center`, `gap: 4px` |
| Padding | `10px 14px 0` |
| Font size | `11px` |
| Color | `var(--text-dim)` |
| City name | `<span>` — `font-weight: 600`, `color: var(--text-primary)` |
| Сменить link | `.top-card-change` — `margin-left: auto`, `color: var(--pink)`, `font-weight: 500`, `cursor: pointer` |

## Divider (`.top-card-divider`)

| Property | Value |
|---|---|
| Margin | `8px 14px 0` |
| Height | `1px` |
| Background | `var(--border)` |

## Body (`.top-card-body`)

| Property | Value |
|---|---|
| Layout | Flex, `justify-content: space-between`, `align-items: flex-start` |
| Padding | `12px 14px 8px` |

### Badge (`.top-card-badge`)

| Property | Value |
|---|---|
| Background | `var(--pink-light)` |
| Text color | `var(--pink)` |
| Font size | `8px` |
| Font weight | `700` |
| Border radius | `100px` |
| Text transform | `uppercase`, `letter-spacing: 0.3px` |

### Title (`.top-card-title`)

| Property | Value |
|---|---|
| Font size | `15px` |
| Font weight | `700` |
| Color | `var(--text-primary)` |
| Margin bottom | `2px` |

### Subtitle (`.top-card-sub`)

| Property | Value |
|---|---|
| Font size | `10px` |
| Color | `var(--text-secondary)` |

### Timer (`.top-card-timer`)

| Property | Value |
|---|---|
| Display | Flex, `align-items: center`, `gap: 4px` |
| Padding | `5px 10px` |
| Background | `var(--pink-light)` |
| Border radius | `100px` |
| Font size | `9px` |
| Font weight | `600` |
| Color | `var(--pink)` |

## Action Row (`.top-card-action`)

| Property | Value |
|---|---|
| Padding | `4px 14px 12px` |

### Link (`.top-card-link`)

| Property | Value |
|---|---|
| Display | Inline flex, `align-items: center`, `gap: 2px` |
| Font size | `10px` |
| Font weight | `600` |
| Color | `var(--tiffany)` → `#0ABAB5` |
| Cursor | `pointer` |

---

# Grid Menu Cards

## Card (`.grid-item`)

| Property | Value |
|---|---|
| Background | `#fff` (white) |
| Border | `1px solid var(--border)` → `#ddd` on hover |
| Border radius | `14px` |
| Padding | `16px 6px` |
| Shadow (default) | none |
| Shadow (hover) | `0 4px 12px rgba(0,0,0,0.06)` |
| Hover lift | `translateY(-1px)` |
| Transition | `all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` |

## Icon Container (`.grid-item .iw`)

| Property | Value |
|---|---|
| Size | `40×40px` |
| Border radius | `12px` |
| Icon size | `22×22px` (white SVG) |
| Icon color | `#fff` |

### Accent Colors

| Class | Background | Glow Shadow |
|---|---|---|
| `.iw.pink` | `var(--pink)` → `#f64a8a` | `0 4px 10px rgba(246,74,138,0.2)` |
| `.iw.tiffany` | `var(--tiffany)` → `#0ABAB5` | `0 4px 10px rgba(10,186,181,0.2)` |
| `.iw.chiffon` | `#D4A854` (gold) | `0 4px 10px rgba(212,168,84,0.25)` |

## Label (`.grid-item`)

| Property | Value |
|---|---|
| Font size | `10px` |
| Font weight | `600` (semibold) |
| Color | `var(--text-secondary)` → `#888888` |
| Text align | `center` |
| Gap above icon | `5px` |

## Badge (`.grid-item .badge`)

| Property | Value |
|---|---|
| Position | Absolute, `top: 6px; right: 6px` |
| Background | `var(--pink)` → `#f64a8a` |
| Text | White, `9px`, `font-weight: 700` |
| Shape | Pill (`border-radius: 100px`) |

## Layout (`.grid-menu`)

| Property | Value |
|---|---|
| Columns | `repeat(4, 1fr)` |
| Gap | `8px` |
| Padding | `8px 16px` |

## Color Mapping (8 items)

| Item | Accent |
|---|---|
| Каталог | Pink |
| Заказы | Tiffany |
| Бонусы | Pink |
| Отчёты | Tiffany |
| Команда | Tiffany |
| Города | Pink |
| Акции | Chiffon/Gold |
| Настройки | Chiffon/Gold |

---

# Active Orders Block

```
section-label "Активные заказы"
┌─ orders-card (shadow card) ───────────────────┐
│  [icon]  Store Name              540₽  [tag]  │
│         #2384 · 15 мин                        │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
│  [icon]  Store Name             1 280₽  [tag] │
│         #4512 · курьер на месте               │
└───────────────────────────────────────────────┘
```

## Container (`.orders-card`)

| Property | Value |
|---|---|
| Background | `#fff` (white) |
| Border radius | `14px` |
| Shadow | `0 2px 12px rgba(0,0,0,0.06)` |
| Margin | `0 16px` (aligns with `section-label` padding and `balance-card` margin) |
| Padding | `4px 14px` |

## Order Row (`.order-row`)

| Property | Value |
|---|---|
| Padding | `13px 0` |
| Layout | Flex, `align-items: center`, `justify-content: space-between` |
| Divider | `border-top: 1px solid #f0f0f0` (between rows) |

### Left Section
| Property | Value |
|---|---|
| Layout | Flex, `align-items: center`, `gap: 8px`, `flex: 1` |

### Icon Box

| Property | Value |
|---|---|
| Size | `32×32px` |
| Border radius | `10px` |
| Display | Flex, centered |
| Background | Solid accent color (`var(--pink)` / `var(--tiffany)`) |
| Shadow | Glow: `0 3px 8px rgba(accent, 0.2)` |
| Emoji | `<span class="or-emoji">` — plain text, `font-size: 15px` |

### Name (`.or-name`)

| Property | Value |
|---|---|
| Font size | `13px` |
| Font weight | `600` (semibold) |
| Color | `var(--text-primary)` |
| Overflow | `ellipsis`, `white-space: nowrap` |

### Meta (`.or-meta`)

| Property | Value |
|---|---|
| Font size | `9px` |
| Color | `var(--text-secondary)` |
| Margin top | `1px` |

### Right Section

| Property | Value |
|---|---|
| Layout | Flex, `align-items: center`, `gap: 6px`, `flex-shrink: 0` |

### Price (`.or-price`)

| Property | Value |
|---|---|
| Font size | `13px` |
| Font weight | `700` (bold) |
| Color | `var(--text-primary)` |

### Tag (`.tag`)

| Property | Value |
|---|---|
| Padding | `2px 8px` |
| Border radius | `100px` |
| Font size | `9px` |
| Font weight | `600` |

| Class | Background | Text Color |
|---|---|---|
| `.tag-pink` | `var(--pink-light)` | `var(--pink)` |
| `.tag-tiffany` | `var(--tiffany-light)` | `var(--tiffany)` |

---

# Balance Card

```
┌─ balance-card (shadow card) ──────────────────┐
│  БОНУСНЫЙ БАЛАНС                              │
│  4 500 баллов                    Как получить? │
│  до статуса Digital Representative            │
└───────────────────────────────────────────────┘
```

## Container (`.balance-card`)

| Property | Value |
|---|---|
| Background | `#fff` (white) |
| Border radius | `14px` |
| Shadow | `0 2px 12px rgba(0,0,0,0.06)` |
| Padding | `14px 16px` |
| Margin | `10px 16px 0` |
| Layout | Flex, `justify-content: space-between`, `align-items: center` |

### Balance Label (`.balance-label`)

| Property | Value |
|---|---|
| Content | `Бонусный баланс` |
| Font size | `10px` |
| Color | `var(--text-dim)` → `#bbbbbb` |
| Text transform | `uppercase` |
| Letter spacing | `0.4px` |
| Margin bottom | `4px` |

### Balance Amount (`.balance-amount`)

| Property | Value |
|---|---|
| Font size | `22px` |
| Font weight | `700` (bold) |
| Value color | `var(--pink)` → `#f64a8a` |

#### "баллов" label

| Property | Value |
|---|---|
| Font size | `13px` |
| Font weight | `500` |
| Color | `var(--text-secondary)` → `#888888` |

### Balance Subtitle (`.balance-sub`)

| Property | Value |
|---|---|
| Content | `до статуса Digital Representative` |
| Font size | `10px` |
| Color | `var(--text-secondary)` → `#888888` |
| Margin top | `4px` |

### Balance Link (`.balance-link`)

| Property | Value |
|---|---|
| Content | `Как получить?` |
| Font size | `10px` |
| Font weight | `600` |
| Color | `var(--tiffany)` → `#0ABAB5` |
| Cursor | `pointer` |
| White space | `nowrap` |
| Flex shrink | `0` |

---

# Shared Tokens

## Colors

| Token | Value |
|---|---|
| `--bg` | `#ffffff` |
| `--surface` | `#ffffff` |
| `--surface-secondary` | `#F8F8F8` (avoid — gray, user rejected) |
| `--pink` | `#f64a8a` |
| `--pink-light` | `rgba(246,74,138,0.12)` |
| `--tiffany` | `#0ABAB5` |
| `--tiffany-light` | `rgba(10,186,181,0.10)` |
| `--chiffon` | `#F5E6CC` |
| `--gold` | `#D4A854` |
| `--border` | `#EEEEEE` |
| `--border-strong` | `#DDDDDD` |
| `--text-primary` | `#1a1a1a` |
| `--text-secondary` | `#888888` |
| `--text-dim` | `#bbbbbb` |

## Sizing

| Token | Value |
|---|---|
| `--header-h` | `44px` |
| `--radius-lg` | `12px` |
| `--radius-xl` | `16px` |

## Layout

| Token | Value |
|---|---|
| Horizontal padding (content) | `16px` |
| Grid menu padding | `8px 16px` |
| Grid gap | `8px` |
| Section label bottom margin | `6px` |
| Shadow (soft) | `0 2px 12px rgba(0,0,0,0.06)` |
| Shadow (glow, pink) | `0 4px 10px rgba(246,74,138,0.2)` |
| Shadow (glow, tiffany) | `0 4px 10px rgba(10,186,181,0.2)` |
| Shadow (glow, gold) | `0 4px 10px rgba(212,168,84,0.25)` |
