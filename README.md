# Portfolio

A static personal website with no build step and no package dependencies. Open the repository with VS Code Live Server (or any static HTTP server) and edit the source directly.

## Project structure

```text
.
|-- index.html                    # Homepage shell
|-- projects.html                 # Projects page shell
|-- projects/
|   |-- thermal-control/index.html    # SPOT thermal-control case study
|   |-- mats-seu/index.html           # MATS radiation case study
|   |-- mats-orbit/index.html         # MATS orbital analysis case study
|   |-- leaky-wave-antenna/index.html # Antenna case study
|   `-- overview/index.html           # Shared template selected by ?id=
|-- showcase.html                 # Interactive showcase, gallery, and aviation logbook
|-- 404.html                      # Not-found page
|-- content/
|   |-- profile.js                # Bio, links, skills, education, and experience
|   |-- project-case-studies.js   # Report-led case-study copy
|   |-- project-case-studies-extra.js
|   |-- project-overviews.js      # Brief fallback when source material is unavailable
|   `-- projects/
|       |-- index.js              # Project registry
|       |-- 2024/                 # One consistently named file per project
|       |-- 2023/
|       |-- 2022/
|       |-- 2021/
|       `-- 2020/
`-- assets/
    |-- css/
    |   `-- global.css            # Shared styles
    |-- images/                   # Photos, covers, and report figures
    |-- reports/                  # Downloadable reports
    `-- js/
        |-- components.js         # Shared page components
        |-- site.js               # Shared interactive behavior
        `-- pages/
            |-- home.js           # Homepage composition
            |-- projects.js       # Projects page composition
            |-- side-quests.js    # Showcase page composition
            `-- not-found.js      # 404 page composition
```

## Editing content

- Update bio, contact links, technical skills, education, experience, and personal details in `content/profile.js`.
- Add screenshots or clips to `profile.personal.highlights` in `content/profile.js`. Each item needs `type` (`image` or `video`) and `src`; add `alt` for images, and optionally `caption`, `poster`, or `captions` for video.
- Add remembered or planned flights to `profile.personal.aviation.routes` in `content/profile.js`. Each route records its airports, airline identity, approximate date, and any known flight numbers or directional connections.
- The aviation map uses a web-simplified version of the public-domain Natural Earth 1:10m Admin 0 country boundaries from the India point of view, stored in `assets/images/maps/world-countries.svg`.
- The SpiceJet logo asset is from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:New_SpiceJet_Logo.png), credited to SpiceJet and licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Add each project under `content/projects/<year>/` using the filename format `YYYY-MM-DD-project-name.js`, then register it in `content/projects/index.js`.
- Add a sourced case-study record under `content/project-case-studies*.js` for any new project linked to `projects/overview/?id=<id>`.
- Dedicated project pages live in `projects/<slug>/index.html`. Keep their `<base href="../../">` so shared assets and navigation resolve from the site root.
- Change shared presentation in `assets/css/global.css` and `assets/js/components.js`.

## Local preview

In VS Code, open `index.html` and choose **Open with Live Server**. No Ruby, Jekyll, Node.js, or dependency installation is required.

## Deployment

GitHub Pages can serve the repository directly from the branch root. The `.nojekyll` file disables Jekyll processing. The old root-level project URLs remain as redirects for existing links.
