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
