import { renderExperience, renderProfile, renderShell, renderSkills } from "../components.js";

renderShell("home");

document.querySelector("[data-profile]").innerHTML = renderProfile();
document.querySelector("[data-skills]").innerHTML = renderSkills();
document.querySelector("[data-experience]").innerHTML = renderExperience();
