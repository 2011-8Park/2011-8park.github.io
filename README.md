# Suite 2011 · 8 Park Road

A responsive, static condo sale website. All property details and photos are clearly marked as coming soon until real listing content is provided.

## Edit

- `site/index.html`: page copy, listing facts, gallery, and contact section.
- `site/styles.css`: colours, typography, and responsive layouts.
- Replace the decorative hero illustration and gallery placeholders with actual property photos when available.

Open `site/index.html` in a browser to preview. No build tools or dependencies are required. Google Fonts are optional; local fallback fonts work offline.

## GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. The included `Publish condo website` workflow deploys the `site/` folder on pushes to `main`, or through **Actions → Publish condo website → Run workflow**.

Expected URL once enabled and deployed:
https://FriendlyNeighborhoodJ.github.io/2011_8ParkRd/

Only `site/` is included in the published artifact. Local SSH key files are ignored by Git and must never be committed.
