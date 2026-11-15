import { decryptLockedNote } from "../aviation-note-crypto.js?v=20261102-1";

const lockedNotes = Object.freeze({
    "april-2023-demo": "v1.250000.83700ed65d8917a471b87c80c597d2b2.daac0d751fe50b3674297440.dbb7bcf9cc4691a5ec1faa0bb45edf5749db8eb803bc586d09cf97",
});

const card = document.querySelector("[data-note-card]");
const form = document.querySelector("[data-note-form]");
const passwordInput = document.querySelector("[data-note-password]");
const submitButton = document.querySelector("[data-note-submit]");
const status = document.querySelector("[data-note-status]");
const result = document.querySelector("[data-note-result]");
const noteId = decodeURIComponent(window.location.hash.slice(1));
const payload = lockedNotes[noteId];

if (!payload) {
    form.hidden = true;
    status.textContent = "This encrypted note is unavailable.";
} else if (!globalThis.crypto?.subtle) {
    form.hidden = true;
    status.textContent = "This browser cannot decrypt the note.";
} else {
    passwordInput.focus();
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        card.classList.remove("has-error");
        passwordInput.removeAttribute("aria-invalid");
        passwordInput.disabled = true;
        submitButton.disabled = true;
        submitButton.textContent = "Unlocking…";

        try {
            const note = await decryptLockedNote(payload, passwordInput.value);
            passwordInput.value = "";
            form.hidden = true;
            status.textContent = "Unlocked.";
            result.textContent = note;
            result.hidden = false;
        } catch {
            card.classList.add("has-error");
            passwordInput.setAttribute("aria-invalid", "true");
            status.textContent = "That password did not unlock this note.";
            passwordInput.select();
        } finally {
            passwordInput.disabled = false;
            submitButton.disabled = false;
            submitButton.textContent = "Unlock";
        }
    });
}
