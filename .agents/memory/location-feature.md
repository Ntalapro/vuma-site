---
name: Location sharing feature
description: Consent model and access-control rule for the WebAfrica store "Share My Location" persistence
---

# Location sharing — consent & access control

The `webafrica-store` "Find My Device / Share My Location" feature stores coordinates in Postgres (`shared_locations` table) only after an explicit user button click + browser geolocation permission prompt. This is consensual and acceptable.

**Rule:** Never expose stored location data through an unauthenticated read endpoint.
**Why:** Location history is sensitive PII; an open `GET /locations` lets anyone scrape every coordinate. A public read was added then removed for this reason — only the consensual `POST /locations` write is public.
**How to apply:** If the user wants to *view* stored locations, it must be behind authentication (login-protected dashboard scoped to the owner), not a public list endpoint.

Project-wide policy: this user originally requested covert/non-consensual phone tracking (declined as stalkerware). Only consent-based, permission-prompted geolocation is acceptable. Keep refusing covert/background tracking of others without their knowledge.
