import { renderShell } from "../components.js";
import { projects } from "../../../content/projects/index.js";
import { projectCaseStudies } from "../../../content/project-case-studies.js";
import { additionalCaseStudies } from "../../../content/project-case-studies-extra.js";
import { projectOverviews } from "../../../content/project-overviews.js";

renderShell("projects");

const id = new URLSearchParams(window.location.search).get("id");
const project = projects.find((item) => item.id === id && !item.caseStudyUrl);
const study = project && (projectCaseStudies[project.id] || additionalCaseStudies[project.id]);
const overview = project && projectOverviews[project.id];

function el(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
}

function makeResource(resource, prominent = false) {
    const link = el("a", prominent ? "thermal-report-button" : "project-resource-link", resource.label);
    link.href = resource.url;
    if (/^https?:\/\//.test(resource.url)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    }
    return link;
}

function makeFigure(figure) {
    const item = el("figure", "project-study-figure thermal-wide-figure");
    const image = el("img");
    image.src = figure.image;
    image.alt = figure.alt;
    image.loading = "lazy";
    const fullSize = el("a", "project-study-figure-link");
    fullSize.href = figure.image;
    fullSize.target = "_blank";
    fullSize.rel = "noopener noreferrer";
    fullSize.setAttribute("aria-label", "Open figure full size: " + figure.alt);
    fullSize.append(image);
    item.append(fullSize);
    const caption = el("figcaption");
    caption.append(el("strong", null, figure.label), document.createTextNode(" — " + figure.caption));
    item.append(caption);
    return item;
}

function appendResources(content, resources) {
    if (resources.length) {
        const section = el("section", "thermal-next-step project-study-resources");
        const copy = el("div");
        copy.append(el("p", null, "Original materials"), el("h2", null, "Explore the full project"));
        const actions = el("div", "thermal-next-actions");
        resources.forEach((resource, index) => actions.append(makeResource(resource, index === 0)));
        section.append(copy, actions);
        content.append(section);
    }
    const browse = el("a", "project-study-browse", "Browse all projects");
    browse.href = "projects.html";
    content.append(browse);
}

function renderCaseStudy() {
    document.querySelector("[data-project-area]").textContent = study.area;
    document.querySelector("[data-project-summary]").textContent = study.lead;
    const tags = document.querySelector("[data-project-tags]");
    study.tags.forEach((tag) => tags.append(el("span", null, tag)));

    const nav = el("nav", "thermal-jumpbar project-study-jumpbar");
    nav.setAttribute("aria-label", "On this page");
    const navInner = el("div", "container");
    study.sections.forEach((section) => {
        const link = el("a", null, section.navLabel || section.kicker);
        link.href = "#" + section.id;
        navInner.append(link);
    });
    nav.append(navInner);
    document.querySelector("[data-project-jumpbar]").replaceWith(nav);

    const content = document.querySelector("[data-project-content]");
    if (study.metrics?.length) {
        const panel = el("section", "project-study-metrics");
        panel.setAttribute("aria-label", "Project at a glance");
        study.metrics.forEach((metric) => {
            const item = el("div");
            item.append(el("strong", null, metric.value), el("span", null, metric.label));
            panel.append(item);
        });
        content.append(panel);
    }
    study.sections.forEach((section) => {
        const block = el("section", "thermal-section project-study-section");
        block.id = section.id;
        block.append(el("p", "thermal-section-kicker", section.kicker));
        block.append(el("h2", null, section.title));
        const prose = el("div", "project-study-prose");
        section.paragraphs.forEach((paragraph) => prose.append(el("p", null, paragraph)));
        block.append(prose);
        if (section.figures?.length) {
            block.classList.add("project-study-section-illustrated");
            const gallery = el("div", "project-study-gallery");
            section.figures.forEach((figure) => gallery.append(makeFigure(figure)));
            block.append(gallery);
        }
        content.append(block);
    });
    appendResources(content, study.resources || []);
}

function renderLimitedOverview() {
    document.querySelector("[data-project-area]").textContent = overview.area;
    document.querySelector("[data-project-summary]").textContent = project.abstract;
    const content = document.querySelector("[data-project-content]");
    const section = el("section", "thermal-section project-study-section");
    section.append(el("p", "thermal-section-kicker", "Project summary"));
    section.append(el("h2", null, "The project in brief"));
    const prose = el("div", "project-study-prose");
    prose.append(el("p", null, overview.focus), el("p", null, overview.approach));
    section.append(prose);
    content.append(section);
    appendResources(content, project.links);
}

if (!project || (!study && !overview)) {
    document.title = "Project not found - Kirtan";
    document.querySelector("main").innerHTML = '<div class="container thermal-section"><h1>Project not found</h1><p>This project page is unavailable.</p><a href="projects.html">Browse projects</a></div>';
} else {
    document.title = project.title + " - Kirtan";
    document.querySelector('meta[name="description"]').content = study?.lead || project.abstract;
    document.querySelector("[data-project-title]").textContent = project.title;
    const cover = document.querySelector("[data-project-cover]");
    cover.src = project.cover;
    cover.alt = project.coverAlt || "Cover for " + project.title;
    if (study) renderCaseStudy();
    else renderLimitedOverview();
}
