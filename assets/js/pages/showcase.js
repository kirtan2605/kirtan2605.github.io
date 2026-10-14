import { renderCarousel, renderShell } from "../components.js";
import { showcaseGroups } from "../../../content/showcase.js";
import { initializeCarousels, initializeShowcaseGrids } from "../site.js";

renderShell("showcase");

document.querySelector("[data-showcase]").innerHTML = showcaseGroups.map((group) => `
    <section class="mb-4"${group.title ? ` aria-labelledby="showcase-${group.title.toLowerCase()}"` : ""}>
        ${group.title ? `<h1 id="showcase-${group.title.toLowerCase()}">${group.title}</h1>` : ""}
        <div class="showcase-grid">
            ${group.items.map((item) => `
                <article class="showcase-item" style="--span: ${item.width}">
                    <div class="${item.className}">
                        ${item.carousel ? renderCarousel(item.id, item.carousel) : item.html}
                    </div>
                </article>`).join("")}
        </div>
    </section>`).join("");

initializeCarousels();
initializeShowcaseGrids();
