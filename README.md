# Suite 2011 · 8 Park Road

A responsive, static condo sale website. Listing details remain marked as coming soon. The gallery includes three unaltered owner photos and an interactive, AI-illustrated floor plan. The original plan remains linked. The neighbourhood map uses Leaflet, OpenStreetMap tiles, and an official TDSB attendance boundary.

## Edit

- `site/index.html`: page copy, listing facts, gallery, and contact section.
- `site/styles.css`: colours, typography, and responsive layouts.
- `site/tour.js`: photo titles, descriptions, and viewer navigation.
- `site/assets/`: published photos and floor plan. Numbered `data-view` links in the HTML map to the corresponding photo in `tour.js`; marker positions use percentages of the original plan image.
- The hero uses an actual property photo. No virtually staged property photographs are used.
- `site/neighbourhood.js`: map pins and catchment controls. `site/assets/rosedale-catchment.js` contains the boundary copied from the TDSB map on October 6, 2026. School assignment is confirmed by the TDSB street guide (Park Rd: 8 Only). Distances are rounded straight-line calculations, not walking routes.
- The 10/10 school score is explicitly historical (2022–23, Fraser 2024 report); do not relabel it as a current rating.
- `Resources/floorplan_generation_prompt.md`: generation prompt and input roles. The style-reference image is a different unit and is not published.

Open `site/index.html` in a browser to preview. No build tools or dependencies are required. Google Fonts are optional; local fallback fonts work offline.

## GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. The included `Publish condo website` workflow deploys the `site/` folder on pushes to `main`, or through **Actions → Publish condo website → Run workflow**.

Expected URL once enabled and deployed:
https://FriendlyNeighborhoodJ.github.io/2011_8ParkRd/

The workflow packages only the root entry page, `.nojekyll`, and `site/`. This preserves identical URLs whether Pages publishes from the branch or the workflow. Local SSH key files are ignored by Git and must never be committed.
