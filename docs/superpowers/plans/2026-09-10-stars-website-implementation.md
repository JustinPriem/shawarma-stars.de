# STARS Pizza & Döner Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, mobile-first, Schwarz-Gold One-Page-Website für "STARS – Pizza & Döner" (Bad Berka) mit vollständiger, strukturiert erfasster Speisekarte, Öffnungszeiten/Lieferzeiten und Kontakt/Anfahrt, deploybar über GitHub Pages.

**Architecture:** Reines HTML/CSS/Vanilla-JS ohne Build-Tools oder Frameworks. Ein `index.html` mit semantischen Sections, `css/style.css` für Styling (CSS-Variablen für das Schwarz-Gold-Theme), `js/script.js` für die drei kleinen Verhaltensbausteine (Menü-Tab-Filter, mobiles Hamburger-Menü, Sticky-Header-Schatten beim Scrollen). Kein Server, keine Abhängigkeiten außer optional Google Fonts über CDN.

**Tech Stack:** HTML5, CSS3 (Custom Properties, Flexbox/Grid, Media Queries), Vanilla JavaScript (ES6), Google Fonts (Cinzel + Inter), Google Maps Embed (iframe, kein API-Key nötig).

## Global Constraints

- Design: Schwarz-Gold (Hintergrund #0b0b0c/#141414, Gold-Akzent #d4af37–#f5d67a, Text #f5f0e6) — aus Spec.
- Keine Fotos/Stockbilder — nur CSS-Ornamente/Icons/Emoji — aus Spec.
- Mobile-first, Hamburger-Nav unter 768px — aus Spec.
- Keine Online-Bestellung — nur `tel:`-Links und Google-Maps-Route als CTA — aus Spec.
- Keine aktuelle Rabattaktion übernehmen (abgelaufene Jubiläumsaktion 08.–12.09.2025 wird weggelassen) — aus Spec.
- Menüdaten direkt als semantisches HTML im Dokument, nicht per JSON/JS generiert — aus Spec.
- Adresse: Bahnhof Str. 3, 99438 Bad Berka. Telefon: 036458 / 633 217 und 036458 / 633 216 — aus Spec.
- Deployment: Git-Remote `https://github.com/JustinPriem/shawarma-stars.de.git`, Branch `main`, GitHub Pages — aus Spec.

---

## File Structure

```
shawarma-stars/
├── index.html          # gesamte Seite (Header, Hero, Speisekarte, Öffnungszeiten, Kontakt, Footer)
├── css/
│   └── style.css        # Theme-Variablen, Reset, alle Section-Styles, Media Queries
├── js/
│   └── script.js         # Tab-Filter, Hamburger-Nav, Sticky-Header
└── docs/superpowers/…    # Spec & Plan (bereits vorhanden)
```

---

### Task 1: Projekt-Grundgerüst (Header, Hero, Footer, Theme)

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/script.js` (leeres Stub mit Kommentar, wird in Task 3/6 gefüllt)

**Interfaces:**
- Produces: CSS-Variablen `--bg`, `--bg-alt`, `--gold`, `--gold-light`, `--text`, `--text-dim`, `--font-heading`, `--font-body` in `:root` (von allen späteren Tasks verwendet)
- Produces: HTML-IDs `#top` (Header), `#home` (Hero), Klassen `.container`, `.btn`, `.btn-primary`, `.btn-secondary` (von allen späteren Sections verwendet)
- Produces: `<nav id="main-nav">` mit `<button id="nav-toggle">` (Hamburger-Button, wird in Task 6 mit JS verdrahtet)

- [ ] **Step 1: Schreibe eine Prüf-Assertion für die noch fehlende Grundstruktur**

Lege eine kleine Prüfdatei an, die die erwarteten Marker in `index.html` sucht (Ersatz für einen Test, da es sich um reines HTML handelt):

```bash
cd "C:/Users/rober/Desktop/shawarma-stars"
grep -c "id=\"home\"" index.html
```

- [ ] **Step 2: Prüfe, dass es fehlschlägt (Datei existiert noch nicht)**

Run: `grep -c "id=\"home\"" index.html`
Expected: Fehler `index.html: No such file or directory` (Befehl schlägt fehl / Exit-Code ≠ 0)

- [ ] **Step 3: `css/style.css` mit Theme-Variablen, Reset und Basis-Layout anlegen**

```css
/* css/style.css */
:root {
  --bg: #0b0b0c;
  --bg-alt: #141414;
  --gold: #d4af37;
  --gold-light: #f5d67a;
  --text: #f5f0e6;
  --text-dim: #c9c2b3;
  --font-heading: 'Cinzel', serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --max-width: 1100px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.6;
}

img { max-width: 100%; display: block; }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.25rem;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  color: var(--gold-light);
  letter-spacing: 0.02em;
}

a { color: var(--gold-light); text-decoration: none; }

.gold-divider {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 2rem 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid var(--gold);
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
}
.btn:hover { transform: translateY(-2px); }

.btn-primary {
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: #1a1204;
}

.btn-secondary {
  background: transparent;
  color: var(--gold-light);
}

/* Header */
#top {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(11, 11, 12, 0.92);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.25);
}

#top .header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.25rem;
  max-width: var(--max-width);
  margin: 0 auto;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--gold-light);
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.logo span { font-size: 0.6rem; letter-spacing: 0.3em; color: var(--text-dim); font-family: var(--font-body); }

#main-nav ul {
  list-style: none;
  display: flex;
  gap: 1.75rem;
}

#main-nav a {
  color: var(--text);
  font-weight: 500;
}
#main-nav a:hover { color: var(--gold-light); }

#nav-toggle {
  display: none;
  background: none;
  border: 1px solid var(--gold);
  border-radius: 8px;
  color: var(--gold-light);
  font-size: 1.25rem;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
}

/* Hero */
#home {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.25rem;
  background: radial-gradient(ellipse at center, var(--bg-alt) 0%, var(--bg) 70%);
}

#home .hero-inner { max-width: 700px; }

#home h1 {
  font-size: clamp(2.2rem, 6vw, 3.75rem);
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}

#home .tagline {
  color: var(--text-dim);
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}

#home .hero-address {
  color: var(--text-dim);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Footer */
footer {
  border-top: 1px solid rgba(212, 175, 55, 0.25);
  padding: 2.5rem 1.25rem;
  text-align: center;
  color: var(--text-dim);
  font-size: 0.9rem;
}
footer strong { color: var(--gold-light); }
```

- [ ] **Step 4: `index.html` mit Grundgerüst, Header, Hero und Footer anlegen**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>STARS – Pizza &amp; Döner Bad Berka</title>
  <meta name="description" content="STARS Pizza &amp; Döner in Bad Berka – Döner, Pizza, Nudelgerichte, Burger und mehr. Jetzt anrufen oder Route planen.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header id="top">
    <div class="header-inner">
      <a href="#top" class="logo">★ STARS ★<span>PIZZA &amp; DÖNER</span></a>
      <nav id="main-nav">
        <ul>
          <li><a href="#home">Start</a></li>
          <li><a href="#speisekarte">Speisekarte</a></li>
          <li><a href="#oeffnungszeiten">Öffnungszeiten</a></li>
          <li><a href="#kontakt">Kontakt</a></li>
        </ul>
      </nav>
      <a class="btn btn-primary" href="tel:036458633217">📞 Jetzt anrufen</a>
      <button id="nav-toggle" aria-label="Menü öffnen" aria-expanded="false">☰</button>
    </div>
  </header>

  <section id="home">
    <div class="hero-inner">
      <h1>STARS – Pizza &amp; Döner</h1>
      <p class="tagline">Döner, Pizza, Pasta &amp; mehr – frisch zubereitet in Bad Berka</p>
      <p class="hero-address">Bahnhof Str. 3 · 99438 Bad Berka</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="tel:036458633217">📞 Jetzt anrufen</a>
        <a class="btn btn-secondary" href="https://www.google.com/maps/dir/?api=1&destination=Bahnhof+Str.+3+99438+Bad+Berka" target="_blank" rel="noopener">📍 Route planen</a>
      </div>
    </div>
  </section>

  <footer>
    <p><strong>STARS – Pizza &amp; Döner</strong> · Bahnhof Str. 3, 99438 Bad Berka</p>
    <p>Tel.: <a href="tel:036458633217">036458 / 633 217</a> · <a href="tel:036458633216">036458 / 633 216</a></p>
    <p>&copy; 2026 STARS – Pizza &amp; Döner. Alle Rechte vorbehalten.</p>
  </footer>

  <script src="js/script.js"></script>
</body>
</html>
```

- [ ] **Step 5: `js/script.js` als Stub anlegen**

```javascript
// js/script.js
// Wird in späteren Tasks befüllt: Menü-Tab-Filter, Hamburger-Nav, Sticky-Header-Schatten.
document.addEventListener('DOMContentLoaded', () => {
  console.log('STARS website loaded');
});
```

- [ ] **Step 6: Prüfe, dass die Marker jetzt vorhanden sind**

Run: `grep -c "id=\"home\"" index.html`
Expected: `1`

Run: `grep -c "class=\"logo\"" index.html`
Expected: `1`

- [ ] **Step 7: Im Browser visuell prüfen**

Öffne `index.html` im Browser-Tool (`mcp__Claude_Browser__navigate` mit `file:///C:/Users/rober/Desktop/shawarma-stars/index.html` oder per `preview_start`), Screenshot machen: Header mit Logo/Nav/Anruf-Button und Hero mit goldenem Titel müssen sichtbar sein, Hintergrund schwarz.

- [ ] **Step 8: Commit**

```bash
git add index.html css/style.css js/script.js
git commit -m "feat: add base layout with header, hero and footer"
```

---

### Task 2: Speisekarte – Struktur, CSS und vollständige Menüdaten

**Files:**
- Modify: `index.html` (neue Section `#speisekarte` nach `#home` einfügen, vor `<footer>`)
- Modify: `css/style.css` (Styles für `.menu`, `.menu-tabs`, `.menu-panel`, `.menu-item` anhängen)

**Interfaces:**
- Consumes: `.container`, `.gold-divider`, CSS-Variablen aus Task 1
- Produces: `<section id="speisekarte">` mit `.menu-tabs` (Buttons mit `data-target="<category-id>"`) und `.menu-panels` (Divs mit `id="<category-id>"` und Klasse `.menu-panel`) — wird von Task 3 (JS-Filter) konsumiert. Kategorie-IDs: `doener`, `duerum-lahmacun`, `schnitzel`, `pizza`, `nudelgerichte`, `arabisch`, `baguettes`, `salate`, `snacks`, `burger`, `getraenke`.

- [ ] **Step 1: Prüf-Assertion für die Anzahl Menüpunkte schreiben**

```bash
cd "C:/Users/rober/Desktop/shawarma-stars"
grep -o "menu-item\"" index.html | wc -l
```

- [ ] **Step 2: Prüfe, dass es fehlschlägt (Section existiert noch nicht)**

Run: `grep -o "menu-item\"" index.html | wc -l`
Expected: `0`

- [ ] **Step 3: CSS für die Speisekarte an `css/style.css` anhängen**

```css
/* Menu */
.menu { padding: 4rem 0; background: var(--bg-alt); }
.menu h2 { text-align: center; font-size: 2rem; margin-bottom: 1.5rem; }

.menu-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.tab-btn {
  background: transparent;
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: var(--text-dim);
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s ease;
}
.tab-btn:hover { border-color: var(--gold); color: var(--gold-light); }
.tab-btn.active {
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  border-color: transparent;
  color: #1a1204;
  font-weight: 600;
}

.menu-panel { display: none; }
.menu-panel.active { display: block; animation: fadeIn 0.25s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.menu-panel h3 {
  font-size: 1.4rem;
  margin-bottom: 0.25rem;
}
.menu-panel .category-note {
  color: var(--text-dim);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.menu-item {
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
}
.menu-item:last-child { border-bottom: none; }

.menu-item-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.menu-item-name {
  font-weight: 600;
  color: var(--text);
}
.menu-item-no {
  color: var(--gold);
  font-weight: 700;
  margin-right: 0.4rem;
}
.menu-item-tag {
  display: inline-block;
  background: #7a1f1f;
  color: #ffe4e4;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.4rem;
  vertical-align: middle;
}

.menu-item-price {
  color: var(--gold-light);
  font-weight: 700;
  white-space: nowrap;
}

.menu-item-desc {
  color: var(--text-dim);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.menu-allergen-note {
  margin-top: 2rem;
  text-align: center;
  color: var(--text-dim);
  font-size: 0.8rem;
}
```

- [ ] **Step 4: `#speisekarte`-Section mit Tabs und allen 11 Kategorien in `index.html` einfügen (zwischen `</section>` von `#home` und `<footer>`)**

```html
<section id="speisekarte" class="menu">
  <div class="container">
    <h2>Speisekarte</h2>
    <hr class="gold-divider">
    <div class="menu-tabs" role="tablist">
      <button class="tab-btn active" data-target="doener">Döner</button>
      <button class="tab-btn" data-target="duerum-lahmacun">Dürüm &amp; Lahmacun</button>
      <button class="tab-btn" data-target="schnitzel">Schnitzel</button>
      <button class="tab-btn" data-target="pizza">Pizza</button>
      <button class="tab-btn" data-target="nudelgerichte">Nudelgerichte</button>
      <button class="tab-btn" data-target="arabisch">Arabische Gerichte</button>
      <button class="tab-btn" data-target="baguettes">Baguettes</button>
      <button class="tab-btn" data-target="salate">Salate</button>
      <button class="tab-btn" data-target="snacks">Snacks</button>
      <button class="tab-btn" data-target="burger">Burger</button>
      <button class="tab-btn" data-target="getraenke">Getränke</button>
    </div>

    <div class="menu-panels">

      <div class="menu-panel active" id="doener">
        <h3>Döner</h3>
        <p class="category-note">Fleischsorten: Putenfleisch oder Hühnerfleisch</p>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">1</span>Kinder Döner</span><span class="menu-item-price">5,50 €</span></div><p class="menu-item-desc">mit Fleisch, Eisbergsalat, Weiß-/Rotkraut, Zwiebeln, Gurken, Tomaten, Soße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">2</span>Normal Döner</span><span class="menu-item-price">7,00 €</span></div><p class="menu-item-desc">mit Fleisch, Eisbergsalat, Weiß-/Rotkraut, Zwiebeln, Gurken, Tomaten, Soße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">3</span>Hawaii Döner</span><span class="menu-item-price">7,50 €</span></div><p class="menu-item-desc">mit Fleisch, Eisbergsalat, Weiß-/Rotkraut, Zwiebeln, Gurken, Tomaten, Ananas, Soße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">4</span>Feta Döner</span><span class="menu-item-price">7,50 €</span></div><p class="menu-item-desc">mit Fleisch, Eisbergsalat, Weiß-/Rotkraut, Zwiebeln, Gurken, Tomaten, Feta, Soße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">5</span>Big Dönner</span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">mit Fleisch, Eisbergsalat, Weiß-/Rotkraut, Zwiebeln, Gurken, Tomaten, Soße – extra groß</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">6</span>Döner Teller</span><span class="menu-item-price">10,00 €</span></div><p class="menu-item-desc">mit Fleisch, Eisbergsalat, Weiß-/Rotkraut, Zwiebeln, Gurken, Tomaten, Reis, Pommes oder Nudeln und Soße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">7</span>Döner Box</span><span class="menu-item-price">8,00 €</span></div><p class="menu-item-desc">Dönerfleisch mit Salat, Reis, Pommes oder Nudeln und Soße</p></div>
      </div>

      <div class="menu-panel" id="duerum-lahmacun">
        <h3>Dürüm &amp; Lahmacun</h3>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">10</span>Normal</span><span class="menu-item-price">7,50 €</span></div><p class="menu-item-desc">mit Fleisch, Eisbergsalat, Weiß-/Rotkraut, Zwiebeln, Gurken, Tomaten, Soße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">11</span>Hawaii</span><span class="menu-item-price">8,00 €</span></div><p class="menu-item-desc">mit Fleisch, Eisbergsalat, Weiß-/Rotkraut, Zwiebeln, Gurken, Tomaten, Ananas, Soße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">12</span>Feta</span><span class="menu-item-price">8,00 €</span></div><p class="menu-item-desc">mit Fleisch, Eisbergsalat, Weiß-/Rotkraut, Zwiebeln, Gurken, Tomaten, Feta, Soße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">13</span>Lahmacun</span><span class="menu-item-price">8,00 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">14</span>Lahmacun mit Feta</span><span class="menu-item-price">8,50 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">15</span>Big Dürüm oder Lahmacun</span><span class="menu-item-price">9,50 €</span></div><p class="menu-item-desc">Wahl aus Nr. 10–12, größer &amp; mit Extra-Füllung, dazu Fleisch, Eisbergsalat, Weiß-/Rotkraut, Zwiebeln, Gurken, Tomaten, Soße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">16</span>Vegetarisch</span><span class="menu-item-price">8,00 €</span></div><p class="menu-item-desc">mit Halloumi, Falafel, Salat und Soße</p></div>
      </div>

      <div class="menu-panel" id="schnitzel">
        <h3>Schnitzel</h3>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">20</span>Wiener Schnitzel</span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">mit Pommes oder Potatos und Salat</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">21</span>Rahm Schnitzel</span><span class="menu-item-price">10,00 €</span></div><p class="menu-item-desc">mit Pommes oder Potatos und Salat</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">22</span>Hawaii Schnitzel</span><span class="menu-item-price">11,00 €</span></div><p class="menu-item-desc">mit Käse überbacken, Schinken, Ananas, Pommes</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">23</span>Jäger Schnitzel</span><span class="menu-item-price">10,00 €</span></div><p class="menu-item-desc">mit Pilzen, Zwiebeln, Pommes oder Potatos</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">24</span>Bolognese Schnitzel</span><span class="menu-item-price">11,00 €</span></div><p class="menu-item-desc">mit Hackfleischsoße, Pommes oder Potatos, mit Käse überbacken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">25</span>Gorgonzola Schnitzel<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,00 €</span></div><p class="menu-item-desc">mit Kroketten und Pommes</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">26</span>Hollandaise Schnitzel<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,50 €</span></div><p class="menu-item-desc">mit Putenschinken, Kroketten und Pommes, mit Käse überbacken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">29</span>Pizzabrötchen (8 Stück)</span><span class="menu-item-price">7,00 € / 8,50 €</span></div><p class="menu-item-desc">gefüllt mit Tomatensoße, Gouda, Dip; wahlweise Salami, Putenschinken, Thunfisch, Dönerfleisch, Gemüse, Schinken mit Ananas, oder 8 Stück nach Wunsch. Dips: Kräuter, Knoblauch, Curry, BBQ, Honigsenf</p></div>
      </div>

      <div class="menu-panel" id="pizza">
        <h3>Pizza</h3>
        <p class="category-note">26 cm / 30 cm · Alle Pizzen können mit Mozzarella, Wurst oder Gouda im Rand gefüllt werden (+2 €)</p>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">30</span>Pizza Salami</span><span class="menu-item-price">7,50 € / 8,50 €</span></div><p class="menu-item-desc">Tomatensauce, Salami, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">31</span>Pizza Hawaii</span><span class="menu-item-price">8,50 € / 9,50 €</span></div><p class="menu-item-desc">Tomatensauce, Schinken, Ananas, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">32</span>Pizza Döner</span><span class="menu-item-price">9,50 € / 10,50 €</span></div><p class="menu-item-desc">Tomatensauce, roten Zwiebeln und Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">33</span>Pizza Chicken</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Tomatensauce, roten Zwiebeln, Paprika, Hähnchenstreifen und Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">34</span>Pizza Funghi</span><span class="menu-item-price">7,50 € / 8,50 €</span></div><p class="menu-item-desc">Tomatensauce, frische Champignons &amp; Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">35</span>Pizza Italia</span><span class="menu-item-price">8,50 € / 9,50 €</span></div><p class="menu-item-desc">Tomatensauce, frische Tomaten, Mozzarella &amp; Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">36</span>Pizza Hollandaise</span><span class="menu-item-price">9,00 € / 10,00 €</span></div><p class="menu-item-desc">Sauce Hollandaise, Schinken, Brokkoliröschen &amp; Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">37</span>Pizza Orient</span><span class="menu-item-price">9,50 € / 10,50 €</span></div><p class="menu-item-desc">Curry-Sauce, Ananas, Hähnchenstreifen, Mozzarella &amp; Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">38</span>Pizza Schinken</span><span class="menu-item-price">7,50 € / 8,50 €</span></div><p class="menu-item-desc">Tomatensauce, Schinken und Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">39</span>Pizza Hot Sucuk</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Tomatensauce, Jalapenos, Sucuk, Zwiebeln &amp; Feta-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">40</span>Pizza Tonno</span><span class="menu-item-price">9,00 € / 10,00 €</span></div><p class="menu-item-desc">Tomatensauce, roten Zwiebeln, Tunfisch &amp; Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">41</span>Pizza Roma</span><span class="menu-item-price">11,50 € / 12,50 €</span></div><p class="menu-item-desc">Sauce Hollandaise, Brokkoli, Schinken, Gouda, Garnelen</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">42</span>Pizza Classico</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Tomatensauce, Paperoni mild, Chili-Salami, frischen Champignons &amp; Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">43</span>Pizza Hot Dog</span><span class="menu-item-price">8,50 € / 9,50 €</span></div><p class="menu-item-desc">Grillsauce, Hot-Dog-Würstchen, eingelegte Gurken, Röstzwiebeln und Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">44</span>Pizza Feta</span><span class="menu-item-price">8,50 € / 9,50 €</span></div><p class="menu-item-desc">Tomatensauce, Spinat, Feta und Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">45</span>Pizza 4-Jahreszeiten</span><span class="menu-item-price">9,50 € / 10,50 €</span></div><p class="menu-item-desc">Tomatensauce, roten Zwiebeln, Spinat, frischen Champignons, frischer Paprika und Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">46</span>Pizza Mexico</span><span class="menu-item-price">10,50 € / 11,50 €</span></div><p class="menu-item-desc">BBQ-Sauce, frischer Paprika, roten Zwiebeln, Mais, Hähnchenstreifen und Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">47</span>Pizza Margherita</span><span class="menu-item-price">7,00 € / 8,00 €</span></div><p class="menu-item-desc">Tomatensauce und Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">48</span>Pizza Turin</span><span class="menu-item-price">8,00 € / 9,00 €</span></div><p class="menu-item-desc">Pizzasauce, Champignons, Schinken &amp; Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">49</span>Pizza Sucuk</span><span class="menu-item-price">9,50 €</span></div><p class="menu-item-desc">Pizzasauce, Sucuk &amp; Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">50</span>Pizza Trient</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Tomatensauce, Rucola, Mozzarella, Parmaschinken, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">51</span>Pizza West</span><span class="menu-item-price">9,50 € / 10,50 €</span></div><p class="menu-item-desc">Brokkoli, Schnitzelstreifen, Sauce Hollandaise, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">52</span>Pizza Milano</span><span class="menu-item-price">10,50 € / 11,50 €</span></div><p class="menu-item-desc">Pizzasauce, Zwiebeln, Paprika, Hähnchenstreifen, Mais, Jalapenos, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">53</span>Pizza Bolognese</span><span class="menu-item-price">8,00 € / 9,00 €</span></div><p class="menu-item-desc">Tomaten-Hackfleischsoße, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">54</span>Pizza Pollo</span><span class="menu-item-price">9,50 € / 10,50 €</span></div><p class="menu-item-desc">Pizzasauce, Paprika, Käse, Hähnchenstreifen, Mais</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">55</span>Pizza Grüner-Garten</span><span class="menu-item-price">10,50 € / 11,50 €</span></div><p class="menu-item-desc">Pizzasauce, Champignons, Brokkoli, Spinat, Gouda-Käse, Cherry-Tomaten</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">56</span>Pizza Formaggi<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Mozzarella, Gorgonzola, Parmesan und Gouda</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">57</span>Pizza Frutti de Mare (Speziell)<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,00 € / 12,00 €</span></div><p class="menu-item-desc">mit Meeresfrüchten, Knoblauchöl</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">58</span>Pizza Stars</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Sauce Hollandaise, Käse, Mais, Hähnchenstreifen, Schinken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">59</span>Pizza Florence</span><span class="menu-item-price">9,00 € / 10,00 €</span></div><p class="menu-item-desc">Pizzasauce, rot Zwiebeln, Bacon, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">60</span>Pizza Hot Tonno</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Pizzasauce, Zwiebeln, Tunfisch, Jalapenos, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">61</span>Pizza Palermo</span><span class="menu-item-price">8,00 € / 9,00 €</span></div><p class="menu-item-desc">Pizzasauce, Pepperoni, Salami, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">62</span>Pizza Venedig</span><span class="menu-item-price">9,50 € / 10,50 €</span></div><p class="menu-item-desc">Sauce Hollandaise, Brokkoli, Hähnchenstreifen, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">63</span>Pizza Potenza</span><span class="menu-item-price">9,50 € / 10,50 €</span></div><p class="menu-item-desc">BBQ-Sauce, Zwiebeln, Hähnchenstreifen, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">64</span>Pizza Verona</span><span class="menu-item-price">9,50 € / 10,50 €</span></div><p class="menu-item-desc">Pizzasauce, Salami, Schinken, Pilze, Oliven</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">65</span>Pizza Sienna</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Tomatensauce, Dönerfleisch, Zwiebeln, Feta, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">66</span>Pizza Athin</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Pizzasauce, Zwiebeln, Hähnchenstreifen, Feta, Gouda-Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">67</span>Pizza Kentucky</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Pizzasauce, Zwiebeln, Bacon, Kartoffeln</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">68</span>Pizza Querbeet</span><span class="menu-item-price">9,50 € / 10,50 €</span></div><p class="menu-item-desc">Sauce Hollandaise, Spargel, Schinken, Gouda-Käse · zusätzlicher Belag +1,50 €</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">69</span>Party Pizza 50 cm ⌀</span><span class="menu-item-price">22,00 €</span></div><p class="menu-item-desc">Pizzasauce, Gouda-Käse, Salami, Schinken · je Extra-Belag +2,50 €</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">70</span>Calzone auf Wunsch</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Alle unsere Pizzasorten sind auch als Calzone erhältlich</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">71</span>Pide</span><span class="menu-item-price">10,00 € / 11,00 €</span></div><p class="menu-item-desc">Klein / Groß · Alle unsere Pizzasorten sind auch als Pide erhältlich</p></div>
      </div>

      <div class="menu-panel" id="nudelgerichte">
        <h3>Nudelgerichte</h3>
        <p class="category-note">Auf Wunsch überbacken +1,50 €</p>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">75</span>Tagiatelle al Salmone<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,00 €</span></div><p class="menu-item-desc">mit Lax, Sahnesoße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">76</span>Tagiatelle Spinat<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,00 €</span></div><p class="menu-item-desc">mit Spinat, Gorgonzola, Sahnesoße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">77</span>Tagiatelle Quattro Formaggi<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,00 €</span></div><p class="menu-item-desc">Mozzarella, Gorgonzola, Parmesan und Gouda</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">78</span>Spaghetti Spezial<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,50 €</span></div><p class="menu-item-desc">Dönerfleisch, Ananas, Sauce Hollandaise, Käse überbacken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">79</span>Spaghetti Frutti di Mare<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,50 €</span></div><p class="menu-item-desc">mit Meeresfrüchten, Knoblauchöl, frische Tomaten</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">80</span>Spaghetti Bolognese</span><span class="menu-item-price">8,50 €</span></div><p class="menu-item-desc">mit Hackfleischsoße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">81</span>Spaghetti Carbonara</span><span class="menu-item-price">8,50 €</span></div><p class="menu-item-desc">mit Schinken, Sahnesoße, Ei</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">82</span>Spaghetti al Pomodoro<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">9,50 €</span></div><p class="menu-item-desc">mit frischen Tomaten, frischem Knoblauch, scharfen Jalapeños</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">83</span>Pasta Veggi</span><span class="menu-item-price">8,50 €</span></div><p class="menu-item-desc">Brokkoli, Spinat, Pilze, Tomaten-Sahnesoße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">84</span>Pasta Chicken</span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">Tomaten-Sahnesoße, Hähnchenstreifen, Pilze</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">85</span>Pasta Bozen</span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">Hollandaise, Spinat, Schinken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">86</span>Stars Spezial</span><span class="menu-item-price">9,50 €</span></div><p class="menu-item-desc">Dönerfleisch, Tomaten-Sahnesoße</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">87</span>Pasta Scampis</span><span class="menu-item-price">10,00 €</span></div><p class="menu-item-desc">Tomaten-Sahnesoße, Garnelen</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">88</span>Pasta Hähnchen</span><span class="menu-item-price">9,50 €</span></div><p class="menu-item-desc">Hähnchenstreifen, Sauce Hollandaise</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">89</span>Lasagne<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,50 €</span></div><p class="menu-item-desc">mit Schinken und Hackfleischsoße, Sahnesoße, Käse überbacken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">90</span>Kartoffelauflauf 1<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,50 €</span></div><p class="menu-item-desc">Tomaten-Sahnesoße, Brokkoli &amp; Spinat oder Dönerfleisch, Käse überbacken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">91</span>Kartoffelauflauf 2<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,50 €</span></div><p class="menu-item-desc">Sauce Hollandaise, Blumenkohl, Käse überbacken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">92</span>Kartoffelauflauf 3<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,50 €</span></div><p class="menu-item-desc">Ananas, Hähnchenstreifen, Tomaten-Sahnesoße, Käse überbacken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">93</span>Kartoffelauflauf 4<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,50 €</span></div><p class="menu-item-desc">Dönerfleisch, Ananas, Sauce Hollandaise, Käse überbacken</p></div>
      </div>

      <div class="menu-panel" id="arabisch">
        <h3>Arabische Gerichte</h3>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">97</span>Shawarma Rolle</span><span class="menu-item-price">6,50 €</span></div><p class="menu-item-desc">Hähnchenfleisch, Knoblauchpaste und eingelegte Gurken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">98</span>Schawarma Rolle mit Salat</span><span class="menu-item-price">7,00 €</span></div><p class="menu-item-desc">Hähnchenfleisch, Salat, Knoblauchpaste &amp; eingelegte Gurken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">99</span>Shawarma Arabisch Teller</span><span class="menu-item-price">9,50 €</span></div><p class="menu-item-desc">geschnittene Shawarmarolle, Hähnchenstreifen, Pommes, Salat, Knoblauchpaste, eingelegte Gurken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">100</span>Schawarma Rolle mit Pommes</span><span class="menu-item-price">7,50 €</span></div><p class="menu-item-desc">Hähnchenfleisch, Knoblauchpaste, Pommes, eingelegte Gurken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">101</span>Crispy Teller<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">11,00 €</span></div><p class="menu-item-desc">Hähnchenbrustfilet, Knoblauchpaste, Coleslaw, Käse, Pommes</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">102</span>Crispy Rolle<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">Hähnchenbrustfilet, Knoblauchpaste, Coleslaw, Käse, Pommes</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">103</span>Tabula Salat</span><span class="menu-item-price">6,00 €</span></div><p class="menu-item-desc">Bulgur, Tomaten, Petersilie, Zitrone und Zwiebeln</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">104</span>Hummus mit Dönerfleisch</span><span class="menu-item-price">6,50 €</span></div><p class="menu-item-desc">gehackte Kichererbsen mit Tahini &amp; Salz, Dönerfleisch</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">105</span>Mutabal</span><span class="menu-item-price">5,50 €</span></div><p class="menu-item-desc">gehackte gegrillte Aubergine mit Tahini, Joghurt &amp; Knoblauch</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">106</span>Falafel Rolle</span><span class="menu-item-price">6,50 €</span></div><p class="menu-item-desc">püriertes Kichererbsen, Gewürze, Hummus, Salat &amp; Tahinisauce</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">107</span>Falafel Teller</span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">püriertes Kichererbsen, Gewürze, Hummus, Salat, Tahinisauce, Pommes, Fladenbrot</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">108</span>Halloumi Teller</span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">Halloumi, Salat, Pommes, Fladenbrot</p></div>
      </div>

      <div class="menu-panel" id="baguettes">
        <h3>Baguettes mit Remoulade</h3>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">113</span>Salami Baguette</span><span class="menu-item-price">6,50 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">114</span>Schinken</span><span class="menu-item-price">6,50 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">115</span>Hawaii</span><span class="menu-item-price">7,00 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">116</span>Dönerfleisch</span><span class="menu-item-price">7,50 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">117</span>Tunfisch</span><span class="menu-item-price">7,00 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">118</span>Mozzarella</span><span class="menu-item-price">7,00 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">119</span>Wunsch Baguette</span><span class="menu-item-price">8,00 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">120</span>Crispy Baguette<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">Hähnchenbrustfilet, Knoblauchpaste, Coleslaw, Käse, Pommes</p></div>
      </div>

      <div class="menu-panel" id="salate">
        <h3>Salate</h3>
        <p class="category-note">Basis: Gurken, Tomaten, Zwiebeln, Eisbergsalat, Weiß-/Rotkraut</p>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">125</span>Gemischter Salat</span><span class="menu-item-price">8,00 €</span></div><p class="menu-item-desc">Feta, Mais</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">126</span>Rucola</span><span class="menu-item-price">8,00 €</span></div><p class="menu-item-desc">Mozzarella mit Rucola</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">127</span>Chef</span><span class="menu-item-price">9,50 €</span></div><p class="menu-item-desc">Dönerfleisch, Feta, Ei</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">128</span>Hawaii</span><span class="menu-item-price">8,00 €</span></div><p class="menu-item-desc">Ananas, Schinken</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">129</span>Chicken</span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">Hähnchenstreifen, Ananas</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">130</span>Capri</span><span class="menu-item-price">8,00 €</span></div><p class="menu-item-desc">Schinken, Pizzakäse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">131</span>Stars Döner</span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">Dönerfleisch</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">132</span>Veggi</span><span class="menu-item-price">8,00 €</span></div><p class="menu-item-desc">Halloumi, Falafel</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">133</span>Scampis</span><span class="menu-item-price">9,00 €</span></div><p class="menu-item-desc">Garnelen, Oliven</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">134</span>Tonno</span><span class="menu-item-price">8,50 €</span></div><p class="menu-item-desc">Tunfisch, Oliven</p></div>
      </div>

      <div class="menu-panel" id="snacks">
        <h3>Snacks</h3>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">138</span>Portion Pommes</span><span class="menu-item-price">5,00 €</span></div><p class="menu-item-desc">Ketchup &amp; Mayo</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">139</span>Portion Potatos</span><span class="menu-item-price">5,50 €</span></div><p class="menu-item-desc">Ketchup &amp; Mayo</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">140</span>Currywurst</span><span class="menu-item-price">5,50 €</span></div><p class="menu-item-desc">mit Curry Ketchup (mild oder scharf)</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">141</span>Chicken Wings</span><span class="menu-item-price">8,00 € (8 St.) / 9,50 € (12 St.)</span></div><p class="menu-item-desc">mit Pommes, Dip nach Wahl</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">142</span>Chicken Nuggets</span><span class="menu-item-price">6,50 € / 8,50 €</span></div><p class="menu-item-desc">mit Pommes, Dip nach Wahl</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">143</span>Chili Cheese</span><span class="menu-item-price">7,00 €</span></div><p class="menu-item-desc">mit Pommes, Dip nach Wahl</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">144</span>Currywurst Menü</span><span class="menu-item-price">10,00 €</span></div><p class="menu-item-desc">mit Pommes oder Potatos, Curry Ketchup und Getränk</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">145</span>Überraschung Kids Box</span><span class="menu-item-price">8,50 €</span></div><p class="menu-item-desc">mit 6 Chicken Nuggets, Pommes und Getränk</p></div>
      </div>

      <div class="menu-panel" id="burger">
        <h3>Burger</h3>
        <p class="category-note">Alle Burger (außer Nr. 151) auch als Menü erhältlich: +3,00 € (mit Getränk und Pommes oder Potatos)</p>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">150</span>Crispy Burger<span class="menu-item-tag">NEU</span></span><span class="menu-item-price">9,50 €</span></div><p class="menu-item-desc">mit Salat, Zwiebeln, Tomaten, eingelegte Gurken, Remoulade, Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">151</span>Hamburger</span><span class="menu-item-price">7,00 €</span></div><p class="menu-item-desc">mit Salat, Zwiebeln, Tomaten, eingelegte Gurken, Grillsauce</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">152</span>Cheeseburger</span><span class="menu-item-price">7,50 €</span></div><p class="menu-item-desc">mit Salat, Zwiebeln, Tomaten, eingelegte Gurken, Grillsauce &amp; Käse</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">153</span>Burger Hot Jalapenos</span><span class="menu-item-price">7,50 €</span></div><p class="menu-item-desc">mit Salat, Zwiebeln, Tomaten, eingelegte Gurken, Grillsauce &amp; Jalapeños</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">154</span>Burger Bacon</span><span class="menu-item-price">8,50 €</span></div><p class="menu-item-desc">mit Salat, Zwiebeln, Tomaten, eingelegte Gurken, BBQ Sauce</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">155</span>Chicken Burger</span><span class="menu-item-price">8,50 €</span></div><p class="menu-item-desc">mit Salat, Zwiebeln, Tomaten, eingelegte Gurken, Remoulade</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">156</span>Sucuk Burger</span><span class="menu-item-price">8,50 €</span></div><p class="menu-item-desc">mit Salat, Zwiebeln, Tomaten, eingelegte Gurken, Grillsauce</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">157</span>XL Burger Doppelt Fleisch</span><span class="menu-item-price">10,00 €</span></div><p class="menu-item-desc">mit Salat, Zwiebeln, Tomaten, eingelegte Gurken, Grillsauce</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">158</span>Burger Spezial</span><span class="menu-item-price">8,50 €</span></div><p class="menu-item-desc">mit Salat, Zwiebeln, Tomaten, Gurken, Grillsauce &amp; Halloumi oder Feta</p></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name"><span class="menu-item-no">159</span>Stars Burger Menü</span><span class="menu-item-price">12,00 €</span></div><p class="menu-item-desc">Burger, Getränk, Pommes oder Potatos</p></div>
      </div>

      <div class="menu-panel" id="getraenke">
        <h3>Getränke</h3>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name">Fanta, Coca Cola, Sprite (0,33 l)</span><span class="menu-item-price">2,50 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name">Eistee</span><span class="menu-item-price">2,50 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name">Ayran</span><span class="menu-item-price">2,50 €</span></div></div>
        <div class="menu-item"><div class="menu-item-head"><span class="menu-item-name">Fanta, Sprite, Cola (1,0 l)</span><span class="menu-item-price">3,50 €</span></div></div>
      </div>

    </div>

    <p class="menu-allergen-note">Allergene und Zusatzstoffe – bitte im Laden erfragen.</p>
  </div>
</section>
```

- [ ] **Step 5: Prüfe, dass die Menüpunkte jetzt vorhanden sind**

Run: `grep -o "menu-item\"" index.html | wc -l`
Expected: eine Zahl ≥ 100 (jeder `<div class="menu-item">` zählt)

Run: `grep -c "menu-panel\"" index.html`
Expected: `11` (elf Kategorien, jede mit `class="menu-panel"` bzw. `class="menu-panel active"`; passe die grep-Pattern ggf. an, falls `active` mitgezählt werden soll — prüfe mit `grep -c "id=\"[a-z-]*\" class=\"menu-panel"` falls nötig)

- [ ] **Step 6: Im Browser visuell prüfen**

Lade `index.html` neu, scrolle zu `#speisekarte`. Der "Döner"-Tab muss aktiv/gold hervorgehoben sein und die 7 Döner-Gerichte mit Preisen zeigen. Andere Panels sind noch unsichtbar (JS-Filter folgt in Task 3), das ist an dieser Stelle korrekt.

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add full menu with all categories and prices"
```

---

### Task 3: Menü-Tab-Filter (JavaScript)

**Files:**
- Modify: `js/script.js`

**Interfaces:**
- Consumes: `.tab-btn[data-target]` und `.menu-panel[id]` aus Task 2

- [ ] **Step 1: Prüf-Assertion schreiben**

```bash
cd "C:/Users/rober/Desktop/shawarma-stars"
grep -c "addEventListener('click'" js/script.js
```

- [ ] **Step 2: Prüfe, dass es fehlschlägt**

Run: `grep -c "addEventListener('click'" js/script.js`
Expected: `0`

- [ ] **Step 3: Tab-Filter-Logik implementieren**

```javascript
// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  initMenuTabs();
});

function initMenuTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.menu-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === targetId);
      });
    });
  });
}
```

- [ ] **Step 4: Prüfe, dass es jetzt passt**

Run: `grep -c "addEventListener('click'" js/script.js`
Expected: `1`

- [ ] **Step 5: Im Browser interaktiv prüfen**

Im Browser-Tool: Klicke auf den Tab "Pizza" — Panel `#pizza` muss sichtbar werden, `#doener` muss verschwinden, der "Pizza"-Button muss gold hervorgehoben sein. Klicke auf "Getränke" — nur die 4 Getränke dürfen sichtbar sein.

- [ ] **Step 6: Commit**

```bash
git add js/script.js
git commit -m "feat: add menu category tab filtering"
```

---

### Task 4: Öffnungszeiten, Lieferzeiten &amp; Mindestbestellwert

**Files:**
- Modify: `index.html` (neue Section `#oeffnungszeiten` zwischen `#speisekarte` und `#kontakt`/`<footer>` einfügen)
- Modify: `css/style.css` (Styles für `.hours` anhängen)

**Interfaces:**
- Consumes: `.container`, `.gold-divider`, CSS-Variablen aus Task 1

- [ ] **Step 1: Prüf-Assertion schreiben**

```bash
cd "C:/Users/rober/Desktop/shawarma-stars"
grep -c "id=\"oeffnungszeiten\"" index.html
```

- [ ] **Step 2: Prüfe, dass es fehlschlägt**

Run: `grep -c "id=\"oeffnungszeiten\"" index.html`
Expected: `0`

- [ ] **Step 3: CSS für die Öffnungszeiten-Section anhängen**

```css
/* Hours */
.hours { padding: 4rem 0; }
.hours h2 { text-align: center; margin-bottom: 0.5rem; }
.hours-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}
.hours-card {
  background: var(--bg-alt);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 12px;
  padding: 1.5rem;
}
.hours-card h3 { font-size: 1.1rem; margin-bottom: 1rem; }
.hours-card dl { display: grid; grid-template-columns: auto 1fr; gap: 0.4rem 1rem; }
.hours-card dt { color: var(--text-dim); }
.hours-card dd { text-align: right; font-weight: 600; }
.hours-card .closed { color: #c96a6a; }

.min-order {
  margin-top: 2rem;
  background: var(--bg-alt);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 12px;
  padding: 1.5rem;
}
.min-order h3 { font-size: 1.1rem; margin-bottom: 0.75rem; }
.min-order ul { list-style: none; color: var(--text-dim); }
.min-order li { padding: 0.25rem 0; }
.min-order strong { color: var(--gold-light); }

@media (max-width: 700px) {
  .hours-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: `#oeffnungszeiten`-Section in `index.html` einfügen (nach `</section>` von `#speisekarte`, vor `<footer>`)**

```html
<section id="oeffnungszeiten" class="hours">
  <div class="container">
    <h2>Öffnungszeiten &amp; Lieferzeiten</h2>
    <hr class="gold-divider">
    <div class="hours-grid">
      <div class="hours-card">
        <h3>Abholung</h3>
        <dl>
          <dt>Mo, Di, Do, Fr, Sa</dt><dd>11:30–14:00 &amp; 17:00–21:00 Uhr</dd>
          <dt>Mittwoch</dt><dd class="closed">Ruhetag</dd>
          <dt>Sonntag</dt><dd>15:00–21:00 Uhr</dd>
        </dl>
      </div>
      <div class="hours-card">
        <h3>Lieferung</h3>
        <dl>
          <dt>Mo, Di, Do</dt><dd>11:30–14:00 &amp; 17:00–21:00 Uhr</dd>
          <dt>Fr, Sa</dt><dd>11:30–14:00 &amp; 17:00–21:00 Uhr</dd>
          <dt>Mittwoch</dt><dd class="closed">Ruhetag</dd>
          <dt>Sonntag</dt><dd>17:00–21:00 Uhr</dd>
        </dl>
      </div>
    </div>
    <div class="min-order">
      <h3>Mindestbestellwert (Lieferung)</h3>
      <ul>
        <li>Stadtgebiet Bad Berka: ab <strong>20 €</strong> zzgl. 1,50 € Lieferkosten</li>
        <li>bis Umkreis 7 km: ab <strong>35 €</strong> zzgl. 2,00 € Lieferkosten</li>
        <li>bis Umkreis 10 km: ab <strong>50 €</strong> zzgl. 3,50 € Lieferkosten</li>
        <li>Bei Bestellwert ab 50 €: <strong>1 Liter Getränk der Wahl kostenlos</strong></li>
      </ul>
      <p style="margin-top:1rem; color: var(--text-dim);">Wir nehmen gerne Bestellungen für Gruppen &amp; Partys an — <a href="tel:036458633217">ruft uns einfach an</a>.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Prüfe, dass es jetzt passt**

Run: `grep -c "id=\"oeffnungszeiten\"" index.html`
Expected: `1`

- [ ] **Step 6: Im Browser visuell prüfen**

Scrolle zu `#oeffnungszeiten`: zwei Karten (Abholung/Lieferung) nebeneinander, Mittwoch rötlich als "Ruhetag" markiert, darunter die Mindestbestellwert-Box.

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add opening hours, delivery times and minimum order section"
```

---

### Task 5: Kontakt-Section mit Karte

**Files:**
- Modify: `index.html` (neue Section `#kontakt` zwischen `#oeffnungszeiten` und `<footer>` einfügen)
- Modify: `css/style.css` (Styles für `.contact` anhängen)

**Interfaces:**
- Consumes: `.container`, `.btn`, `.gold-divider`, CSS-Variablen aus Task 1

- [ ] **Step 1: Prüf-Assertion schreiben**

```bash
cd "C:/Users/rober/Desktop/shawarma-stars"
grep -c "id=\"kontakt\"" index.html
```

- [ ] **Step 2: Prüfe, dass es fehlschlägt**

Run: `grep -c "id=\"kontakt\"" index.html`
Expected: `0`

- [ ] **Step 3: CSS für die Kontakt-Section anhängen**

```css
/* Contact */
.contact { padding: 4rem 0; background: var(--bg-alt); }
.contact h2 { text-align: center; margin-bottom: 0.5rem; }
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  align-items: stretch;
}
.contact-info {
  background: var(--bg);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 12px;
  padding: 1.5rem;
}
.contact-info p { margin-bottom: 0.75rem; color: var(--text-dim); }
.contact-info a { color: var(--gold-light); font-weight: 600; }
.contact-actions { display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; }
.map-embed { border-radius: 12px; overflow: hidden; border: 1px solid rgba(212, 175, 55, 0.25); min-height: 300px; }
.map-embed iframe { width: 100%; height: 100%; min-height: 300px; border: 0; }

@media (max-width: 700px) {
  .contact-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: `#kontakt`-Section in `index.html` einfügen (nach `</section>` von `#oeffnungszeiten`, vor `<footer>`)**

```html
<section id="kontakt" class="contact">
  <div class="container">
    <h2>Kontakt &amp; Anfahrt</h2>
    <hr class="gold-divider">
    <div class="contact-grid">
      <div class="contact-info">
        <p><strong style="color: var(--gold-light);">Adresse</strong><br>Bahnhof Str. 3<br>99438 Bad Berka</p>
        <p><strong style="color: var(--gold-light);">Telefon</strong><br><a href="tel:036458633217">036458 / 633 217</a><br><a href="tel:036458633216">036458 / 633 216</a></p>
        <p>Wir sind bereit, Bestellungen für Gruppen &amp; Partys anzunehmen &amp; zu erfüllen.</p>
        <div class="contact-actions">
          <a class="btn btn-primary" href="tel:036458633217">📞 Jetzt anrufen</a>
          <a class="btn btn-secondary" href="https://www.google.com/maps/dir/?api=1&destination=Bahnhof+Str.+3+99438+Bad+Berka" target="_blank" rel="noopener">📍 Route planen</a>
        </div>
      </div>
      <div class="map-embed">
        <iframe title="Standort STARS Pizza & Döner Bad Berka" src="https://www.google.com/maps?q=Bahnhof+Str.+3,+99438+Bad+Berka&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Prüfe, dass es jetzt passt**

Run: `grep -c "id=\"kontakt\"" index.html`
Expected: `1`

Run: `grep -c "google.com/maps" index.html`
Expected: eine Zahl ≥ 3 (Hero-Route-Link, Kontakt-Route-Link, Karten-Embed)

- [ ] **Step 6: Im Browser visuell prüfen**

Scrolle zu `#kontakt`: Adresse/Telefon links, eingebettete Google-Maps-Karte rechts, "Jetzt anrufen"- und "Route planen"-Buttons sichtbar und klickbar.

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add contact section with embedded map"
```

---

### Task 6: Mobiles Hamburger-Menü &amp; Sticky-Header-Schatten

**Files:**
- Modify: `js/script.js` (Funktionen `initMobileNav` und `initStickyHeader` ergänzen)
- Modify: `css/style.css` (Responsive-Styles für `#main-nav` unter 768px, `.scrolled`-Klasse für Header)

**Interfaces:**
- Consumes: `#nav-toggle`, `#main-nav` aus Task 1

- [ ] **Step 1: Prüf-Assertion schreiben**

```bash
cd "C:/Users/rober/Desktop/shawarma-stars"
grep -c "nav-open" css/style.css
```

- [ ] **Step 2: Prüfe, dass es fehlschlägt**

Run: `grep -c "nav-open" css/style.css`
Expected: `0`

- [ ] **Step 3: Responsive CSS für Hamburger-Nav und Sticky-Header-Schatten anhängen**

```css
/* Sticky header shadow */
#top.scrolled { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); }

/* Mobile nav */
@media (max-width: 768px) {
  #main-nav {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--bg);
    border-bottom: 1px solid rgba(212, 175, 55, 0.25);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
  }
  #main-nav.nav-open { max-height: 300px; }
  #main-nav ul {
    flex-direction: column;
    padding: 1rem 1.25rem;
    gap: 1rem;
  }
  #nav-toggle { display: inline-block; }
  .header-inner .btn-primary { display: none; }
}
```

- [ ] **Step 4: JS-Verhalten für Hamburger-Nav und Sticky-Header ergänzen**

```javascript
// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  initMenuTabs();
  initMobileNav();
  initStickyHeader();
});

function initMenuTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.menu-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === targetId);
      });
    });
  });
}

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initStickyHeader() {
  const header = document.getElementById('top');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
}
```

- [ ] **Step 5: Prüfe, dass es jetzt passt**

Run: `grep -c "nav-open" css/style.css`
Expected: eine Zahl ≥ 1

Run: `grep -c "initMobileNav" js/script.js`
Expected: eine Zahl ≥ 2

- [ ] **Step 6: Im Browser responsiv prüfen**

Im Browser-Tool `resize_window` auf `mobile`-Preset stellen, Seite neu laden: Nav-Links sind versteckt, Hamburger-Button (☰) sichtbar. Klick auf den Button öffnet die Nav-Liste; Klick auf einen Link schließt sie wieder. Danach `resize_window` zurück auf `desktop` stellen und beim Scrollen prüfen, dass der Header einen Schatten bekommt.

- [ ] **Step 7: Commit**

```bash
git add js/script.js css/style.css
git commit -m "feat: add mobile hamburger nav and sticky header shadow"
```

---

### Task 7: Deployment auf GitHub Pages

**Files:**
- Keine neuen Dateien; nur Git-Operationen im bestehenden Repo (Remote `origin` wurde bereits in der Brainstorming-Phase gesetzt).

**Interfaces:**
- Consumes: alle vorherigen Tasks (fertige `index.html`, `css/style.css`, `js/script.js`)

- [ ] **Step 1: Repo-Status und Remote prüfen**

```bash
cd "C:/Users/rober/Desktop/shawarma-stars"
git remote -v
git status
```

Expected: `origin` zeigt auf `https://github.com/JustinPriem/shawarma-stars.de.git`, Working Tree ist bis auf evtl. offene Änderungen sauber (alle vorherigen Tasks committed).

- [ ] **Step 2: Alle offenen Änderungen committen (falls vorhanden)**

```bash
git add -A
git status
```

Falls Änderungen vorhanden: `git commit -m "chore: final polish before deploy"`. Falls keine Änderungen: diesen Schritt überspringen.

- [ ] **Step 3: Auf GitHub pushen**

```bash
git push -u origin main
```

Expected: Push erfolgreich. Falls Authentifizierung fehlschlägt (kein gh-CLI/Credential-Helper verfügbar), den Nutzer bitten, `git push -u origin main` selbst im Terminal auszuführen (Windows Credential Manager fragt dann nach GitHub-Login).

- [ ] **Step 4: GitHub Pages aktivieren (einmalig, durch den Nutzer)**

Im Browser zu `https://github.com/JustinPriem/shawarma-stars.de/settings/pages` navigieren (Browser-Tool). Prüfen, ob unter "Build and deployment" bereits "Deploy from a branch" mit Branch `main` / Ordner `/ (root)` eingestellt ist. Falls nicht: den Nutzer bitten, dies einmalig selbst zu bestätigen (Repo-Settings ändern ist ein irreversibler, außenwirksamer Schritt, den der Nutzer freigeben muss).

- [ ] **Step 5: Live-Seite prüfen**

Sobald Pages aktiv ist (kann 1–2 Minuten dauern): Browser-Tool zu `https://justinpriem.github.io/shawarma-stars.de/` navigieren (oder zur im Repo hinterlegten Custom Domain, falls vorhanden) und per Screenshot/`get_page_text` bestätigen, dass Hero, Speisekarte, Öffnungszeiten und Kontakt korrekt angezeigt werden.

- [ ] **Step 6: Commit (falls in Step 4/5 noch Dateien angepasst wurden, z. B. `CNAME`)**

```bash
git add -A
git commit -m "chore: finalize deployment configuration" --allow-empty
git push
```

---

## Self-Review Notes

- **Spec-Abdeckung:** Header/Nav ✅ (Task 1), Hero ✅ (Task 1), alle 11 Speisekarten-Kategorien mit vollständigen Preisen ✅ (Task 2), Tab-Filter ✅ (Task 3), Öffnungszeiten/Lieferzeiten/Mindestbestellwert ✅ (Task 4), Kontakt/Karte ✅ (Task 5), Responsive/Hamburger-Nav ✅ (Task 6), Deployment ✅ (Task 7). Kein Online-Bestellsystem, keine abgelaufene Rabattaktion — wie in der Spec gefordert, nicht enthalten.
- **Platzhalter-Scan:** Keine TBD/TODO-Marker; alle Codeblöcke enthalten vollständigen, direkt einsetzbaren Inhalt.
- **Typkonsistenz:** Funktionsnamen `initMenuTabs`, `initMobileNav`, `initStickyHeader` sind in Task 3 und Task 6 identisch verwendet; Kategorie-IDs aus Task 2 (`doener`, `duerum-lahmacun`, …) stimmen mit den `data-target`-Werten der Tabs überein.
