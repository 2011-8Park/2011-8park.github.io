"""Package the website with a direct homepage and compatible site/ URLs."""
import argparse
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]


def homepage():
    source = (ROOT / "site/index.html").read_text()

    def prefix(match):
        attribute, url = match.groups()
        if url.startswith(("#", "http:", "https:", "mailto:", "/")):
            return match.group(0)
        return f'{attribute}="site/{url}"'

    return re.sub(r'(src|href)="([^"]+)"', prefix, source)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path)
    parser.add_argument("--sync-root", action="store_true")
    args = parser.parse_args()
    if args.sync_root:
        (ROOT / "index.html").write_text(homepage())
    if args.output:
        args.output.mkdir(parents=True, exist_ok=True)
        shutil.copytree(ROOT / "site", args.output / "site", dirs_exist_ok=True)
        (args.output / "index.html").write_text(homepage())
        shutil.copyfile(ROOT / ".nojekyll", args.output / ".nojekyll")
