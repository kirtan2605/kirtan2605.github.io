import { profile } from "../../../content/profile.js?v=20261115-64";
import { renderShell } from "../components.js?v=20261022-16";

renderShell("showcase");

const collage = document.querySelector("[data-collage]");
const gamesPanel = document.querySelector("[data-games]");
const supportPanel = document.querySelector("[data-support]");
const aviationLogbook = document.querySelector("[data-aviation-logbook]");

const svgNamespace = "http://www.w3.org/2000/svg";
const mapWidth = 960;
const mapHeight = 480;

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
    const discordIcon = document.createElement("img");
    discordIcon.className = "side-quests-discord-icon";
    discordIcon.src = "assets/images/gaming/discord-symbol.svg";
    discordIcon.alt = "";
    discordIcon.setAttribute("aria-hidden", "true");
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

function projectAirport(airport) {
    return {
        x: ((airport.longitude + 180) / 360) * mapWidth,
        y: ((90 - airport.latitude) / 180) * mapHeight,
    };
}

function normalizeViaAirports(via) {
    if (!via) return [];
    return Array.isArray(via) ? via : [via];
}

function getRouteViaAirports(route) {
    return normalizeViaAirports(route.outboundVia ?? route.via);
}

function getRouteReturnViaAirports(route) {
    return normalizeViaAirports(route.returnVia);
}

function hasDirectionalReturn(route) {
    return Boolean(route.roundTrip && Object.prototype.hasOwnProperty.call(route, "returnVia"));
}

function getRoutePaths(route) {
    const outbound = [route.from, ...getRouteViaAirports(route), route.to];
    if (!hasDirectionalReturn(route)) return [outbound];

    const inbound = [route.to, ...getRouteReturnViaAirports(route), route.from];
    return [outbound, inbound];
}

function getRouteAirports(route) {
    const airports = new Map();
    getRoutePaths(route).flat().forEach((airport) => airports.set(airport.code, airport));
    return [...airports.values()];
}

function routeSegmentKey(from, to) {
    return [from.code, to.code].sort().join("::");
}

function createArcPath(start, end, bendOffset = 0) {
    const distance = Math.hypot(end.x - start.x, end.y - start.y);
    const safeDistance = Math.max(distance, 1);
    const bend = Math.min(42, Math.max(6, distance * 0.12)) + bendOffset;
    let normalX = (end.y - start.y) / safeDistance;
    let normalY = -(end.x - start.x) / safeDistance;
    if (normalY > 0 || (Math.abs(normalY) < 0.001 && normalX < 0)) {
        normalX *= -1;
        normalY *= -1;
    }
    const controlX = (start.x + end.x) / 2 + normalX * bend;
    const controlY = (start.y + end.y) / 2 + normalY * bend;
    return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

function createSvgElement(name, attributes = {}) {
    const element = document.createElementNS(svgNamespace, name);
    Object.entries(attributes).forEach(([attribute, value]) => element.setAttribute(attribute, value));
    return element;
}

function getAirlineIdentity(route, airlineCatalog = {}) {
    const catalogAirline = typeof route.airline === "string" ? airlineCatalog[route.airline] : null;
    const airline = catalogAirline || (typeof route.airline === "object" && route.airline !== null
        ? route.airline
        : { name: route.airline });

    return {
        name: airline.name || "Airline",
        logo: airline.logo || route.airlineLogo || "",
        hideBrand: Boolean(airline.hideBrand),
        showName: Boolean(airline.showName),
        accent: airline.accent || route.color || "#4f6f8f",
        surface: airline.surface || "#ffffff",
        ink: airline.ink || "#26313b",
        muted: airline.muted || "#68757e",
        stub: airline.stub || "#f4f7f8",
    };
}

function routeLabel(route, airlineCatalog) {
    const journeyDate = route.date || route.period;
    const period = journeyDate ? `, ${journeyDate}` : "";
    const viaAirports = getRouteViaAirports(route);
    const returnViaAirports = getRouteReturnViaAirports(route);
    const formatVias = (airports) => airports.map((airport) => `${airport.city} (${airport.code})`).join(" and ");
    const via = hasDirectionalReturn(route)
        ? `${viaAirports.length ? `, outward via ${formatVias(viaAirports)}` : ""}${returnViaAirports.length ? `, returning via ${formatVias(returnViaAirports)}` : ""}`
        : viaAirports.length
        ? ` via ${formatVias(viaAirports)}`
        : "";
    const direction = route.roundTrip
        ? `${route.from.city} (${route.from.code}) to ${route.to.city} (${route.to.code}) and back`
        : `${route.from.city} (${route.from.code}) to ${route.to.city} (${route.to.code})`;
    const transport = route.transportMode === "bus"
        ? " by bus"
        : route.transportMode === "car"
        ? " by car"
        : route.transportMode === "mixed"
        ? " by air and road"
        : ` with ${getAirlineIdentity(route, airlineCatalog).name}`;
    return `${direction}${via}${transport}${period}`;
}

function renderAviationLogbook(logbook, container) {
    if (!container || !logbook) return;

    const routes = logbook.routes || [];
    const airlineCatalog = logbook.airlines || {};
    const routeOrder = new Map(routes.map((route, index) => [route, index]));
    const routeGroups = [];
    const routeGroupsByPair = new Map();
    routes.forEach((route) => {
        const endpoints = [route.from.code, route.to.code].sort().join("::");
        const via = getRouteViaAirports(route).map((airport) => airport.code).join(">");
        const returnVia = hasDirectionalReturn(route)
            ? getRouteReturnViaAirports(route).map((airport) => airport.code).join(">") || "direct"
            : "same";
        const key = `${endpoints}::${via || "direct"}::${returnVia}`;
        let group = routeGroupsByPair.get(key);
        if (!group) {
            group = { route, journeys: [] };
            routeGroupsByPair.set(key, group);
            routeGroups.push(group);
        }
        group.journeys.push(route);
    });

    routeGroups.forEach((group) => {
        group.journeys.sort((first, second) => routeOrder.get(first) - routeOrder.get(second));
    });
    const segmentRouteGroups = new Map();
    routeGroups.forEach((group, groupIndex) => {
        const groupSegments = new Set();
        getRoutePaths(group.route).forEach((path) => {
            path.slice(0, -1).forEach((from, segmentIndex) => {
                groupSegments.add(routeSegmentKey(from, path[segmentIndex + 1]));
            });
        });
        groupSegments.forEach((key) => {
            if (!segmentRouteGroups.has(key)) segmentRouteGroups.set(key, []);
            segmentRouteGroups.get(key).push(groupIndex);
        });
    });

    const createRouteGroupPathData = (groupIndex) => {
        const route = routeGroups[groupIndex].route;
        return getRoutePaths(route).map((path) => (
            path.slice(0, -1).map((from, segmentIndex) => {
                const to = path[segmentIndex + 1];
                const groupsOnSegment = segmentRouteGroups.get(routeSegmentKey(from, to)) || [groupIndex];
                const laneIndex = groupsOnSegment.indexOf(groupIndex);
                const laneStep = Math.min(5, 15 / Math.max(groupsOnSegment.length - 1, 1));
                const bendOffset = (laneIndex - (groupsOnSegment.length - 1) / 2) * laneStep;
                return createArcPath(projectAirport(from), projectAirport(to), bendOffset);
            }).join(" ")
        )).join(" ");
    };

    routeGroups.forEach((group, groupIndex) => {
        group.pathData = createRouteGroupPathData(groupIndex);
    });
    const layout = document.createElement("div");
    layout.className = "aviation-logbook-card";

    const mapPanel = document.createElement("div");
    mapPanel.className = "aviation-map-panel";

    const map = createSvgElement("svg", {
        class: "aviation-map",
        viewBox: `0 0 ${mapWidth} ${mapHeight}`,
        role: "img",
        tabindex: "0",
        "aria-label": "Remembered journey routes",
        "aria-describedby": "aviation-map-description",
        "aria-keyshortcuts": "+ - 0 ArrowUp ArrowDown ArrowLeft ArrowRight",
    });
    map.append(
        Object.assign(createSvgElement("desc", { id: "aviation-map-description" }), {
            textContent: routes.length
                ? "Interactive map. Select a route to read its details, or select a location to browse the journeys serving it. Drag to pan, or use the map controls to zoom and reset the view."
                : "A world map waiting for remembered routes to be added.",
        }),
    );

    const mapControls = document.createElement("div");
    mapControls.className = "aviation-map-controls";
    mapControls.setAttribute("role", "group");
    mapControls.setAttribute("aria-label", "Map view controls");
    const createMapControl = (label, icon) => {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-label", label);
        button.title = label;
        button.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i>`;
        return button;
    };
    const zoomInButton = createMapControl("Zoom in", "fa-plus");
    const zoomOutButton = createMapControl("Zoom out", "fa-minus");
    const resetViewButton = createMapControl("Reset map view", "fa-expand");
    mapControls.append(zoomInButton, zoomOutButton, resetViewButton);

    const airportRouteSwitcher = document.createElement("div");
    airportRouteSwitcher.className = "aviation-airport-route-switcher";
    airportRouteSwitcher.hidden = true;
    airportRouteSwitcher.setAttribute("role", "group");
    const airportRouteCode = document.createElement("strong");
    airportRouteCode.className = "aviation-airport-route-code";
    const airportRouteSummary = document.createElement("span");
    airportRouteSummary.className = "aviation-airport-route-summary";
    const airportRoutePosition = document.createElement("small");
    airportRoutePosition.className = "aviation-airport-route-position";
    const airportRouteCopy = document.createElement("span");
    airportRouteCopy.className = "aviation-airport-route-copy";
    airportRouteCopy.append(airportRouteSummary, airportRoutePosition);
    const airportRouteNavigation = document.createElement("span");
    airportRouteNavigation.className = "aviation-airport-route-navigation";
    const previousAirportRoute = document.createElement("button");
    previousAirportRoute.type = "button";
    previousAirportRoute.setAttribute("aria-label", "Previous route from this airport");
    previousAirportRoute.innerHTML = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
    const nextAirportRoute = document.createElement("button");
    nextAirportRoute.type = "button";
    nextAirportRoute.setAttribute("aria-label", "Next route from this airport");
    nextAirportRoute.innerHTML = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';
    airportRouteNavigation.append(previousAirportRoute, nextAirportRoute);
    airportRouteSwitcher.append(airportRouteCode, airportRouteCopy, airportRouteNavigation);

    const defaultViewport = { x: 0, y: 0, width: mapWidth, height: mapHeight };
    const maximumZoom = 5;
    let viewport = { ...defaultViewport };
    const clampViewport = (nextViewport) => {
        const width = Math.min(mapWidth, Math.max(mapWidth / maximumZoom, nextViewport.width));
        const height = width / (mapWidth / mapHeight);
        return {
            x: Math.min(mapWidth - width, Math.max(0, nextViewport.x)),
            y: Math.min(mapHeight - height, Math.max(0, nextViewport.y)),
            width,
            height,
        };
    };
    const setViewport = (nextViewport) => {
        viewport = clampViewport(nextViewport);
        map.setAttribute("viewBox", `${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}`);
        const atDefaultZoom = Math.abs(viewport.width - mapWidth) < 0.01;
        const atMaximumZoom = Math.abs(viewport.width - (mapWidth / maximumZoom)) < 0.01;
        zoomOutButton.disabled = atDefaultZoom;
        zoomInButton.disabled = atMaximumZoom;
        resetViewButton.disabled = atDefaultZoom && viewport.x === 0 && viewport.y === 0;
    };
    const zoomViewport = (factor, centerX = viewport.x + viewport.width / 2, centerY = viewport.y + viewport.height / 2) => {
        const width = viewport.width / factor;
        const height = viewport.height / factor;
        const xRatio = (centerX - viewport.x) / viewport.width;
        const yRatio = (centerY - viewport.y) / viewport.height;
        setViewport({
            x: centerX - width * xRatio,
            y: centerY - height * yRatio,
            width,
            height,
        });
    };
    const resetViewport = () => setViewport(defaultViewport);
    zoomInButton.addEventListener("click", () => zoomViewport(1.45));
    zoomOutButton.addEventListener("click", () => zoomViewport(1 / 1.45));
    resetViewButton.addEventListener("click", resetViewport);

    let dragState = null;
    let suppressRouteClick = false;
    const pointFromPointer = (event, inverseMatrix) => {
        const point = map.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        return point.matrixTransform(inverseMatrix);
    };
    map.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        const screenMatrix = map.getScreenCTM();
        if (!screenMatrix) return;
        const inverseMatrix = screenMatrix.inverse();
        dragState = {
            pointerId: event.pointerId,
            pointerStartX: event.clientX,
            pointerStartY: event.clientY,
            mapStart: pointFromPointer(event, inverseMatrix),
            viewportStart: { ...viewport },
            inverseMatrix,
            moved: false,
        };
    });
    map.addEventListener("pointermove", (event) => {
        if (!dragState || dragState.pointerId !== event.pointerId) return;
        const currentPoint = pointFromPointer(event, dragState.inverseMatrix);
        const pointerDistance = Math.hypot(
            event.clientX - dragState.pointerStartX,
            event.clientY - dragState.pointerStartY,
        );
        if (pointerDistance > 4 && !dragState.moved) {
            dragState.moved = true;
            map.classList.add("is-panning");
            map.setPointerCapture(event.pointerId);
        }
        if (!dragState.moved) return;
        setViewport({
            ...dragState.viewportStart,
            x: dragState.viewportStart.x - (currentPoint.x - dragState.mapStart.x),
            y: dragState.viewportStart.y - (currentPoint.y - dragState.mapStart.y),
        });
    });
    const finishMapDrag = (event) => {
        if (!dragState || dragState.pointerId !== event.pointerId) return;
        suppressRouteClick = dragState.moved;
        dragState = null;
        map.classList.remove("is-panning");
        if (map.hasPointerCapture(event.pointerId)) map.releasePointerCapture(event.pointerId);
        window.setTimeout(() => { suppressRouteClick = false; }, 0);
    };
    map.addEventListener("pointerup", finishMapDrag);
    map.addEventListener("pointercancel", finishMapDrag);
    map.addEventListener("click", (event) => {
        if (!suppressRouteClick) return;
        event.preventDefault();
        event.stopPropagation();
    }, true);
    map.addEventListener("keydown", (event) => {
        const panDistanceX = viewport.width * 0.1;
        const panDistanceY = viewport.height * 0.1;
        const keyboardActions = {
            ArrowLeft: () => setViewport({ ...viewport, x: viewport.x - panDistanceX }),
            ArrowRight: () => setViewport({ ...viewport, x: viewport.x + panDistanceX }),
            ArrowUp: () => setViewport({ ...viewport, y: viewport.y - panDistanceY }),
            ArrowDown: () => setViewport({ ...viewport, y: viewport.y + panDistanceY }),
            "+": () => zoomViewport(1.45),
            "=": () => zoomViewport(1.45),
            "-": () => zoomViewport(1 / 1.45),
            "0": resetViewport,
        };
        const action = keyboardActions[event.key];
        if (!action) return;
        event.preventDefault();
        action();
    });
    setViewport(defaultViewport);

    const graticule = createSvgElement("g", { class: "aviation-map-graticule", "aria-hidden": "true" });
    [-120, -60, 0, 60, 120].forEach((longitude) => {
        const x = projectAirport({ longitude, latitude: 0 }).x;
        graticule.append(createSvgElement("line", { x1: x, y1: 30, x2: x, y2: mapHeight - 30 }));
    });
    [-60, -30, 0, 30, 60].forEach((latitude) => {
        const y = projectAirport({ longitude: 0, latitude }).y;
        graticule.append(createSvgElement("line", { x1: 20, y1: y, x2: mapWidth - 20, y2: y }));
    });
    map.append(graticule);

    const land = createSvgElement("image", {
        class: "aviation-map-land",
        href: "assets/images/maps/world-countries.svg?v=20261101-2",
        x: 0,
        y: 0,
        width: mapWidth,
        height: mapHeight,
        preserveAspectRatio: "none",
        "aria-hidden": "true",
    });
    map.append(land);

    const routeLayer = createSvgElement("g", { class: "aviation-map-routes" });
    const activeRouteLayer = createSvgElement("g", { class: "aviation-active-route", "aria-hidden": "true" });
    const activeRoutePath = createSvgElement("path", { class: "aviation-active-route-line" });
    activeRouteLayer.append(activeRoutePath);
    const airportLayer = createSvgElement("g", { class: "aviation-map-airports" });
    map.append(routeLayer, activeRouteLayer, airportLayer);

    const passStack = document.createElement("div");
    passStack.className = "aviation-boarding-pass-stack";
    const detail = document.createElement("article");
    detail.className = "aviation-boarding-pass";
    detail.setAttribute("aria-live", "polite");

    const passMain = document.createElement("div");
    passMain.className = "aviation-boarding-pass-main";
    const passHeader = document.createElement("div");
    passHeader.className = "aviation-boarding-pass-header";
    const passBrand = document.createElement("span");
    passBrand.className = "aviation-boarding-pass-brand";
    const passBrandDirection = document.createElement("small");
    passBrandDirection.className = "aviation-boarding-pass-brand-direction";
    passBrandDirection.hidden = true;
    const passLogo = document.createElement("img");
    passLogo.className = "aviation-boarding-pass-logo";
    passLogo.hidden = true;
    const passBrandName = document.createElement("span");
    passBrandName.className = "aviation-boarding-pass-brand-name";
    passBrandName.innerHTML = '<i class="fas fa-plane-departure" aria-hidden="true"></i> Flight log';
    const passBrandExtras = document.createElement("span");
    passBrandExtras.className = "aviation-boarding-pass-brand-extras";
    passBrand.append(passBrandDirection, passLogo, passBrandName, passBrandExtras);
    const passType = document.createElement("span");
    passType.className = "aviation-boarding-pass-type";
    passType.textContent = "Boarding pass";
    passHeader.append(passBrand, passType);

    const passRoute = document.createElement("div");
    passRoute.className = "aviation-boarding-pass-route";
    const createStop = (label, destination = false) => {
        const stop = document.createElement("div");
        stop.className = `aviation-boarding-pass-stop${destination ? " is-destination" : ""}`;
        const stopLabel = document.createElement("small");
        stopLabel.textContent = label;
        const code = document.createElement("strong");
        const city = document.createElement("span");
        stop.append(stopLabel, code, city);
        return { stop, code, city };
    };
    const origin = createStop("From");
    const destination = createStop("To", true);
    const passPlane = document.createElement("span");
    passPlane.className = "aviation-boarding-pass-plane";
    passRoute.append(origin.stop, passPlane, destination.stop);

    const createDirectionSymbol = (roundTrip = false, transportMode = "flight") => {
        const direction = document.createElement(roundTrip ? "span" : "i");
        direction.setAttribute("aria-hidden", "true");
        if (roundTrip) direction.innerHTML = "&#8644;";
        else direction.className = `fas ${transportMode === "bus" ? "fa-bus" : transportMode === "car" ? "fa-car" : "fa-plane"}`;
        return direction;
    };

    const passDate = document.createElement("time");
    passDate.className = "aviation-boarding-pass-date";

    const journeyNavigation = document.createElement("nav");
    journeyNavigation.className = "aviation-boarding-pass-navigation";
    journeyNavigation.setAttribute("aria-label", "Journeys on this route");
    journeyNavigation.hidden = true;
    const previousJourney = document.createElement("button");
    previousJourney.type = "button";
    previousJourney.setAttribute("aria-label", "Previous journey");
    previousJourney.innerHTML = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
    const journeyPosition = document.createElement("span");
    const nextJourney = document.createElement("button");
    nextJourney.type = "button";
    nextJourney.setAttribute("aria-label", "Next journey");
    nextJourney.innerHTML = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';
    journeyNavigation.append(previousJourney, journeyPosition, nextJourney);

    const detailNote = document.createElement("p");
    detailNote.className = "aviation-boarding-pass-note";
    passMain.append(passHeader, passRoute, passDate, detailNote);

    const passStub = document.createElement("div");
    passStub.className = "aviation-boarding-pass-stub";
    const qrBlock = document.createElement("a");
    qrBlock.className = "aviation-boarding-pass-qr";
    passStub.append(qrBlock, journeyNavigation);
    detail.append(passMain, passStub);
    const passPeekLayer = document.createElement("div");
    passPeekLayer.className = "aviation-boarding-pass-peeks";
    passStack.append(passPeekLayer, detail);

    const setPassBrand = (identity, additionalIdentities = []) => {
        const color = (value, fallback) => value && CSS.supports("color", value) ? value : fallback;
        const hasMultipleAirlines = additionalIdentities.length > 0;
        const primaryAccent = color(identity.accent, "#4f6f8f");
        detail.classList.toggle("has-multiple-airlines", hasMultipleAirlines);
        detail.style.setProperty("--pass-accent", hasMultipleAirlines ? "#52626c" : primaryAccent);
        detail.style.setProperty("--pass-rule-accent", hasMultipleAirlines ? "#52626c" : primaryAccent);
        detail.style.setProperty("--pass-surface", hasMultipleAirlines ? "#ffffff" : color(identity.surface, "#ffffff"));
        detail.style.setProperty("--pass-ink", hasMultipleAirlines ? "#26313b" : color(identity.ink, "#26313b"));
        detail.style.setProperty("--pass-muted", hasMultipleAirlines ? "#68757e" : color(identity.muted, "#68757e"));
        detail.style.setProperty("--pass-stub", hasMultipleAirlines ? "#f1f4f5" : color(identity.stub, "#f4f7f8"));

        passBrand.hidden = identity.hideBrand && !additionalIdentities.length;
        passBrandDirection.hidden = !hasMultipleAirlines;
        passBrandDirection.textContent = hasMultipleAirlines ? "→" : "";
        passBrandDirection.style.setProperty("--carrier-direction-color", primaryAccent);
        if (hasMultipleAirlines) passBrandDirection.setAttribute("aria-label", "Outbound");
        else passBrandDirection.removeAttribute("aria-label");
        passBrandName.textContent = identity.name;
        passBrandName.hidden = Boolean(identity.logo) && !identity.showName;
        passLogo.hidden = !identity.logo;
        passLogo.alt = identity.logo ? `${identity.name} logo` : "";
        passLogo.onload = () => {
            passLogo.hidden = false;
            passBrandName.hidden = !identity.showName;
        };
        passLogo.onerror = () => {
            passLogo.hidden = true;
            passBrandName.hidden = false;
        };
        if (identity.logo) passLogo.src = identity.logo;
        else passLogo.removeAttribute("src");

        passBrandExtras.replaceChildren();
        additionalIdentities.forEach((additionalIdentity, index) => {
            const divider = document.createElement("span");
            divider.className = "aviation-boarding-pass-brand-divider";
            divider.setAttribute("aria-hidden", "true");
            passBrandExtras.append(divider);

            const direction = document.createElement("small");
            direction.className = "aviation-boarding-pass-brand-direction";
            direction.textContent = index === 0 ? "←" : "·";
            direction.style.setProperty("--carrier-direction-color", additionalIdentity.accent);
            direction.setAttribute("aria-label", index === 0 ? "Return" : `Additional carrier ${index + 2}`);
            passBrandExtras.append(direction);

            if (additionalIdentity.logo) {
                const logo = document.createElement("img");
                logo.className = "aviation-boarding-pass-logo is-secondary";
                logo.src = additionalIdentity.logo;
                logo.alt = `${additionalIdentity.name} logo`;
                logo.onerror = () => {
                    const name = document.createElement("span");
                    name.className = "aviation-boarding-pass-secondary-name";
                    name.textContent = additionalIdentity.name;
                    logo.replaceWith(name);
                };
                passBrandExtras.append(logo);
            } else {
                const name = document.createElement("span");
                name.className = "aviation-boarding-pass-secondary-name";
                name.textContent = additionalIdentity.name;
                passBrandExtras.append(name);
            }
        });
    };

    const getRoutePasses = (route) => Array.isArray(route.passes) ? route.passes.filter(Boolean) : [];
    const getDirectionalPassRoute = (route, pass) => {
        if (!pass) return route;
        const returning = pass.direction === "return";
        return {
            ...route,
            from: pass.from || (returning ? route.to : route.from),
            to: pass.to || (returning ? route.from : route.to),
            via: pass.via,
            outboundVia: undefined,
            returnVia: undefined,
            airline: pass.airline || route.airline,
            airlines: undefined,
            date: pass.date || route.date,
            roundTrip: false,
            flightNumber: pass.flightNumber,
            flightNumbers: pass.flightNumbers,
            flightNumberGroups: undefined,
            flightOperators: pass.flightOperators || route.flightOperators,
            transportMode: pass.transportMode || route.transportMode,
            note: pass.note ?? route.note,
        };
    };

    const updatePassStack = (route, passIndex) => {
        const passes = getRoutePasses(route);
        const peekCount = Math.max(0, passes.length - 1);
        const hasStack = peekCount > 0;
        passStack.classList.toggle("has-pass-stack", hasStack);
        passStack.style.setProperty("--pass-peek-count", String(peekCount));
        passStack.style.setProperty("--pass-stack-offset", `${peekCount * 1.05 + 0.25}rem`);
        passPeekLayer.replaceChildren();
        if (!hasStack) return;

        for (let offset = peekCount; offset >= 1; offset -= 1) {
            const nextIndex = (passIndex + offset) % passes.length;
            const nextRoute = getDirectionalPassRoute(route, passes[nextIndex]);
            const nextAirline = getAirlineIdentity(nextRoute, airlineCatalog);
            const stackPosition = peekCount - offset;
            const passPeek = document.createElement("button");
            passPeek.className = "aviation-boarding-pass-peek";
            passPeek.type = "button";
            passPeek.dataset.passIndex = String(nextIndex);
            passPeek.style.top = `${stackPosition * 1.05}rem`;
            passPeek.style.zIndex = String(stackPosition + 1);
            passPeek.style.setProperty("--peek-accent", nextAirline.accent);
            passPeek.style.setProperty("--peek-surface", nextAirline.surface);
            passPeek.style.setProperty("--peek-ink", nextAirline.ink);
            passPeek.style.setProperty("--peek-stub", nextAirline.stub);

            const passPeekLogo = document.createElement("img");
            passPeekLogo.alt = nextAirline.logo ? `${nextAirline.name} logo` : "";
            const passPeekName = document.createElement("span");
            passPeekName.className = "aviation-boarding-pass-peek-name";
            passPeekName.textContent = nextAirline.name;
            passPeekName.hidden = Boolean(nextAirline.logo);
            passPeekLogo.hidden = !nextAirline.logo;
            passPeekLogo.onload = () => {
                passPeekLogo.hidden = false;
                passPeekName.hidden = true;
            };
            passPeekLogo.onerror = () => {
                passPeekLogo.hidden = true;
                passPeekName.hidden = false;
            };
            if (nextAirline.logo) passPeekLogo.src = nextAirline.logo;

            const passPeekRoute = document.createElement("span");
            passPeekRoute.className = "aviation-boarding-pass-peek-route";
            passPeekRoute.textContent = `${nextRoute.from.code} → ${nextRoute.to.code}`;
            const passPeekStub = document.createElement("span");
            passPeekStub.className = "aviation-boarding-pass-peek-stub";
            passPeekStub.setAttribute("aria-hidden", "true");
            passPeek.append(passPeekLogo, passPeekName, passPeekRoute, passPeekStub);
            passPeek.setAttribute(
                "aria-label",
                `Show ${nextAirline.name} ${passes[nextIndex].label || "other side"} pass, ${nextRoute.from.code} to ${nextRoute.to.code}`,
            );
            passPeekLayer.append(passPeek);
        }
    };

    const getJourneyAirlines = (route) => {
        const airlineKeys = [route.airline, ...(Array.isArray(route.airlines) ? route.airlines : [])];
        const uniqueKeys = airlineKeys.filter((airline, index) => (
            airline && airlineKeys.findIndex((candidate) => candidate === airline) === index
        ));
        return uniqueKeys.map((airline) => getAirlineIdentity({ ...route, airline }, airlineCatalog));
    };

    const getJourneyQrTarget = (route) => {
        const noteId = typeof route.qrNoteId === "string" ? route.qrNoteId.trim() : "";
        if (!noteId) return "";
        const target = new URL("aviation-note.html", window.location.href);
        target.search = "";
        target.hash = noteId;
        return target.href;
    };

    const getJourneyQrPayload = (route) => {
        const lockedNoteTarget = getJourneyQrTarget(route);
        if (lockedNoteTarget) return lockedNoteTarget;
        const customMessage = typeof route.qrMessage === "string" ? route.qrMessage.trim() : "";
        if (customMessage) return customMessage;
        const date = route.date || route.period;
        return [
            "A passenger's aviation logbook",
            `${route.from.code} ${route.roundTrip ? "round trip" : "to"} ${route.to.code}`,
            date,
        ].filter(Boolean).join("\n");
    };

    const renderJourneyQr = (route) => {
        qrBlock.replaceChildren();
        qrBlock.classList.remove("is-unavailable");
        const lockedNoteTarget = getJourneyQrTarget(route);
        qrBlock.classList.toggle("is-locked", Boolean(lockedNoteTarget));
        if (lockedNoteTarget) qrBlock.href = lockedNoteTarget;
        else qrBlock.removeAttribute("href");
        const qrFactory = globalThis.qrcode;
        if (typeof qrFactory !== "function") {
            qrBlock.classList.add("is-unavailable");
            qrBlock.setAttribute("aria-label", "Journey note QR code unavailable");
            return;
        }

        qrFactory.stringToBytes = qrFactory.stringToBytesFuncs["UTF-8"];
        const qr = qrFactory(0, "M");
        qr.addData(getJourneyQrPayload(route));
        qr.make();
        qrBlock.innerHTML = qr.createSvgTag({
            cellSize: 2,
            margin: 4,
            scalable: true,
            title: "Journey note",
            alt: "QR code containing a note about this journey",
        });
        qrBlock.setAttribute(
            "aria-label",
            lockedNoteTarget
                ? "Open password-protected note from this journey"
                : "QR code containing a note about this journey",
        );
        qrBlock.title = lockedNoteTarget ? "Open password-protected note" : "A note from this journey";
    };

    const setDefaultDetail = () => {
        origin.code.textContent = "—";
        origin.city.textContent = "";
        destination.code.textContent = "—";
        destination.city.textContent = "";
        passPlane.classList.remove("has-connection");
        passPlane.removeAttribute("aria-label");
        passPlane.replaceChildren(createDirectionSymbol());
        passDate.textContent = "";
        passType.textContent = "Boarding pass";
        passType.classList.remove("has-flight-number");
        passType.classList.remove("has-flight-groups");
        passType.removeAttribute("aria-label");
        journeyNavigation.hidden = true;
        detailNote.textContent = "";
        qrBlock.replaceChildren();
        passStack.classList.remove("has-pass-stack");
        passStack.style.setProperty("--pass-peek-count", "0");
        passStack.style.removeProperty("--pass-stack-offset");
        passPeekLayer.replaceChildren();
        setPassBrand({
            name: "Flight log",
            logo: "",
            accent: "#4f6f8f",
            surface: "#ffffff",
            ink: "#26313b",
            muted: "#68757e",
            stub: "#f4f7f8",
        });
        passBrandName.innerHTML = '<i class="fas fa-plane-departure" aria-hidden="true"></i> Flight log';
        detail.setAttribute("aria-label", "Empty route boarding pass awaiting a flight selection");
    };

    const routeElements = [];
    const airportMarkers = new Map();
    let activeGroupIndex = 0;
    let activeJourneyIndex = 0;
    let activePassIndex = 0;
    let activeRoute = null;

    const showRoute = (route, groupIndex, journeyIndex, passIndex = 0) => {
        const routePasses = getRoutePasses(route);
        const wrappedPassIndex = routePasses.length ? (passIndex + routePasses.length) % routePasses.length : 0;
        const displayRoute = getDirectionalPassRoute(route, routePasses[wrappedPassIndex]);
        const airline = getAirlineIdentity(displayRoute, airlineCatalog);
        const journeyAirlines = getJourneyAirlines(displayRoute);
        const journeyCount = routeGroups[groupIndex].journeys.length;
        activeGroupIndex = groupIndex;
        activeJourneyIndex = journeyIndex;
        activePassIndex = wrappedPassIndex;
        activeRoute = route;
        origin.code.textContent = displayRoute.from.code;
        origin.city.textContent = displayRoute.from.city;
        destination.code.textContent = displayRoute.to.code;
        destination.city.textContent = displayRoute.to.city;
        const viaAirports = getRouteViaAirports(displayRoute);
        const returnViaAirports = getRouteReturnViaAirports(displayRoute);
        const hasConnections = viaAirports.length > 0 || returnViaAirports.length > 0;
        passPlane.classList.toggle("has-connection", hasConnections);
        const direction = createDirectionSymbol(displayRoute.roundTrip, displayRoute.transportMode);
        if (hasConnections) {
            const connection = document.createElement("span");
            connection.className = "aviation-boarding-pass-connection";
            const connectionCode = document.createElement("small");
            connectionCode.textContent = hasDirectionalReturn(displayRoute)
                ? `${viaAirports.length ? `→ ${viaAirports.map((airport) => airport.code).join(" / ")}` : ""}${viaAirports.length && returnViaAirports.length ? " · " : ""}${returnViaAirports.length ? `← ${returnViaAirports.map((airport) => airport.code).join(" / ")}` : ""}`
                : viaAirports.map((airport) => airport.code).join(" / ");
            connection.append(connectionCode);
            passPlane.replaceChildren(direction, connection);
            const outboundLabel = viaAirports.length
                ? `Outbound via ${viaAirports.map((airport) => `${airport.city}, ${airport.code}`).join(" and ")}`
                : "";
            const returnLabel = returnViaAirports.length
                ? `Return via ${returnViaAirports.map((airport) => `${airport.city}, ${airport.code}`).join(" and ")}`
                : "";
            passPlane.setAttribute("aria-label", [outboundLabel, returnLabel].filter(Boolean).join("; "));
        } else {
            passPlane.removeAttribute("aria-label");
            passPlane.replaceChildren(direction);
        }
        passDate.textContent = displayRoute.date || displayRoute.period || "";
        const flightNumberGroups = Array.isArray(displayRoute.flightNumberGroups)
            ? displayRoute.flightNumberGroups
                .map((group) => ({ ...group, numbers: Array.isArray(group.numbers) ? group.numbers.filter(Boolean) : [] }))
                .filter((group) => group.numbers.length)
            : [];
        const flightNumbers = flightNumberGroups.length
            ? flightNumberGroups.flatMap((group) => group.numbers)
            : Array.isArray(displayRoute.flightNumbers)
            ? displayRoute.flightNumbers.filter(Boolean)
            : (displayRoute.flightNumber ? [displayRoute.flightNumber] : []);
        const flightNumberLabels = flightNumbers.map((number) => {
            const operator = displayRoute.flightOperators?.[number];
            return operator ? `${number} · ${operator}` : number;
        });
        if (flightNumberGroups.length) {
            passType.replaceChildren(...flightNumberGroups.map((group) => {
                const row = document.createElement("span");
                row.className = "aviation-flight-number-row";
                if (group.airline) {
                    const groupAirline = getAirlineIdentity({ ...displayRoute, airline: group.airline }, airlineCatalog);
                    row.style.setProperty("--flight-row-accent", groupAirline.accent);
                    row.title = groupAirline.name;
                }
                const marker = document.createElement("span");
                marker.className = "aviation-flight-number-marker";
                marker.setAttribute("aria-hidden", "true");
                marker.textContent = group.marker || "";
                const numbers = document.createElement("span");
                numbers.textContent = group.numbers.map((number) => {
                    const operator = displayRoute.flightOperators?.[number];
                    return operator ? `${number} · ${operator}` : number;
                }).join(" / ");
                row.append(marker, numbers);
                return row;
            }));
        } else {
            passType.textContent = flightNumberLabels.length
                ? flightNumberLabels.join(" / ")
                : displayRoute.transportMode === "bus"
                ? "Bus journey"
                : displayRoute.transportMode === "car"
                ? "Road journey"
                : "Boarding pass";
        }
        passType.classList.toggle("has-flight-number", flightNumbers.length > 0);
        passType.classList.toggle("has-flight-groups", flightNumberGroups.length > 0);
        if (flightNumberGroups.length) {
            passType.setAttribute(
                "aria-label",
                flightNumberGroups.map((group) => {
                    const numbers = group.numbers.map((number) => {
                        const operator = displayRoute.flightOperators?.[number];
                        return operator ? `${number}, operated by ${operator}` : number;
                    });
                    return `${group.label || "Flights"} ${numbers.join(" and ")}`;
                }).join("; "),
            );
        } else if (flightNumbers.length) {
            const accessibleFlightNumbers = flightNumbers.map((number) => {
                const operator = displayRoute.flightOperators?.[number];
                return operator ? `${number}, operated by ${operator}` : number;
            });
            passType.setAttribute("aria-label", `Flight numbers ${accessibleFlightNumbers.join(" and ")}`);
        } else {
            passType.removeAttribute("aria-label");
        }
        journeyNavigation.hidden = journeyCount < 2;
        journeyPosition.textContent = `${journeyIndex + 1} of ${journeyCount}`;
        detailNote.textContent = displayRoute.note || "";
        setPassBrand(airline, journeyAirlines.slice(1));
        renderJourneyQr(route);
        updatePassStack(route, wrappedPassIndex);
        detail.setAttribute("aria-label", routeLabel(displayRoute, airlineCatalog));
        activeRoutePath.setAttribute("d", routeGroups[groupIndex].pathData);
        routeElements.forEach(({ element, groupIndex: elementGroupIndex }) => {
            element.classList.toggle("is-active", elementGroupIndex === groupIndex);
        });
        const activeAirports = new Set(getRouteAirports(route).map((airport) => airport.code));
        airportMarkers.forEach((marker, code) => {
            marker.classList.toggle("is-active", activeAirports.has(code));
        });
    };

    passPeekLayer.addEventListener("click", (event) => {
        if (!activeRoute) return;
        const passPeek = event.target.closest?.(".aviation-boarding-pass-peek");
        if (!passPeek) return;
        const nextPassIndex = Number.parseInt(passPeek.dataset.passIndex || String(activePassIndex), 10);
        showRoute(activeRoute, activeGroupIndex, activeJourneyIndex, nextPassIndex);
    });

    const showRouteGroup = (groupIndex, journeyIndex = 0) => {
        const journeys = routeGroups[groupIndex].journeys;
        const wrappedIndex = (journeyIndex + journeys.length) % journeys.length;
        showRoute(journeys[wrappedIndex], groupIndex, wrappedIndex);
    };

    previousJourney.addEventListener("click", () => showRouteGroup(activeGroupIndex, activeJourneyIndex - 1));
    nextJourney.addEventListener("click", () => showRouteGroup(activeGroupIndex, activeJourneyIndex + 1));

    let selectedAirport = null;
    let selectedAirportGroups = [];
    let selectedAirportGroupPosition = 0;
    const routeSummary = (route) => {
        const viaCodes = getRouteViaAirports(route).map((airport) => airport.code);
        const stops = [route.from.code, ...viaCodes, route.to.code].join("–");
        const returnViaCodes = getRouteReturnViaAirports(route).map((airport) => airport.code);
        if (hasDirectionalReturn(route)) {
            return `${stops} → ${[...returnViaCodes, route.from.code].join("–")}`;
        }
        return route.roundTrip ? `${stops} ⇄` : stops;
    };
    const renderAirportRouteSwitcher = () => {
        const groupIndex = selectedAirportGroups[selectedAirportGroupPosition];
        const route = routeGroups[groupIndex]?.route;
        if (!selectedAirport || !route) {
            airportRouteSwitcher.hidden = true;
            return;
        }
        airportRouteCode.textContent = selectedAirport.code;
        airportRouteSummary.textContent = routeSummary(route);
        airportRoutePosition.textContent = `Route ${selectedAirportGroupPosition + 1} of ${selectedAirportGroups.length}`;
        airportRouteSwitcher.setAttribute(
            "aria-label",
            `${selectedAirport.city} journeys. ${routeSummary(route)}, route ${selectedAirportGroupPosition + 1} of ${selectedAirportGroups.length}.`,
        );
        const hasMultipleRoutes = selectedAirportGroups.length > 1;
        previousAirportRoute.disabled = !hasMultipleRoutes;
        nextAirportRoute.disabled = !hasMultipleRoutes;
        airportRouteSwitcher.hidden = false;
    };
    const selectAirportRouteAt = (position) => {
        if (!selectedAirportGroups.length) return;
        selectedAirportGroupPosition = (position + selectedAirportGroups.length) % selectedAirportGroups.length;
        renderAirportRouteSwitcher();
        showRouteGroup(selectedAirportGroups[selectedAirportGroupPosition], 0);
    };
    const openAirportRouteSwitcher = (airport, servingGroups) => {
        selectedAirport = airport;
        selectedAirportGroups = servingGroups;
        const currentPosition = servingGroups.indexOf(activeGroupIndex);
        selectedAirportGroupPosition = currentPosition >= 0 ? currentPosition : 0;
        renderAirportRouteSwitcher();
        if (currentPosition < 0 && servingGroups.length) showRouteGroup(servingGroups[0], 0);
    };
    const closeAirportRouteSwitcher = () => {
        selectedAirport = null;
        selectedAirportGroups = [];
        airportRouteSwitcher.hidden = true;
    };
    previousAirportRoute.addEventListener("click", () => selectAirportRouteAt(selectedAirportGroupPosition - 1));
    nextAirportRoute.addEventListener("click", () => selectAirportRouteAt(selectedAirportGroupPosition + 1));

    const selectRouteGroup = (groupIndex) => {
        closeAirportRouteSwitcher();
        const routeGroup = routeGroups[groupIndex];
        const currentIndex = routeGroup.journeys.indexOf(activeRoute);
        const nextIndex = activeGroupIndex === groupIndex && currentIndex >= 0 && routeGroup.journeys.length > 1
            ? (currentIndex + 1) % routeGroup.journeys.length
            : 0;
        showRouteGroup(groupIndex, nextIndex);
    };

    const airports = new Map();
    routes.forEach((route) => getRouteAirports(route).forEach((airport) => airports.set(airport.code, airport)));
    const airportRouteGroups = new Map();
    routeGroups.forEach((routeGroup, groupIndex) => {
        getRouteAirports(routeGroup.route).forEach((airport) => {
            if (!airportRouteGroups.has(airport.code)) airportRouteGroups.set(airport.code, []);
            airportRouteGroups.get(airport.code).push(groupIndex);
        });
    });

    routeGroups.forEach((routeGroup, groupIndex) => {
        const journeyCount = routeGroup.journeys.length;
        const group = createSvgElement("g", {
            class: "aviation-route",
            tabindex: "0",
            role: "button",
            "aria-label": journeyCount > 1
                ? `${routeLabel(routeGroup.route, airlineCatalog)}. ${journeyCount} journeys on this route; select repeatedly to cycle through them.`
                : routeLabel(routeGroup.route, airlineCatalog),
        });
        group.append(
            createSvgElement("path", { class: "aviation-route-hit", d: routeGroup.pathData }),
            createSvgElement("path", { class: "aviation-route-line", d: routeGroup.pathData }),
        );
        group.addEventListener("click", () => selectRouteGroup(groupIndex));
        group.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectRouteGroup(groupIndex);
            }
        });
        routeElements.push({ element: group, groupIndex });
        routeLayer.append(group);
    });

    airports.forEach((airport) => {
        const point = projectAirport(airport);
        const servingGroups = airportRouteGroups.get(airport.code) || [];
        const marker = createSvgElement("g", {
            class: "aviation-airport",
            tabindex: "0",
            role: "button",
            "aria-label": `${airport.city} (${airport.code}), ${servingGroups.length} ${servingGroups.length === 1 ? "route" : "routes"}. Select to open its route switcher.`,
        });
        const title = createSvgElement("title");
        title.textContent = `${airport.code} · ${airport.city}`;
        marker.append(
            createSvgElement("circle", { class: "aviation-airport-hit", cx: point.x, cy: point.y, r: 5 }),
            createSvgElement("circle", { class: "aviation-airport-dot", cx: point.x, cy: point.y, r: 1.5 }),
            title,
        );
        marker.addEventListener("click", (event) => {
            event.stopPropagation();
            openAirportRouteSwitcher(airport, servingGroups);
        });
        marker.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openAirportRouteSwitcher(airport, servingGroups);
            }
        });
        airportMarkers.set(airport.code, marker);
        airportLayer.append(marker);
    });

    setDefaultDetail();
    mapPanel.append(map, mapControls, airportRouteSwitcher, passStack);
    layout.append(mapPanel);

    const previewAirlines = Object.values(airlineCatalog);
    if (!routes.length && previewAirlines.length) {
        const previewControls = document.createElement("div");
        previewControls.className = "aviation-airline-previews";
        previewControls.setAttribute("aria-label", "Preview airline boarding passes");
        const previewButtons = [];

        const showAirlinePreview = (airline, activeIndex) => {
            setPassBrand(airline);
            passDate.textContent = "Month · Year";
            detail.setAttribute("aria-label", `${airline.name} boarding pass preview`);
            previewButtons.forEach((button, index) => {
                const isActive = index === activeIndex;
                button.classList.toggle("is-active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });
        };

        previewAirlines.forEach((airline, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = airline.name;
            button.style.setProperty("--airline-preview-color", airline.accent);
            button.addEventListener("click", () => showAirlinePreview(airline, index));
            previewButtons.push(button);
            previewControls.append(button);
        });

        layout.append(previewControls);
        showAirlinePreview(previewAirlines[0], 0);
    }

    if (routeGroups.length) showRouteGroup(0);

    container.append(layout);
}

renderHighlights(profile.personal.highlights || [], collage);
renderGames(profile.personal.games, profile.personal.discord, gamesPanel);
if (supportPanel) renderSupport(profile.personal.teams || [], supportPanel);
renderAviationLogbook(profile.personal.aviation, aviationLogbook);
