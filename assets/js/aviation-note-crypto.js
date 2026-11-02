const decoder = new TextDecoder("utf-8", { fatal: true });
const encoder = new TextEncoder();

function fromHex(value) {
    if (!value || value.length % 2 || !/^[0-9a-f]+$/iu.test(value)) {
        throw new Error("Invalid encrypted note");
    }
    return Uint8Array.from(value.match(/.{2}/gu), (pair) => Number.parseInt(pair, 16));
}

export async function decryptLockedNote(payload, password) {
    const [version, iterationValue, saltValue, ivValue, cipherValue, ...extra] = payload.split(".");
    const iterations = Number.parseInt(iterationValue, 10);
    if (
        version !== "v1"
        || extra.length
        || !Number.isInteger(iterations)
        || iterations < 100000
        || iterations > 1000000
    ) {
        throw new Error("Invalid encrypted note");
    }

    const salt = fromHex(saltValue);
    const iv = fromHex(ivValue);
    const cipher = fromHex(cipherValue);
    if (salt.length < 12 || iv.length !== 12 || cipher.length < 17) {
        throw new Error("Invalid encrypted note");
    }

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveKey"],
    );
    const key = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"],
    );
    const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
    return decoder.decode(plaintext);
}
