# Barbearia Leme — Single Page

Demo for the **Single Page** package of Barbearia Leme.

One static page: hero, services and prices, opening hours, and the address with a map. Appointments go out through WhatsApp. There is no booking form, account, or database.

## Demos

- **Single Page** (this repository): <https://barbearia-leme-pagina.vercel.app>
- **Full site**: <https://barbearia-leme.vercel.app> — source: <https://github.com/EstiveJobson/barbearia-leme>

The full site is the other live demo and the reference for the brand (name, services, prices, hours, address, and photos). This page does not include the barbers, gallery, reviews, or booking flow from that site.

## Edit the shop

All shop data lives in [`config.js`](config.js). The page reads that file in the browser.

| Field | What it changes |
| --- | --- |
| `name`, `tagline` | Wordmark and the line under it |
| `services` | Name, description, and price in R$ |
| `hours` | Opening hours. A day with `closed: true` is marked Fechado |
| `address`, `mapQuery` | Address text, the embedded map, and the directions link |
| `whatsapp` | Area code + number, digits only, **without** the `55`. Every WhatsApp link is built from this value |
| `instagram` | Handle, without `@` |
| `hero`, `logo` | Hero photo paths and the logo file |
| `PACKAGES_URL` | Destination of the footer link "Ver os 3 pacotes" |

`PACKAGES_URL` currently points at the full site. It will later point to the package comparison page.

The share tags (`og:*`, Twitter, and the canonical link) are written directly in [`index.html`](index.html). They are not injected or rewritten by a build step. If the public URL changes, update those tags and `SITE_URL` together.

## Photos

The hero photograph is the same image used by the full site (Unsplash `photo-1503951914875-452162b0f3f1`). Sized WebP and AVIF files are in `images/`. The 1200×630 share image is `og.jpg`, made from that photo and the Leme logo.

## Local preview

Serve the folder with any static file server and open `index.html`. Paths are relative to the site root.
