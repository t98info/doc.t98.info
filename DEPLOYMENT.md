# GitHub Pages deployment

The site is a Next.js static export (`output: 'export'`) and can be hosted on GitHub Pages. The workflow in `.github/workflows/pages.yml` builds the static site and deploys it from `master`. Pull requests run the build but do not publish the site.

The build must use `npm run build`, which runs the `postbuild` step to generate Pagefind's Japanese search index and the legacy alias routes in `out/`.

## Repository settings

GitHub Pages uses **GitHub Actions** as its source. The repository ruleset protects `master` by requiring pull requests and blocking force pushes. Changes must be made on a feature branch and merged through a pull request; the Pages workflow deploys only commits merged to `master`.

## Custom domain and rollback

`doc.t98.info` is configured as the GitHub Pages custom domain. Cloudflare DNS now points the `doc` CNAME to `t98info.github.io` with proxying disabled, so GitHub Pages serves production traffic. The Pages certificate may take time to provision after the DNS change; check **Settings → Pages** for DNS and HTTPS status.

The Cloudflare Pages project `doc-t98-info` and its prior deployments remain available for rollback. Its Git connection is disconnected, its `pages.dev` hostnames are restricted by Cloudflare Access, and the retained `doc.t98.info` custom-domain association is inactive. The Pages project remains until the GitHub Pages site is considered stable. The repository includes `public/CNAME`, which Next exports to `out/CNAME`.

A rollback requires promoting a retained Cloudflare deployment, restoring the `doc` CNAME target to `doc-t98-info.pages.dev` with proxying enabled, and adjusting the Cloudflare Access restriction for the public hostname before opening the site to visitors. Check that the intended deployment is available before changing DNS.

The unused `docs.t98.info` hostname has been retired: its DNS record and redirect rule were removed. The PoC repository `terminal98/docs.t98.info` is private and archived.

## Branch workflow

Create a feature branch from the latest `master`, push that branch, and open a pull request. Do not push commits directly to `master`. Merge only after the Pages build check passes and the change is reviewed. The repository ruleset enforces the pull request requirement; a workflow file alone cannot prevent direct pushes.
