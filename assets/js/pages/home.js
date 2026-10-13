import { renderExperience, renderProfile, renderShell } from "../components.js";

renderShell("home");

document.querySelector("[data-profile]").innerHTML = renderProfile();
document.querySelector("[data-experience]").innerHTML = renderExperience();
