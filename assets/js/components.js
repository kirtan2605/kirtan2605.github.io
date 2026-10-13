import { profile, site } from "../../content/profile.js";

const externalLinkAttributes = `target="_blank" rel="noopener noreferrer"`;

export function renderShell(activePage) {
    const header = document.querySelector("[data-site-header]");

    if (header) {
        header.innerHTML = `
            <nav class="navbar navbar-expand-sm navbar-light bg-light fixed-top mb-5 shadow-sm" aria-label="Primary navigation">
                <div class="container">
                    <a class="navbar-brand" href="index.html"><strong>${site.name}</strong></a>
                    <button class="navbar-toggler" type="button" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" data-nav-toggle>
                        <i class="fas fa-map" aria-hidden="true"></i> Menu
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive" data-nav-menu>
                        <ul class="navbar-nav ml-auto">
                            ${site.navigation.map((item) => `
                                <li class="nav-item${item.page === activePage ? " active" : ""}">
                                    <a class="nav-link" href="${item.href}"${item.page === activePage ? ' aria-current="page"' : ""}>${item.label}</a>
                                </li>`).join("")}
                        </ul>
                    </div>
                </div>
            </nav>`;
    }

    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    toggle?.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("show");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
}

export function renderProfile() {
    return `
        <section class="row" aria-labelledby="profile-name">
            <div class="col">
                <div class="card border-0 shadow-sm bg-white">
                    <div class="card-body p-4">
                        <div class="row">
                            <div class="col">
                                <figure class="float-right ml-4 mb-0 d-none d-md-block">
                                    <img src="${profile.portrait}" class="figure-img img-fluid img-thumbnail profile-portrait" alt="Portrait of ${profile.name}">
                                </figure>
                                <div class="d-flex">
                                    <h1 id="profile-name" class="font-weight-normal">${profile.name}</h1>
                                    <div class="ml-auto d-md-none">
                                        <a href="${profile.portrait}" ${externalLinkAttributes}>
                                            <img src="${profile.portrait}" class="rounded-circle profile-avatar" alt="Portrait of ${profile.name}">
                                        </a>
                                    </div>
                                </div>
                                ${profile.positions.length ? `<div class="text-profile-position">${profile.positions.map((position) => `<img src="${position.logo}" alt="" class="inline-badge"> ${position.name}<br>`).join("")}</div>` : ""}
                                <div class="text-profile-bio mt-3">${profile.bio.map((paragraph) => `<p>${paragraph}</p>`).join("")}</div>
                            </div>
                        </div>
                        <hr class="profile-divider">
                        <div class="row"><div class="col profile-links">
                            <a class="pr-3 no-break" href="mailto:${profile.contact.email}"><i class="fas fa-at" aria-hidden="true"></i> <span class="email-text">${profile.contact.email.replace("@", "(at)")}</span></a>
                            <a class="pr-3 no-break" href="${profile.contact.github}" ${externalLinkAttributes}><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>
                            <a class="pr-3 no-break" href="${profile.contact.linkedin}" ${externalLinkAttributes}><i class="fab fa-linkedin" aria-hidden="true"></i> LinkedIn</a>
                            <a class="pr-3 no-break" href="${profile.contact.orcid}" ${externalLinkAttributes}><i class="fab fa-orcid" aria-hidden="true"></i> ORCID</a>
                        </div></div>
                    </div>
                </div>
            </div>
        </section>`;
}

function renderTimeline(items) {
    return items.map((item) => `
        <li class="career-entry">
            <span class="career-logo-slot"><img src="${item.logo}" alt="" class="career-logo${item.name === "University of Twente" ? " career-logo-wide" : ""}"></span>
            <div class="career-entry-body">
                <div class="career-details">
                    <div class="career-institution">
                        <div class="career-organization">${item.name}</div>
                    </div>
                    <div class="career-location"><img src="assets/images/flags/${item.flag}.svg" alt="" class="career-flag">${item.location}</div>
                    ${item.fullName ? `<div class="career-full-name">${item.fullName}</div>` : ""}
                    <div class="career-position">${item.position}</div>
                    <time class="career-date">${item.date}</time>
                </div>
                ${item.focus ? `<div class="career-focus">Focus: ${item.focus}</div>` : ""}
                ${item.department ? `<div class="career-department">${item.department}</div>` : ""}
            </div>
        </li>`).join("");
}

export function renderExperience() {
    return `
        <section class="row mt-3 career-overview" aria-label="Education, experience, and honours">
            <div class="col-12 mb-3">
                <div class="card border-0 shadow-sm bg-white">
                    <div class="card-body p-4">
                        <div class="career-columns">
                            <div class="career-column">
                                <h2 class="h5 career-title">Education</h2>
                                <ul class="list-unstyled mb-0">${renderTimeline(profile.education)}</ul>
                            </div>
                            <div class="career-column">
                                <h2 class="h5 career-title">Experience</h2>
                                <ul class="list-unstyled mb-0">${renderTimeline(profile.experience)}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card border-0 shadow-sm bg-white">
                    <div class="card-body p-4">
                        <h2 class="h5 career-title">Honours &amp; Awards</h2>
                        <ul class="career-awards">${profile.awards.map((award) => `
                            <li>
                                <div class="career-award-heading"><strong>${award.name}</strong><time>${award.date}</time></div>
                                <p>${award.description}</p>
                            </li>`).join("")}
                        </ul>
                    </div>
                </div>
            </div>
        </section>`;
}

export function renderSideQuestsTeaser() {
    return `
        <section class="row mt-3" aria-label="Beyond work">
            <div class="col-12">
                <p class="home-side-quests">Beyond work: ${profile.personal.games.map((game) => game.name).join(", ")}. <a href="side-quests.html">Side-Quests <i class="fas fa-arrow-right" aria-hidden="true"></i></a></p>
            </div>
        </section>`;
}

function renderProjectDetails(project) {
    return `
        <div class="project-details project-details--linked">
            <h3 class="h5 mt-0 mb-1 font-weight-normal">${project.title}</h3>
            <p class="mt-0 mb-0 small text-muted">${project.abstract}</p>
        </div>`;
}

export function renderProject(project) {
    const projectUrl = project.caseStudyUrl || `projects/overview/?id=${encodeURIComponent(project.id)}`;
    return `
        <article class="project-item bg-white shadow-sm rounded-sm">
            <a class="project-card-link" href="${projectUrl}" aria-label="View project: ${project.title}">
            <div class="d-none d-md-block">
                <div class="row no-gutters">
                    <div class="col-md-3 col-xl-2 mb-md-0 p-md-3">
                        <img src="${project.cover}" loading="lazy" alt="Cover for ${project.title}" class="w-100 rounded-sm project-cover">
                    </div>
                    <div class="col-md-9 col-xl-10 p-3 pl-md-0">${renderProjectDetails(project)}</div>
                </div>
            </div>
            <div class="row no-gutters d-md-none project-mobile" style="background-image: url('${project.cover}')">
                <div class="w-100 project-mobile-overlay"><div class="d-flex align-items-start flex-column py-3 px-4"><div class="w-100">${renderProjectDetails(project)}</div></div></div>
            </div>
            <span class="project-case-study-arrow" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" focusable="false"><path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </a>
        </article>`;
}

export function renderProjectCollection(projects, { selected = false } = {}) {
    if (selected) {
        return `
            <section class="my-3 p-0 bg-white shadow-sm rounded-sm" aria-labelledby="selected-projects-title">
                <h2 id="selected-projects-title" class="h6 border-bottom border-gray p-3 mb-0"><i class="fas fa-star" aria-hidden="true"></i> Selected Projects</h2>
                ${projects.map((project) => renderProject(project)).join("")}
                <div class="h6 d-block p-3 mt-0 mb-0 text-right"><a href="projects.html">All projects <i class="fas fa-angle-double-right" aria-hidden="true"></i></a></div>
            </section>`;
    }

    return projects.map((project) => renderProject(project)).join("");
}

export function renderCarousel(id, carousel) {
    return `
        <div class="showcase-carousel" data-carousel id="${id}" style="--carousel-height: ${carousel.height}px">
            ${carousel.images.map((image, index) => `
                <div class="showcase-slide${index === 0 ? " is-active" : ""}" data-carousel-slide>
                    ${image.link ? `<a href="${image.link}" ${externalLinkAttributes}>` : ""}
                    <img src="${image.src}" loading="lazy" alt="${image.title || `Photo ${index + 1}`}">
                    ${(image.title || image.description) ? `<div class="showcase-caption"><h5>${image.title || ""}</h5><p>${image.description || ""}</p></div>` : ""}
                    ${image.link ? "</a>" : ""}
                </div>`).join("")}
            <button class="carousel-button previous" type="button" data-carousel-previous aria-label="Previous slide">&#10094;</button>
            <button class="carousel-button next" type="button" data-carousel-next aria-label="Next slide">&#10095;</button>
        </div>`;
}
