# Wigley's Wheels

Static website for Wigley's Wheels — a curated classic car and motorcycle collection. The design (colours, fonts, logo) matches the Wigley's Wheels business card.

## Structure

- `index.html` — home page with hero and featured vehicles
- `inventory.html` — full, filterable vehicle listing (cars / motorcycles)
- `about.html` — about the business (placeholder copy, edit freely)
- `contact.html` — contact details and enquiry form (Netlify Forms)
- `data/vehicles.js` — vehicle inventory data (edit this to add/remove/update stock)
- `css/style.css` — all styling
- `js/main.js` — nav toggle + inventory rendering/filtering
- `images/` — placeholder SVGs; replace with real vehicle photos

## Editing the inventory

Open [`data/vehicles.js`](data/vehicles.js) and edit the `VEHICLES` array. Each entry is currently just a name and photo — no pricing, shown as "Coming Soon":

```js
{
  id: "m1",
  type: "motorcycle",              // "car" or "motorcycle"
  name: "Triumph Bonneville T120",
  image: "images/bikes/bonneville.jpg" // path to the real photo
}
```

Once you're ready to start listing prices, mileage, etc., re-add those fields to the data and update `vehicleCardHTML` in [`js/main.js`](js/main.js) to display them.

## Running locally

No build step required — just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploying to Netlify

1. Push this repo to GitHub (already set up as a remote).
2. In Netlify: **Add new site → Import an existing project → GitHub**, pick this repo.
3. Build command: leave blank. Publish directory: `.` (already set in `netlify.toml`).
4. Deploy. The contact form on `contact.html` works automatically via Netlify Forms — submissions appear under **Site → Forms** in the Netlify dashboard.
