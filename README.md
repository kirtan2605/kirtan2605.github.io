# Portfolio

A static personal website with no build step and no package dependencies. Open the repository with VS Code Live Server (or any static HTTP server) and edit the source directly.

## Project structure

```text
.
|-- index.html                    # Homepage shell
|-- projects.html                 # Projects page shell
|-- project.html                  # Report-led case studies selected by ?id=
|-- thermal-control.html          # SPOT thermal-control case study
|-- mats-seu.html                 # MATS radiation case study
|-- mats-orbit.html               # MATS orbital analysis case study
|-- leaky-wave-antenna.html       # Antenna case study
|-- showcase.html                 # Showcase page shell
|-- 404.html                      # Not-found page
|-- content/
|   |-- profile.js                # Bio, links, education, and experience
|   |-- project-case-studies.js   # Report-led case-study copy
|   |-- project-case-studies-extra.js
|   |-- project-overviews.js      # Brief fallback when source material is unavailable
|   |-- showcase.js               # Showcase groups and cards
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
            |-- showcase.js       # Showcase page composition
            `-- not-found.js      # 404 page composition
```

## Editing content

- Update personal details in `content/profile.js`.
- Add each project under `content/projects/<year>/` using the filename format `YYYY-MM-DD-project-name.js`, then register it in `content/projects/index.js`.
- Add a sourced case-study record under `content/project-case-studies*.js` for any new project linked to `project.html?id=<id>`.
- Add or edit showcase cards in `content/showcase.js`.
- Change shared presentation in `assets/css/global.css` and `assets/js/components.js`.

## Local preview

In VS Code, open `index.html` and choose **Open with Live Server**. No Ruby, Jekyll, Node.js, or dependency installation is required.

## Deployment

GitHub Pages can serve the repository directly from the branch root. Because every page is already static, no Jekyll build is needed.
