# Private aviation QR notes architecture

Status: Deferred for later implementation.

The aviation logbook should support one- or two-word private notes inside its boarding-pass QR codes. The website and repository may remain public, but only the owner’s authorised device should be able to recover the plaintext. The QR, source code, and repository must never contain the plaintext note or a decryption key.

## Recommended design

Use a randomly generated 256-bit master key held only on authorised devices. Encrypt every note locally with AES-256-GCM before adding it to the website. The public QR contains a self-contained encrypted envelope, while decryption happens locally on the owner’s device.

This is stronger than password protection. A short PIN such as `2605` can be brute-forced offline and is suitable only for a visual prototype.

## Storage boundaries

| Location | Data stored |
| --- | --- |
| Public repository | QR rendering code, encrypted envelopes, format version, and non-secret key identifiers |
| Public QR code | Format version, key identifier, unique nonce, ciphertext, and authentication tag |
| Authorised device | One non-exportable 256-bit AES key |
| Private backup | A recoverable copy of the AES key, protected separately |
| Never stored publicly | Plaintext notes, AES keys, PINs, passwords, or recovery material |

No private database or authentication server is required for the basic design.

## Encrypted payload

Use a compact, versioned payload encoded with Base64URL:

```text
avlog:v1:<key-id>:<nonce>:<ciphertext-and-tag>
```

- `v1` identifies the payload format.
- `key-id` selects the correct key after future key rotation and is not secret.
- `nonce` is a new random 12-byte value for every note.
- `ciphertext-and-tag` is the AES-GCM output, including its 16-byte authentication tag.

The same nonce must never be deliberately reused with the same key. Generate it with the browser or operating system cryptographic random-number generator.

## Creating a private note

1. Open a local authoring utility that is not deployed with the public site.
2. Enter the one- or two-word note.
3. Load the private master key from secure device storage.
4. Generate a new random nonce.
5. Encrypt the UTF-8 note with AES-256-GCM.
6. Produce the versioned encrypted envelope.
7. Store only that envelope in the journey record in `content/profile.js`.
8. Render the envelope as the boarding-pass QR code.

The plaintext should be cleared from the form after encryption and must never be written to the repository, browser logs, analytics, or build output.

## Reading a private note

1. Scan the QR using the private decoder.
2. Parse and validate the payload version and key identifier.
3. Load the matching non-exportable AES key from the authorised device.
4. Decrypt and authenticate the ciphertext locally.
5. Display the note only after AES-GCM verification succeeds.

A wrong key or altered QR must fail without revealing partial plaintext.

## Private decoder

The strongest option is an offline installed PWA or small native application that scans the QR and stores its key using non-exportable Web Crypto storage or the phone’s secure key store. It should not need to contact the public website to decrypt a note.

A public decoder webpage is possible, with the encrypted payload in a URL fragment, but it trusts future JavaScript served from that origin. A compromised deployment could use a device-held browser key to decrypt notes. Prefer an offline decoder if the threat model requires stronger isolation from the public website.

## Key setup and recovery

- Generate the master key once using a cryptographically secure random-number generator.
- Store it as a non-exportable key on each authorised device.
- Keep one encrypted recovery copy in a password manager or offline encrypted storage.
- Record a non-secret key identifier with every encrypted note.
- Support key rotation without rewriting old notes immediately.
- Test recovery before relying on the system.

Losing every copy of the key makes all notes permanently unrecoverable. Anyone who obtains the key can decrypt every note created with it.

## Implementation checklist

1. Remove the `2605` password demonstration before production deployment.
2. Define and document the binary payload format and Base64URL encoding.
3. Build a local key-generation and recovery utility.
4. Build the local note-encryption utility.
5. Add an encrypted-note field to aviation journey data.
6. Render the self-contained encrypted envelope in each applicable QR.
7. Build the private offline decoder and QR scanner.
8. Store the device key as non-exportable wherever the platform permits.
9. Test correct-key, wrong-key, altered-payload, key-loss, backup, and rotation scenarios.
10. Keep PNRs, booking credentials, and other live travel secrets out of the system.

## Deferred decisions

- Whether the decoder will be an offline PWA or a native mobile application.
- How the recovery key will be backed up and imported onto a replacement device.
- Whether multiple personal devices should share one master key or receive separately wrapped keys.
- Whether encrypted notes should be available only through direct QR scanning or also through clicking the QR on the website.
