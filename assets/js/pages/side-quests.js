import { profile } from "../../../content/profile.js?v=20261022-16";
import { renderShell } from "../components.js?v=20261022-16";

renderShell("side-quests");

const collage = document.querySelector("[data-collage]");
const gamesPanel = document.querySelector("[data-games]");
const supportPanel = document.querySelector("[data-support]");

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

function renderGames(games, discord, container) {
    const card = document.createElement("article");
    card.className = "side-quests-card side-quests-discord-card";
    card.setAttribute("aria-label", `Discord profile and favourite games for ${discord.displayName}`);

    const profilePanel = document.createElement("div");
    profilePanel.className = "side-quests-discord-profile";

    const identity = document.createElement("div");
    identity.className = "side-quests-discord-identity";

    const avatarWrap = document.createElement("span");
    avatarWrap.className = "side-quests-discord-avatar-wrap";

    const avatar = document.createElement("img");
    avatar.className = "side-quests-discord-avatar";
    avatar.src = discord.avatar;
    avatar.alt = `${discord.displayName} Discord avatar`;

    const platform = document.createElement("span");
    platform.className = "side-quests-discord-platform";
    platform.title = "Discord";
    platform.setAttribute("aria-label", "Discord");
    const discordIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    discordIcon.classList.add("side-quests-discord-icon");
    discordIcon.setAttribute("viewBox", "0 0 24 24");
    discordIcon.setAttribute("focusable", "false");
    discordIcon.setAttribute("aria-hidden", "true");
    const discordMark = document.createElementNS("http://www.w3.org/2000/svg", "path");
    discordMark.setAttribute("fill", "currentColor");
    discordMark.setAttribute("d", "M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515c-.074.09-.145.184-.211.282a18.27 18.27 0 0 0-5.486 0 6.03 6.03 0 0 0-.211-.282A19.74 19.74 0 0 0 4.64 4.37C1.55 8.98.713 13.477 1.13 17.91a19.9 19.9 0 0 0 5.994 3.03c.484-.66.914-1.354 1.28-2.07a12.9 12.9 0 0 1-2.018-.96c.17-.124.335-.253.494-.386 3.89 1.8 8.105 1.8 11.955 0 .16.133.325.262.494.386-.642.38-1.318.7-2.018.96.367.716.796 1.41 1.28 2.07a19.9 19.9 0 0 0 5.994-3.03c.49-5.14-.837-9.596-4.268-13.54ZM8.02 15.5c-1.17 0-2.14-1.07-2.14-2.394 0-1.324.948-2.395 2.14-2.395 1.202 0 2.16 1.083 2.14 2.395 0 1.324-.948 2.394-2.14 2.394Zm7.137 0c-1.17 0-2.14-1.07-2.14-2.394 0-1.324.948-2.395 2.14-2.395 1.202 0 2.16 1.083 2.14 2.395 0 1.324-.938 2.394-2.14 2.394Z");
    discordIcon.append(discordMark);
    platform.append(discordIcon);
    avatarWrap.append(avatar, platform);

    const account = document.createElement("div");
    account.className = "side-quests-discord-account";
    const displayName = document.createElement("strong");
    displayName.className = "side-quests-discord-display-name";
    displayName.textContent = discord.displayName;

    const usernameRow = document.createElement("div");
    usernameRow.className = "side-quests-discord-username-row";
    const username = document.createElement("span");
    username.className = "side-quests-discord-username";
    username.textContent = discord.username;

    const badges = document.createElement("span");
    badges.className = "side-quests-discord-badges";
    badges.setAttribute("aria-label", "Discord profile badges");
    (discord.badges || []).forEach((badge) => {
        const icon = document.createElement("span");
        icon.className = "side-quests-discord-badge";
        icon.dataset.tooltip = badge.label;
        icon.setAttribute("aria-label", badge.label);
        icon.tabIndex = 0;

        const image = document.createElement("img");
        image.src = badge.src;
        image.alt = "";
        image.setAttribute("aria-hidden", "true");
        icon.append(image);
        badges.append(icon);
    });
    usernameRow.append(username, badges);

    const status = document.createElement("span");
    status.className = "side-quests-discord-status";
    status.innerHTML = '<span aria-hidden="true"></span> On a side-quest';
    account.append(displayName, usernameRow, status);
    identity.append(avatarWrap, account);

    const copy = document.createElement("p");
    copy.className = "side-quests-discord-copy";
    copy.textContent = "Games that have claimed a statistically significant number of my hours.";
    profilePanel.append(copy, identity);

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

function renderSupport(teams, container) {
    const list = document.createElement("ul");
    list.className = "side-quests-support-logos";
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videos = [];

    const syncPlayback = (video, isVisible = video.dataset.visible === "true") => {
        if (motionPreference.matches || document.hidden || !isVisible) {
            video.pause();
            return;
        }

        if (!video.src) video.src = video.dataset.src;
        video.play().catch(() => {});
    };

    const observer = "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                video.dataset.visible = String(entry.isIntersecting);
                syncPlayback(video, entry.isIntersecting);
            });
        }, { rootMargin: "120px 0px", threshold: 0.15 })
        : null;

    teams.forEach((team) => {
        const item = document.createElement("li");
        item.className = `side-quests-support-team side-quests-support-team--${team.style}`;
        item.setAttribute("aria-label", team.name);

        const logo = document.createElement("img");
        logo.className = "side-quests-support-logo";
        logo.src = team.logo;
        logo.alt = "";

        const media = document.createElement("div");
        media.className = "side-quests-support-media";

        const video = document.createElement("video");
        video.className = "side-quests-support-video";
        video.dataset.src = team.video;
        video.poster = team.videoPoster;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "none";
        video.tabIndex = -1;
        video.setAttribute("aria-hidden", "true");
        videos.push(video);
        if (observer) observer.observe(video);
        else {
            video.dataset.visible = "true";
            syncPlayback(video, true);
        }

        media.append(video);
        item.append(logo, media);
        list.append(item);
    });

    container.append(list);

    const syncAllVideos = () => videos.forEach((video) => syncPlayback(video));
    motionPreference.addEventListener?.("change", syncAllVideos);
    document.addEventListener("visibilitychange", syncAllVideos);
}

renderHighlights(profile.personal.highlights || [], collage);
renderGames(profile.personal.games, profile.personal.discord, gamesPanel);
if (supportPanel) renderSupport(profile.personal.teams || [], supportPanel);
