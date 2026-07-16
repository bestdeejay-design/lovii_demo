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
| `--gold-light` | `rgba(212,168,84,0.12)` |
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

---

# Component Library (Pending Documentation)

> Ниже — компоненты, существующие в коде (`demo.css` + `components.js`), но ещё не задокументированные в DESIGN.md.
> **Свойства не финализированы** — будут заполнены после обсуждения.
> Сейчас — структура, назначение, схема.

---

## 1. Shell & Layout

---

### Bottom Navigation (`#app-nav`, `.nav-item`)

**Назначение:** Нижняя панель навигации, 4 таба, всегда видна.

**Где используется:** Все экраны (кроме сплэша).

**JS:** `renderNav()` в `demo.js` — подсвечивает активный таб по `data-tab`.

**Структура:**
```
#app-nav
├── .nav-item (data-tab="home")     — Главная / 🏠
├── .nav-item (data-tab="search")   — Поиск / 🔍
├── .nav-item (data-tab="orders")   — Заказы / 📦
└── .nav-item (data-tab="profile")  — Профиль / 👤
```

**Состояния:** `.nav-item` → `.nav-item.active` (подсветка `--pink`).

**Зависимости:** `--nav-h: 50px`, `--safe-bottom`.

> **Свойства:** TBD — awaiting review.

---

### Content Area (`#app-content`)

**Назначение:** Основная область контента, скролляемая, между хедером и bottom nav.

**Где используется:** Всегда.

**Структура:** Единственный контейнер, innerHTML заменяется при навигации.

**Зависимости:** `flex: 1`, `overflow-y: auto`.

> **Свойства:** TBD — awaiting review.

---

### Splash Screen (`#splash`)

**Назначение:** Загрузочный экран с анимацией открытия логотипа.

**Где используется:** При загрузке страницы, показывается 1.8с.

**JS:** `showSplash()` в `demo.js` — добавляет класс `.hidden` через 1.8с.

**Структура:**
```
#splash
├── .splash-visual
│   ├── img.splash-logo (assets/lovii-logo-light.svg)
│   └── .splash-cover (анимация slide-cover)
```

**Анимация:** `.splash-cover` — slide-cover 1.2s, cubic-bezier(0.16, 1, 0.3, 1).

**Состояния:** `#splash` (visible) → `#splash.hidden` (fade out 0.5s).

> **Свойства:** TBD — awaiting review.

---

## 2. Shared UI Components

---

### Icons (`.icon`, `.icon-sm`, `.icon-lg`)

**JS:** `Icon(name, cls)` → `<svg class="icon ${cls}"><use href="#i-${name}"/></svg>`

**Назначение:** Система иконок через SVG спрайт (определён в `index.html`, `#app-sprite`).

**Где используется:** Повсеместно.

**Типоразмеры:**
| Class | Size |
|-------|------|
| `.icon` (default) | 20×20px |
| `.icon-sm` | 16×16px |
| `.icon-lg` | 24×24px |

**Специальные переопределения (контекстные):**
- `.top-card-loc .icon` → 14×14px
- `.top-card-timer .icon` → 12×12px
- `.grid-item .iw .icon` → 22×22px
- `.nav-item .icon` → 22×22px

#### Icon Source (ЕДИНЫЙ ИСТОЧНИК)

**Правило:** Все иконки берём из **одного** набора — **Tabler Icons** (outline, 24×24, `stroke="currentColor"`, `stroke-width="2"`, round caps). Репозиторий: `tabler/tabler-icons`, путь к файлам: `icons/outline/{name}.svg`. Сырые SVG: `https://raw.githubusercontent.com/tabler/tabler-icons/master/icons/outline/{name}.svg`.

**Исключение — Суши:** Ни один крупный набор (Tabler 6146, MDI 7200+, Remix 3200+, MingCute 3324, Bootstrap 2000+, Lucide, Phosphor, Iconoir) НЕ содержит суши-иконки. Поэтому суши берётся из **Lucide Lab** (`lucide-icons/lucide-lab`, `icons/sushi-2.svg`) — тот же stroke-стиль 24×24, чтобы не выбиваться. Сырой SVG: `https://raw.githubusercontent.com/lucide-icons/lucide-lab/main/icons/sushi-2.svg`. Альтернативы в Lucide Lab: `sushi`, `sushi-3`, `sushi-chopsticks`.

**Как добавлять новую иконку:**
1. Найти имя в Tabler: `curl -sI "https://raw.githubusercontent.com/tabler/tabler-icons/master/icons/outline/{name}.svg"` (200 = есть).
2. Скопировать содержимое `<svg>` в `<symbol id="i-{name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">…</symbol>` в `#app-sprite` (`index.html`).
3. Использовать: `<svg class="icon"><use href="#i-{name}"/></svg>` или `Icon('{name}')`.
4. НЕ использовать: emoji, жёстко прописанные цвета (`fill="#141B34"` и т.п.), наборы с viewBox ≠ 24×24 без нормализации.

**Доступные иконки в спрайте (актуально):**
- Утилитарные: `i-arrow-left`, `i-chevron-right`, `i-chevron-left`, `i-clock`, `i-home`, `i-map-pin`, `i-package`, `i-plus`, `i-search`, `i-settings`, `i-shopping-bag`, `i-star`, `i-user`, `i-bar-chart`, `i-building`, `i-users`, `i-check`, `i-log-out`, `i-zap` (не используется в UI, оставлен как утилита).
- Категории поиска: `i-bread` (Выпечка), `i-flower` (Цветы), `i-coffee` (Кофе), `i-sushi` (Суши, из Lucide Lab), `i-gift` (Подарки), `i-discount` (Акции).
- Товары/магазины: `i-store` (резерв), `i-croissant` (удалён — заменён на `i-bread`).

> **Свойства:** TBD — awaiting review.

---

### Card (`.card`)

**JS:** `Card(content, cls)` → `<div class="card ${cls}">${content}</div>`

**Назначение:** Базовый контейнер для grouped content.

**Где используется:** Различные экраны (profile, search).

**Структура:**
```
.card
└── (content)
.card + .card { margin-top: 8px }
```

**Зависимости:** `--surface-secondary`, `--radius-lg`.

> **Свойства:** TBD — awaiting review.

---

### Section Label (`.section-label`)

**JS:** `SectionLabel(label, link)` → заголовок секции с опциональной ссылкой.

**Назначение:** Заголовок раздела контента.

**Где используется:** Главная (активные заказы), экраны ролей.

**Структура:**
```
.section-label
├── text (капсом, 11px)
└── a (опционально, ссылка "Все" / "Подробнее")
```

> **Свойства:** TBD — awaiting review.

---

### Buttons (`.btn`, `.btn-primary`, `.btn-ghost`, `.btn-tiffany`, `.btn-sm`, `.btn-block`)

**Назначение:** Система кнопок.

**Где используется:** Экран выбора роли, экраны дашбордов.

**Варианты:**
| Class | Стиль |
|-------|-------|
| `.btn-primary` | `--pink` bg, white text |
| `.btn-ghost` | transparent, `--border` stroke, `--text-secondary` text |
| `.btn-tiffany` | `--tiffany` bg, white text |
| `.btn-sm` | compact (5px 10px, 10px font) |
| `.btn-block` | `display: flex; width: 100%` |

**Все кнопки:** pill shape (`border-radius: 100px`), 12px font, 600 weight.

> **Свойства:** TBD — awaiting review.

---

### Tags (`.tag`, `.tag-pink`, `.tag-tiffany`, `.tag-success`, `.tag-gray`)

**JS:** `Tag(text, color)` → `<span class="tag tag-${color}">${text}</span>`

**Назначение:** Статусные метки.

**Где используется:** Order rows, partner orders, таблицы.

**Варианты:**
| Class | Background | Text |
|-------|-----------|------|
| `.tag-pink` | `--pink-light` | `--pink` |
| `.tag-tiffany` | `--tiffany-light` | `--tiffany` |
| `.tag-success` | `--success-light` | `--success` |
| `.tag-gray` | `--surface-secondary` | `--text-secondary` |

**Все тэги:** pill shape, 9px font, 600 weight, padding 2px 8px.

> **Свойства:** TBD — awaiting review.

---

## 3. Data Display

---

### Metric Block (`.metric-row`, `.metric-block`)

**JS:** `MetricBlock(val, label, color)` 

**Назначение:** Сетка из 3 ключевых метрик (заказы, выручка, новые клиенты).

**Где используется:** Главная для роли Партнёр.

**Структура:**
```
.metric-row (grid 3 колонки)
├── .metric-block
│   ├── .val (17px, 700, опционально .pink/.tiffany)
│   └── .lbl (10px, uppercase, --text-secondary)
├── .metric-block
└── .metric-block
```

> **Свойства:** TBD — awaiting review.

---

### Status Banner (`.status-banner`)

**JS:** `StatusBanner(emoji, title, sub, incomeVal, incomeLabel)`

**Назначение:** Баннер статуса представителя/амбасадора с доходом.

**Где используется:** Главная (роль rep, ambassador), дашборды.

**Структура:**
```
.status-banner (pink gradient)
├── .rank-icon (36×36px, круг, emoji)
├── .info
│   ├── .title (13px, 700, white)
│   └── .sub (10px, opacity 0.8)
└── .income
    ├── .val (15px, 700, white)
    └── .lbl (9px, opacity 0.8)
```

> **Свойства:** TBD — awaiting review.

---

### Progress Block (`.progress-block`, `.bar`, `.bar-fill`)

**JS:** `ProgressBlock(label, current, target, pct)`

**Назначение:** Прогресс-бар для отображения статуса представителя (точки до следующего ранга).

**Где используется:** Главная (роль rep).

**Структура:**
```
.progress-block
├── .row
│   ├── .lbl (10px, --text-secondary)
│   └── .count (.pink /target)
├── .bar (4px height, --border, pill)
│   └── .bar-fill (--pink, transition width)
```

> **Свойства:** TBD — awaiting review.

---

### Table Row (`.table-row`)

**JS:** `TableRow(name, meta, value)`

**Назначение:** Строка таблицы с названием, мета-информацией и значением.

**Где используется:** rep points, ambassador reps, различные списки.

**Структура:**
```
.table-row
├── .name (11px, 500, ellipsis)
├── .meta (10px, --text-secondary)
└── .value (11px, 600)
```

**Разделитель:** `border-bottom: 1px solid var(--border)`.

> **Свойства:** TBD — awaiting review.

---

### Profile Banner (`.profile-banner`)

**JS:** `ProfileBanner(name, sub)`

**Назначение:** Баннер профиля пользователя с аватаром.

**Где используется:** Экран профиля.

**Структура:**
```
.profile-banner (pink gradient, center)
├── .avatar (48×48px круг, white icon)
├── .name (16px, 700, white)
└── .sub (11px, opacity 0.8)
```

> **Свойства:** TBD — awaiting review.

---

### Stats Grid (`.stats-grid-2`, `.stat-block`)

**JS:** `StatBlock(val, label, color)`

**Назначение:** Сетка из 2 колонок статистических показателей.

**Где используется:** rep dashboard, ambassador dashboard.

**Структура:**
```
.stats-grid-2 (grid 2 колонки)
├── .stat-block
│   ├── .val (16px, 700, опционально .pink/.tiffany)
│   └── .lbl (10px, uppercase, --text-secondary)
├── .stat-block
├── .stat-block
└── .stat-block
```

> **Свойства:** TBD — awaiting review.

---

### Partner Order Card (`.p-order`)

**JS:** `POrder(id, items, amount, status, statusColor)`

**Назначение:** Карточка входящего заказа для партнёра.

**Где используется:** Главная партнёра, экран заказов партнёра.

**Структура:**
```
.p-order
├── .left
│   └── .oname (11px, 500)
├── .right
│   ├── .oprice (12px, 600)
│   └── .tag (.tag-pink/.tag-tiffany/.tag-success)
```

> **Свойства:** TBD — awaiting review.

---

## 4. Interactive / Navigation

---

### Menu Item (`.menu-item`)

**JS:** `MenuItem(iconName, iconColor, title, sub)`

**Назначение:** Строка меню с иконкой, заголовком, подзаголовком и стрелкой.

**Где используется:** Экраны настроек, списки.

**Структура:**
```
.menu-item
├── .icon-box (32×32px, accent bg)
│   └── .icon
├── .text
│   ├── .title (13px, 500)
│   └── .sub (11px, --text-secondary)
└── .arrow (chevron-right, --text-dim)
```

**Варианты `.icon-box`:** `.pink`, `.tiffany`, `.chiffon-bg`.

> **Свойства:** TBD — awaiting review.

---

### Quick Actions Bar (`.quick-bar`, `.quick-btn`)

**JS:** `QuickBtn(iconName, label, cls)`

**Назначение:** Горизонтальный ряд быстрых действий (кнопки-пилюли).

**Где используется:** Главная партнёра (+Товар, Акция).

**Структура:**
```
.quick-bar (flex, gap 6px)
├── .quick-btn (pill, --pink-light, 10px)
│   └── .icon + label
└── .quick-btn.ghost
    └── .icon + label
```

**Варианты:** `.quick-btn` (pink), `.quick-btn.ghost` (transparent).

> **Свойства:** TBD — awaiting review.

---

### Tab Bar (`.tab-bar`, `.tab-item`)

**JS:** `TabBar(tabs, activeIndex)`

**Назначение:** Горизонтальные вкладки для переключения между подразделами.

**Где используется:** Экран заказов (Активные / История), экраны ролей.

**Структура:**
```
.tab-bar (border-bottom)
├── .tab-item (padding 8px 0, 12px, 500)
│   └── .active → --pink underline
└── .tab-item + .tab-item (margin-left: 16px)
```

**Состояния:** `.tab-item` → `.tab-item.active` (pink text + pink bottom border).

> **Свойства:** TBD — awaiting review.

---

### Search Bar (`.search-bar`)

**JS:** `SearchBar(placeholder)`

**Назначение:** Поле поиска с иконкой.

**Где используется:** Экран поиска.

**Структура:**
```
.search-bar
├── .icon (search, 16px, --text-dim)
└── input (13px, без бордера, flex: 1)
```

> **Свойства:** TBD — awaiting review.

---

### Category Chips (`.cat-row`, `.cat-chip`)

**JS:** `screenSearch()` → `categoryHtml` рендерит `.cat-chip` в `.cat-row` (`js/screens/search.js`).

**Назначение:** Горизонтальный скроллящийся ряд категорий-тегов с цветной плиткой-иконкой и подписью. Единый визуальный язык с `.grid-item .iw` (иконка на цветном фоне).

**Где используется:** Экран поиска (`#search`), секция «Категории».

**Структура:**
```
.cat-row (flex, overflow-x: auto, hide scrollbar, padding 0 16px)
└── .cat-chip (flex column, gap 5px, cursor pointer)
    ├── .cat-tile.t-{pink|tiffany|gold} (40×40px, radius 12px, icon 26×26px)
    └── .cat-name (11px, 600, --text-secondary)
```

**Акцентные цвета (`.cat-tile`):**
| Class | Background (default) | Background (active) | Icon color |
|-------|----------------------|-----------------------|-------------|
| `.t-pink` | `--pink-light` | `--pink` | `--pink` → `#fff` |
| `.t-tiffany` | `--tiffany-light` | `--tiffany` | `--tiffany` → `#fff` |
| `.t-gold` | `--gold-light` | `--gold` | `--gold` → `#fff` |

**Состояния:**
- `.cat-chip:active` → `.cat-tile` scale(0.94) (нажатие).
- `.cat-chip.active` → плитка заливается сплошным акцентом, иконка белеет, `.cat-name` → `--text-primary` + 700.
- Выбор — **single** (как `.role-card`): клик по `.cat-chip` в `demo.js` снимает `.active` с соседей, вешает на выбранный.

**Иконки:** берутся из спрайта по `data-*` → `Icon(name)`: `bread` (Выпечка), `flower` (Цветы), `coffee` (Кофе), `sushi` (Суши), `gift` (Подарки), `discount` (Акции). См. раздел **Icon Source** выше.

> **Свойства:** Зафиксированы (V1, выбран пользователем из 8 вариантов в `design/playground-categories.html`).

---

### Role Card (`.role-card`)

**JS:** `RoleCard(emoji, name, desc, active)`

**Назначение:** Карточка выбора роли на экране профиля.

**Где используется:** Экран смены роли (profile).

**Структура:**
```
.role-grid (grid 2 колонки)
├── .role-card
│   ├── .role-icon (24px emoji)
│   ├── .role-name (11px, 600)
│   └── .role-desc (9px, --text-secondary)
└── .role-card.active (--pink border, --pink-mid bg)
```

**Состояния:** `.role-card` → `.role-card.active` (pink border), `:active` (pink border flash).

**Роли:** Клиент (`client`), Партнёр (`partner`), Представитель (`rep`), Амбасадор (`ambassador`).

> **Свойства:** TBD — awaiting review.

---

### Section Padding Helpers (`.section-pad`, `.section-margin`, `.section-top`)

**Назначение:** Вспомогательные классы для единообразных отступов.

| Class | Value |
|-------|-------|
| `.section-pad` | `padding: 0 16px` |
| `.section-margin` | `margin: 0 16px` |
| `.section-top` | `padding-top: 8px` |

> **Свойства:** TBD — awaiting review.

---

### Promo Banner (`.promo-banner`)

**JS:** `PromoBanner(title, sub, timer)`

**Назначение:** Промо-баннер для роли партнёр (альтернатива TopCard для client).

**Где используется:** Главная партнёра.

**Структура:**
```
.promo-banner (pink gradient)
├── .text
│   ├── strong (15px, 700, white)
│   └── sub text (11px, 500, white 0.9)
└── .timer (white 0.15 bg, 9px, 600)
    └── .icon + text
```

> **Свойства:** TBD — awaiting review.

---

### Tag Statuses (расширение)

**Дополнительные варианты `.tag` (уже в коде, помимо pink/tiffany):**

| Class | Background | Text | Использование |
|-------|-----------|------|---------------|
| `.tag-success` | `--success-light` | `--success` | Статус "Готов" |
| `.tag-gray` | `--surface-secondary` + `1px solid --border` | `--text-secondary` | Дефолтный/нейтральный |

> **Свойства:** TBD — awaiting review.
