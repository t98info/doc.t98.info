# GitHub Pages deployment

The site is a Next.js static export (`output: 'export'`) and can be hosted on GitHub Pages. The workflow in `.github/workflows/pages.yml` builds the static site and deploys it from `master`. Pull requests run the build but do not publish the site.

The build must use `npm run build`, which runs the `postbuild` step to generate Pagefind's Japanese search index and the legacy alias routes in `out/`.

## Repository settings

Before the first production deploy:

1. In **Settings → Pages**, set the source to **GitHub Actions**.
2. In **Settings → Environments → github-pages**, retain the Pages deployment environment.
3. In **Settings → Branches** (or **Rulesets**), protect `master`: require changes to arrive through pull requests and block force pushes. Add required review or status checks according to the repository's team policy.

The Pages workflow is intentionally limited to `master`; feature branches and pull requests cannot replace the production deployment.

## Custom domain cutover

The site currently serves `doc.t98.info` through the Cloudflare Pages project `doc-t98-info`. Keep that service and DNS in place while preparing GitHub Pages. The repository includes `public/CNAME`, which Next exports to `out/CNAME`.

After the GitHub Pages workflow has deployed successfully and the result has been reviewed:

1. Set `doc.t98.info` as the custom domain in **Settings → Pages** and wait for domain verification.
2. At the DNS provider, point `doc.t98.info` to the GitHub Pages host `t98info.github.io` using a CNAME record. If Cloudflare DNS is used, set the record to DNS-only during validation.
3. Verify HTTPS and the key routes, including `/`, `/rule/`, `/archive/`, search, and the RSS feed.
4. After the domain resolves to GitHub Pages and validation passes, disable Cloudflare Pages production deployment. Keep the project available for rollback until the new host is stable.

Do not change the production DNS record as part of a feature-branch deploy. The DNS change is the final hosting cutover step.

## Branch workflow

Create a feature branch from the latest `master`, push that branch, and open a pull request. Do not push commits directly to `master`. Merge only after the Pages build check passes and the change is reviewed. The branch rule must be enabled in GitHub repository settings; a workflow file alone cannot prevent direct pushes.
