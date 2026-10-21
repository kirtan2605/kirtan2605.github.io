import { profile } from "../../../content/profile.js";
import { renderShell } from "../components.js";

renderShell("side-quests");

const collage = document.querySelector("[data-collage]");
const gamesPanel = document.querySelector("[data-games]");

function createImage(item) {
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt || item.title || "Personal moment";
    image.loading = "lazy";
    if (item.fit === "contain") image.classList.add("side-quests-media-image--contain");
    if (item.fit === "cover") image.classList.add("side-quests-media-image--cover");
    if (item.focalPoint) image.style.objectPosition = item.focalPoint;
    return image;
}

function createStravaOverlay(details) {
    const overlay = document.createElement("div");
    overlay.className = "side-quests-strava";
    overlay.setAttribute(
        "aria-label",
        `Run details: ${details.distance}, pace ${details.pace}, time ${details.time}`,
    );

    const stats = document.createElement("div");
    stats.className = "side-quests-strava-stats";
    [
        ["Run", details.distance],
        ["Pace", details.pace],
        ["Time", details.time],
    ].forEach(([labelText, valueText]) => {
        const stat = document.createElement("span");
        const label = document.createElement("small");
        label.textContent = labelText;
        const value = document.createElement("b");
        value.textContent = valueText;
        stat.append(label, value);
        stats.append(stat);
    });

    overlay.append(stats);
    return overlay;
}

function createHighlight(highlight) {
    const figure = document.createElement("figure");
    figure.className = "side-quests-card side-quests-media";
    if (highlight.featured) figure.classList.add("side-quests-media--featured");
    if (highlight.layout) figure.classList.add(`side-quests-media--${highlight.layout}`);
    if (highlight.variant) figure.classList.add(`side-quests-media--${highlight.variant}`);

    if (highlight.type === "video") {
        const video = document.createElement("video");
        video.controls = true;
        video.playsInline = true;
        video.preload = "metadata";
        video.src = highlight.src;
        video.setAttribute("aria-label", highlight.alt || highlight.title || "Personal video");
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
        figure.append(createImage(highlight));
    }

    if (highlight.strava) figure.append(createStravaOverlay(highlight.strava));

    if (highlight.title || highlight.caption) {
        const caption = document.createElement("figcaption");
        if (highlight.title) {
            const title = document.createElement("strong");
            title.textContent = highlight.title;
            caption.append(title);
        }
        if (highlight.caption) {
            const description = document.createElement("span");
            description.textContent = highlight.caption;
            caption.append(description);
        }
        figure.append(caption);
    }

    return figure;
}

function createCollageGroup(className) {
    const group = document.createElement("div");
    group.className = className;
    return group;
}

function renderHighlights(highlights, container) {
    const leftTop = createCollageGroup("side-quests-collage-stack side-quests-collage-left");
    const mainTop = createCollageGroup("side-quests-collage-stack side-quests-collage-main");
    const upper = createCollageGroup("side-quests-collage-upper");
    const middle = createCollageGroup("side-quests-collage-stack");
    const right = createCollageGroup("side-quests-collage-stack");
    const airplane = createCollageGroup("side-quests-collage-stack side-quests-collage-wide");
    const lower = createCollageGroup("side-quests-collage-lower");
    const lowerMain = createCollageGroup("side-quests-collage-stack side-quests-collage-lower-main");
    const lowerPair = createCollageGroup("side-quests-collage-lower-pair");
    const lowerRight = createCollageGroup("side-quests-collage-stack side-quests-collage-lower-right");
    const lennonWall = createCollageGroup("side-quests-collage-stack side-quests-collage-wide");

    const middleLayouts = new Set(["ground-crew", "bike"]);
    const rightLayouts = new Set(["landscape", "ski"]);

    highlights.forEach((highlight) => {
        const figure = createHighlight(highlight);
        if (highlight.featured || highlight.layout === "blue-convertible") {
            leftTop.append(figure);
        } else if (middleLayouts.has(highlight.layout)) {
            middle.append(figure);
        } else if (rightLayouts.has(highlight.layout)) {
            right.append(figure);
        } else if (highlight.layout === "airplane") {
            airplane.append(figure);
        } else if (highlight.layout === "colour-swatch" || highlight.layout === "alfven-plaque") {
            lowerPair.append(figure);
        } else if (highlight.layout === "teddy-bears" || highlight.layout === "sticky-note") {
            lowerRight.append(figure);
        } else if (highlight.layout === "lennon-wall") {
            lennonWall.append(figure);
        } else {
            lowerMain.append(figure);
        }
    });

    upper.append(middle, right);
    mainTop.append(upper, airplane);
    lowerMain.append(lowerPair, lennonWall);
    lower.append(lowerMain, lowerRight);
    container.append(leftTop, mainTop, lower);
}

function renderGames(games, username, container) {
    const card = document.createElement("article");
    card.className = "side-quests-card side-quests-discord-card";
    card.setAttribute("aria-label", `Discord profile and favourite games for ${username}`);

    const profilePanel = document.createElement("div");
    profilePanel.className = "side-quests-discord-profile";

    const identity = document.createElement("div");
    identity.className = "side-quests-discord-identity";

    const avatar = document.createElement("span");
    avatar.className = "side-quests-discord-avatar";
    avatar.setAttribute("aria-hidden", "true");
    const discordIcon = document.createElement("i");
    discordIcon.className = "fab fa-discord";
    avatar.append(discordIcon);

    const account = document.createElement("div");
    account.className = "side-quests-discord-account";
    const label = document.createElement("span");
    label.className = "side-quests-discord-label";
    label.textContent = "Discord";
    const handle = document.createElement("strong");
    handle.textContent = username;
    const status = document.createElement("span");
    status.className = "side-quests-discord-status";
    status.innerHTML = '<span aria-hidden="true"></span> Side quest in progress';
    account.append(label, handle, status);
    identity.append(avatar, account);

    const copy = document.createElement("p");
    copy.className = "side-quests-discord-copy";
    copy.textContent = "If Discord says I’m busy, one of these is probably why.";
    profilePanel.append(identity, copy);

    const gameGrid = document.createElement("div");
    gameGrid.className = "side-quests-discord-games";

    games.forEach((game) => {
        const gameCard = document.createElement("div");
        gameCard.className = "side-quests-discord-game";

        const wallpaper = document.createElement("img");
        wallpaper.src = game.wallpaper;
        wallpaper.alt = game.wallpaperAlt;
        wallpaper.loading = "lazy";

        const title = document.createElement("h3");
        title.textContent = game.name;
        gameCard.append(wallpaper, title);
        gameGrid.append(gameCard);
    });

    card.append(profilePanel, gameGrid);
    container.append(card);
}

renderHighlights(profile.personal.highlights || [], collage);
renderGames(profile.personal.games, profile.personal.discord, gamesPanel);
