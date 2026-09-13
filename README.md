# Faizan Asif — Personal Portfolio

A 5-page static website (HTML, CSS, JavaScript only — no backend/framework), built for the Front-End Web Development assignment.

## Pages
- `index.html` — Home
- `about.html` — About
- `projects.html` — Projects (with filter + modal)
- `skills.html` — Skills (with animated bars + accordion)
- `contact.html` — Contact (with validated form + map)

## Folder structure
```
portfolio/
├── index.html
├── about.html
├── projects.html
├── skills.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── about-photo.png   ← replace this with your real photo (same filename)
```

## Replacing the photo
Just drop your real photo into `images/` and name it exactly `about-photo.png`, overwriting the placeholder. Nothing in the code needs to change.

## Pushing to GitHub with proper branches

```bash
# 1. Initialize the repo (run this inside the portfolio/ folder)
git init
git add .
git commit -m "Initial project structure and home page"
git branch -M main
git remote add origin https://github.com/faizan216/portfolio.git
git push -u origin main

# 2. Create a feature branch per page/feature, e.g.:
git checkout -b feature-navbar
# ...work on the nav / hamburger menu...
git add .
git commit -m "Add responsive navbar with hamburger menu"
git checkout main
git merge feature-navbar
git push

git checkout -b feature-contact-form
# ...work on the contact page/validation...
git add .
git commit -m "Add contact form with JS validation"
git checkout main
git merge feature-contact-form
git push

git checkout -b feature-projects-filter
# ...work on projects.html filter + modal...
git add .
git commit -m "Add project filtering and detail modal"
git checkout main
git merge feature-projects-filter
git push
```

Repeat this pattern (branch → commit → merge → push) for each distinct feature so your commit history actually shows incremental, meaningful progress — this is what the instructor is checking for.

See `VIVA-GUIDE.md` for a walkthrough of every technical decision, ready for the viva.
