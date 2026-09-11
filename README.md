# sriharshakb.github.io

Personal portfolio / professional site for Sri Harsha Korukonda Bhattar — Senior Cloud Engineer.

Static site (plain HTML/CSS/JS, no build step, no framework) deployed via GitHub Pages at
**https://sriharshakb.github.io**.

## Structure

```
.
├── index.html          # single-page site: hero, about, experience, skills, impact, why-me, certs, contact
├── css/style.css        # all styling — dark, cloud/tech themed
├── js/main.js            # nav highlighting, typing effect, tabs, accordion, count-up stats, particle canvas
└── assets/
    ├── harsha.jpg        # profile photo
    └── favicon.svg
```

## Local preview

No build tooling required — just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy

Push to the `main` branch of this repo (named `sriharshakb.github.io` for GitHub's
default user-site hosting). Enable Pages in the repo settings
(Settings → Pages → Source: `main` branch, `/root`) — GitHub serves it at
https://sriharshakb.github.io automatically, no build action needed, no custom
domain required.

## Contact

No email or phone number is published on the site by design — reach out via
[LinkedIn](https://www.linkedin.com/in/sri-harsha-kb) or [GitHub](https://github.com/sriharshakb).
