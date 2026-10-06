# Suite 2011 · 8 Park Road

A responsive, static condo sale website. Listing details remain marked as coming soon. The gallery includes three supplied photos and an interactive floor plan.

## Edit

- `site/index.html`: page copy, listing facts, gallery, and contact section.
- `site/styles.css`: colours, typography, and responsive layouts.
- `site/tour.js`: photo titles, descriptions, and viewer navigation.
- `site/assets/`: published photos and floor plan. Numbered `data-view` links in the HTML map to the corresponding photo in `tour.js`; marker positions use percentages of the original plan image.
- The decorative hero illustration can be replaced with a property photo later.

Open `site/index.html` in a browser to preview. No build tools or dependencies are required. Google Fonts are optional; local fallback fonts work offline.

## GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. The included `Publish condo website` workflow deploys the `site/` folder on pushes to `main`, or through **Actions → Publish condo website → Run workflow**.

Expected URL once enabled and deployed:
https://FriendlyNeighborhoodJ.github.io/2011_8ParkRd/

Only `site/` is included in the published artifact. Local SSH key files are ignored by Git and must never be committed.
