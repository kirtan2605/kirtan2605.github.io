import { profile } from "../../../content/profile.js";
import { renderShell } from "../components.js";

renderShell("side-quests");

function renderGames(games, container) {
    games.forEach((game) => {
        const card = document.createElement("article");
        card.className = "side-quests-game";

        const wallpaper = document.createElement("img");
        wallpaper.src = game.wallpaper;
        wallpaper.alt = game.wallpaperAlt;
        wallpaper.loading = "lazy";

        const title = document.createElement("h3");
        title.textContent = game.name;
        card.append(wallpaper, title);
        container.append(card);
    });
}

renderGames(profile.personal.games, document.querySelector("[data-games]"));

document.querySelector("[data-discord-username]").textContent = profile.personal.discord;

const highlights = profile.personal.highlights || [];
if (highlights.length) {
    const gallery = document.querySelector("[data-highlights]");
    highlights.forEach((highlight) => {
        const figure = document.createElement("figure");
        figure.className = "side-quests-media";

        if (highlight.type === "video") {
            const video = document.createElement("video");
            video.controls = true;
            video.preload = "none";
            video.src = highlight.src;
            video.setAttribute("aria-label", highlight.alt || highlight.caption || "Gameplay clip");
            if (highlight.poster) video.poster = highlight.poster;
            if (highlight.captions) {
                const track = document.createElement("track");
                track.kind = "captions";
                track.src = highlight.captions;
                track.srclang = "en";
                track.label = "English";
                video.append(track);
            }
            figure.append(video);
        } else {
            const image = document.createElement("img");
            image.src = highlight.src;
            image.alt = highlight.alt || highlight.caption || "Gaming screenshot";
            image.loading = "lazy";
            figure.append(image);
        }

        if (highlight.caption) {
            const caption = document.createElement("figcaption");
            caption.textContent = highlight.caption;
            figure.append(caption);
        }
        gallery.append(figure);
    });
    document.querySelector("[data-highlights-section]").hidden = false;
}
