import { renderExperience, renderProfile, renderShell, renderSideQuestsTeaser } from "../components.js";

renderShell("home");

document.querySelector("[data-profile]").innerHTML = renderProfile();
document.querySelector("[data-experience]").innerHTML = renderExperience();
document.querySelector("[data-side-quests-teaser]").innerHTML = renderSideQuestsTeaser();
