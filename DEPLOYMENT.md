# Cloudflare Pages deployment

This site is a Next.js static export. Configure the Cloudflare Pages Git integration with:

| Setting | Value |
| --- | --- |
| Repository | `t98info/doc.t98.info` |
| Production branch | `master` |
| Framework preset | Next.js (Static HTML Export) |
| Root directory | `/` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js | `22` (pinned by `.nvmrc`) |

Use `npm run build` so its `postbuild` step creates Pagefind's Japanese search index and the two legacy alias routes before Cloudflare uploads `out/`. The GitHub Pages workflow and its `.nojekyll` / `CNAME` artifacts are not used by Cloudflare Pages.

## Custom domain

After the first Pages deployment, add `doc.t98.info` under the project's **Custom domains** settings. Cloudflare Pages requires the hostname to be associated with the Pages project before its DNS record is routed there. If `t98.info` is managed by the same Cloudflare account, the dashboard can create the DNS record; otherwise create the instructed CNAME at the current DNS provider. Do not change the live DNS record until the Pages deployment and custom domain are ready to serve production traffic.

## Branch behavior

Keep `master` as the production branch while `migrate/nextra` is under review. Cloudflare Pages Git integration can publish non-production branches as preview deployments. Promote this branch only after the static build, URLs, and custom domain have been reviewed.

The existing Cloudflare Pages project is `doc-t98-info`, connected to this repository with `master` as the production branch. Its build command and output directory are set to `npm run build` and `out`. The `doc.t98.info` custom domain remains attached. No Cloudflare credentials are required in this repository for Git integration.
