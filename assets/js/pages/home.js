import { renderExperience, renderProfile, renderProjectCollection, renderShell } from "../components.js";
import { projects } from "../../../content/projects/index.js";

renderShell("home");

document.querySelector("[data-profile]").innerHTML = renderProfile();
document.querySelector("[data-experience]").innerHTML = renderExperience();
document.querySelector("[data-selected-projects]").innerHTML = renderProjectCollection(
    projects.filter((project) => project.selected),
    { selected: true },
);
