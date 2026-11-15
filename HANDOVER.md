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

The user clarified that there is one AMD–BOM round trip in 2025 and one Mumbai journey in 2026. The 2026 journey is represented in May as another transport mode to Mumbai followed by the Akasa return `QP-6763`.

## QR note prototype

Multiple aviation journeys now carry password-protected memories:

- `content/profile.js` assigns each journey a unique `qrNoteId`.
- Each QR links to `aviation-note.html#<note-id>`.
- `assets/js/pages/aviation-note.js` stores only AES-GCM ciphertext envelopes, not the memory text or password.
- `assets/js/aviation-note-crypto.js` performs PBKDF2 key derivation and AES-GCM decryption in the browser.
- The temporary shared drafting password is `KP2605`.

This is still a prototype. The shared drafting password can be brute-forced offline and must not be presented as meaningful privacy. Before production, choose the final password and re-encrypt every memory with fresh salts and nonces.

## Deferred private-note architecture

The intended production architecture is documented in `docs/aviation-qr-private-notes.md`. The recommended direction is:

1. Generate a random 256-bit master key held only on authorised devices.
2. Encrypt each note locally with AES-256-GCM and a unique 12-byte nonce.
3. Put a self-contained, versioned encrypted envelope in the public QR.
4. Decrypt with a private offline PWA or native decoder using a non-exportable device key.
5. Keep one protected recovery copy of the key outside the repository.

Before production implementation, remove or replace the `KP2605` demonstration, choose the decoder format, define key backup and rotation, and test wrong-key, altered-payload, recovery, and device-migration scenarios.

## Additional incomplete metadata

The January 2022 AMD to DEL round trip was for the Dutch SemEx visa; its airline and flight numbers remain unknown. A separate June 2023 AMD to DEL round trip was for the Swedish master’s visa and also has unknown airline and flight details. The EIN to BGY round trip remains undated with neutral styling. The July 2023 AMD to MAA round trip also has neutral styling because its airline and flight numbers have not yet been supplied. The EIN to VIE round trip is now dated July 2022, with Ryanair outbound and Lauda Air return; its flight numbers remain unknown.

The June 2019 Ahmedabad–Jodhpur return is intentionally included even though it was a bus journey. It uses `transportMode: "bus"`, bus-specific labeling, and an encrypted memory note so it remains in the chronological story without being presented as a flight.

The May–August 2024 Stockholm–Ahmedabad round trip remains grouped as one international journey. A July 2024 mixed journey sits beside it and contains an AMD–BLR flight, a BLR–MAA drive, and an MAA–AMD flight. A separate Summer 2024 AMD–BOM round trip represents the Bombay–Imagica journey. Airlines and flight numbers for both side journeys remain unknown.

The December 2024 Stockholm–Ahmedabad memory is intentionally incomplete and must be expanded when the user remembers the missing detail.

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
