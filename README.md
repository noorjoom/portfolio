# Noor Joomratty — Portfolio

Personal portfolio website built with vanilla HTML, CSS, and JavaScript. Hosted on GitHub Pages.

Live site: [noorjoom.github.io](https://noorjoom.github.io/)

## Tech Stack

- HTML5 (semantic, accessible)
- CSS3 (custom properties, Grid, Flexbox, animations)
- JavaScript (ES modules, no frameworks)
- Fonts: Syne + JetBrains Mono via Google Fonts

## Features

- Dark/light theme toggle with localStorage persistence
- Typing animation on hero section
- Sticky header with scroll-shrink effect
- Mobile hamburger navigation
- Animated skill bars
- Timeline layout for experience and education
- Contact form (Formspree)
- Interactive background glow following mouse
- Scroll progress bar and scroll-to-top button
- Fully accessible (skip nav, focus styles, ARIA labels)
- SEO: JSON-LD Person schema, Open Graph, sitemap

## Local Development

No build step required for development. Just open `index.html` in a browser.

```bash
git clone https://github.com/noorjoom/portfolio.git
cd portfolio
# Open index.html in your browser
```

For a local server (recommended to avoid CORS issues with ES modules):

```bash
npx serve .
# or
python -m http.server 8080
```

## Production Build

Minifies JS (bundled) and CSS into `dist/`:

```bash
npm install
npm run build
```

Output files: `dist/main.min.js`, `dist/styles.min.css`

## Project Structure

```
portfolio/
├── index.html          # Main page
├── styles.css          # All styles
├── js/
│   ├── main.js         # Entry point (ES module)
│   ├── typing.js       # Typing animation
│   ├── scroll.js       # Scroll observers + smooth scroll
│   ├── header.js       # Sticky header
│   ├── nav.js          # Mobile hamburger menu
│   ├── theme.js        # Dark/light theme toggle
│   ├── progress.js     # Scroll progress bar
│   ├── scroll-top.js   # Scroll-to-top button
│   ├── skills.js       # Animated skill bars
│   ├── background.js   # Mouse-follow glow effect
│   └── contact.js      # Contact form (Formspree)
├── assets/
│   ├── phone.svg
│   └── cv-noor-joomratty.pdf
├── favicon.svg
├── manifest.json
├── sitemap.xml
├── robots.txt
└── package.json
```

## Deployment

Deployed automatically via GitHub Pages from the `main` branch.
