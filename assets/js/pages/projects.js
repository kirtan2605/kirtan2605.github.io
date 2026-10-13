import { renderProjectCollection, renderShell } from "../components.js";
import { projects } from "../../../content/projects/index.js";

renderShell("projects");

const projectsByYear = Object.groupBy
    ? Object.groupBy(projects, (project) => project.date.slice(0, 4))
    : projects.reduce((groups, project) => {
        const year = project.date.slice(0, 4);
        (groups[year] ||= []).push(project);
        return groups;
    }, {});

const years = Object.keys(projectsByYear).sort((a, b) => Number(b) - Number(a));
const content = document.querySelector("[data-project-list]");
const yearNavigation = document.querySelector("[data-year-navigation]");

content.innerHTML = years.map((year) => `
    <section aria-labelledby="year-${year}">
        <h2 class="pt-4" id="year-${year}">${year}</h2>
        <div class="my-0 p-0 bg-white shadow-sm rounded-sm">
            ${renderProjectCollection(projectsByYear[year])}
        </div>
    </section>`).join("");

yearNavigation.innerHTML = years.map((year) => `<a class="nav-link d-block" href="#year-${year}">${year}</a>`).join("");

const yearHeadings = years.map((year) => document.getElementById(`year-${year}`));
const yearLinks = Array.from(yearNavigation.querySelectorAll("a"));
let activeYear = null;
let scrollUpdateQueued = false;

function setActiveYear(year) {
    if (year === activeYear) return;
    activeYear = year;

    yearLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#year-${year}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function updateActiveYear() {
    scrollUpdateQueued = false;
    const scrollMarker = 110;
    let currentYear = years[0];

    yearHeadings.forEach((heading, index) => {
        if (heading.getBoundingClientRect().top <= scrollMarker) {
            currentYear = years[index];
        }
    });

    setActiveYear(currentYear);
}

function queueActiveYearUpdate() {
    if (scrollUpdateQueued) return;
    scrollUpdateQueued = true;
    requestAnimationFrame(updateActiveYear);
}

yearNavigation.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#year-']");
    if (link) setActiveYear(link.hash.slice("#year-".length));
});

window.addEventListener("scroll", queueActiveYearUpdate, { passive: true });
window.addEventListener("resize", queueActiveYearUpdate);
window.addEventListener("load", queueActiveYearUpdate);
queueActiveYearUpdate();
