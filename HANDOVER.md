# Aviation logbook handover

The Showcase page now contains the interactive passenger aviation logbook, route map, grouped journey navigation, airline-styled boarding passes, multi-pass stacks, and the QR note prototype. The public page is `showcase.html`; `side-quests.html` and the previous Showcase renderer were removed.

## Missing Mumbai journeys

The user has said that a couple of journeys involving Mumbai are still missing. Do not infer or merge them without confirmation. Ask for the approximate dates, other endpoint, airline, known flight numbers, and whether each memory was one-way, a return trip, or one leg of a longer journey.

Mumbai-related records already present are:

- November 2022: MAA to AMD via BOM on Go First, `G8-304` and `G8-364`, grouped with the January 2023 return to MAA.
- April 2023: MAA to BOM, BOM to AMD, and AMD to MAA as one three-pass journey.
- September 2025: AMD to BOM and back by air; the return currently carries Akasa `QP-1528`, while the outbound flight number is still unknown.
- May 2026: AMD to BOM by another transport mode, then BOM to AMD on Akasa `QP-6763`; only the flown return has a boarding pass.

Treat any additional Mumbai memories as new records unless the user explicitly identifies one as a correction to these entries.

## QR note prototype

The April 2023 journey currently has a password-protected demonstration:

- `content/profile.js` assigns the note ID `april-2023-demo`.
- The QR links to `aviation-note.html#april-2023-demo`.
- `assets/js/pages/aviation-note.js` stores only an AES-GCM ciphertext envelope.
- `assets/js/aviation-note-crypto.js` performs PBKDF2 key derivation and AES-GCM decryption in the browser.
- Password `2605` reveals the demonstration note `window seat`.

This is a prototype only. A four-digit PIN can be brute-forced offline and must not be presented as meaningful privacy. The QR also points at the public site, so it will return a missing-page response until these files are deployed.

## Deferred private-note architecture

The intended production architecture is documented in `docs/aviation-qr-private-notes.md`. The recommended direction is:

1. Generate a random 256-bit master key held only on authorised devices.
2. Encrypt each note locally with AES-256-GCM and a unique 12-byte nonce.
3. Put a self-contained, versioned encrypted envelope in the public QR.
4. Decrypt with a private offline PWA or native decoder using a non-exportable device key.
5. Keep one protected recovery copy of the key outside the repository.

Before production implementation, remove or replace the `2605` demonstration, choose the decoder format, define key backup and rotation, and test wrong-key, altered-payload, recovery, and device-migration scenarios.

## Additional incomplete metadata

Two AMD to DEL round trips and the EIN to BGY and EIN to VIE round trips are present as separate memories with neutral styling. Their dates, airlines, and flight numbers have not yet been supplied.

## Default highlighted journey

The widget currently highlights the first route in `profile.personal.aviation.routes` on load. That is the May to July 2010 Emirates AMD to Birmingham round trip via Dubai. It is also the earliest journey in the logbook, so keeping it as the default creates a chronological starting point.

Before changing the default, decide whether the first impression should be the earliest memory, the most recent completed journey, or a deliberately representative trip. Do not rely on accidental array order if a different policy is chosen; make the selection rule explicit in the renderer or route data.

## Interaction guidance

The widget has several interactions but no visible instructions. Users can select routes and airports, hover a route to focus it, drag to pan, use the map controls to zoom, cycle journeys that share one route, and select exposed boarding passes in a multi-pass stack.

Consider adding one restrained line of guidance inside or immediately below the map, for example:

```text
Select a route or airport · drag to pan · use +/− to zoom · select an exposed pass to change flights
```

Keep it visually secondary and avoid a large instructional panel. On narrow screens, shorten the copy or reveal it through a small information control. Preserve keyboard focus states and descriptive labels even if the visible hint remains minimal.

## Map path refinement

The current neutral paths are acceptable but remain visually dense around India, the Middle East, and central Europe. Shared segments receive small bend offsets, active routes are strongly highlighted, and inactive routes recede. A broader fan-out treatment was previously tested and rejected because it looked artificial.

Potential refinements for a later pass:

- Reduce inactive-route contrast slightly more when a route or airport is active.
- Improve hit areas independently of the visible stroke width so thin paths remain easy to select.
- Preserve shared physical segments instead of separating them into conspicuous parallel lanes.
- Use subtle bundling or progressive disclosure near dense hubs rather than large curve offsets.
- Recheck route curvature at multiple zoom levels, especially around DXB, AUH, DOH, BOM, AMD, and DEL.
- Keep map paths neutral; airline identity belongs on the boarding passes rather than the route colours.

Any refinement should preserve the current minimal appearance and the existing rule that `1 of N` navigation represents journeys sharing the same route, not different route shapes.

## Repository state

- The work is local and has not been pushed or published.
- The site is static and requires no build step.
- The QR generator is vendored at `assets/js/vendor/qrcode-generator.js`.
- Airline logos and the world map are stored under `assets/images/airlines/` and `assets/images/maps/`.
