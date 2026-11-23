# API Definition

`composal-openapi.json` is Composal's published OpenAPI definition for the Composal API
(titled "Vex API", the product's former name), vendored byte for byte.

| | |
|---|---|
| Source | https://composal.com/api/v1/openapi, linked as "Open the OpenAPI JSON" from the API reference (https://composal.com/docs/api.md). The same bytes are served at https://api.composal.com/api/v1/openapi |
| Fetched | 2026-11-23T23:53:44Z (`etag: W/"c6aef38516c16ba8e6d213a0c32150ea"`) |
| Size | 3743206 bytes |
| sha256 | `c6aef38516c16ba8e6d213a0c32150ea264d8aec5a98c4097fd1f5e2744657f4` |
| Version | `info.version` 1.0.0, OpenAPI 3.1.0: 1533 paths, 2008 operations, 1374 schemas |
| Terms | The definition declares no `license`, `termsOfService` or `contact`. The API reference says: "Use the generated OpenAPI document to build an SDK or typed client". Composal's terms of service (https://composal.com/legal/terms, L6 Software LTD trading as Composal, last updated 28 October 2026) keep "Composal's software, brand, and service technology" with Composal and do not address API clients or the documentation. |

The definition names no server. The API reference gives `https://api.composal.com` as the
hosted origin, keeping the `/api/v1/...` paths, so the build sets it with apidef's `server`
option in `.sdk/build/apidef.js`.

The definition covers more than the public API: it is generated from the application's
routes. The SDKs cover the areas the API reference lists, and the guide
(`.sdk/model/guide/guide.aontu`) switches the other routes off. Nothing in this file is
edited.
