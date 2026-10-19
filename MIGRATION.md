# doc.t98.info Hugo → Nextra 移行調査

調査日: 2026-10-19  
対象ブランチ: `master`  
移行元: [t98info/doc.t98.info](https://github.com/t98info/doc.t98.info) (`master`, `175bcc47b821fc934d1eeffa44d2d8ffa2c0b6a4`)  
UI・実装参照: [terminal98/docs.t98.info](https://github.com/terminal98/docs.t98.info) (`master`, `369045a086382925a8e01f6236e80213ecc8ee83`)

## Phase 1: 現状調査

### 調査範囲と確認できた構成

GitHub上の両リポジトリの`master`を参照して調査した。現在の作業ディレクトリには`plan.md`のみがあり、移行元のローカルcheckoutではない。そのため、下記はGitHub上の調査時点のツリーと内容に基づく。作業開始時に対象ブランチの最新状態と差分を再確認する。

| 対象 | 確認結果 |
| --- | --- |
| 移行元 | Hugo構成。ツリーは136ファイル。`content/`のMarkdownは20件、公開用`docs/`にはHTML、RSS/XML、sitemap、静的アセットがある。 |
| コンテンツ | 固定ページ、2017〜2022年のお知らせ、記事のfront matter、tags/categoriesを確認。記事本文の修正は行わない。 |
| Hugo設定 | `config.toml`で`baseURL=https://doc.t98.info/`、`:filename/` permalink、`tags`と`categories` taxonomy、unsafe raw HTML、TOCレベル2〜6を設定。 |
| テーマ・shortcode | Git submodule `minimal-bootstrap-hugo-theme`。独自Flickr shortcodeと外部リンク用render-link hookがある。テーマの実体は移行元ツリーのsubmodule参照先で別途確認が必要。 |
| PoC | Next.js 15、Nextra 4、React 19、`output: 'export'`、`images.unoptimized`。Pagefindはpostbuildで`.next/server/app`を走査し、`out/_pagefind`へ出力する設定。 |
| PoC UI | `app/layout.jsx`でNextra docsのNavbar、Sidebar/Layout、右側TOC、Search、Footer、Banner、feedbackを設定。サイト名・Repository URL・Banner・feedbackはPoC固有のため本番向け調整対象。 |
| 参照制約 | PoCの`content/`はサンプルのindexとcospicのみで、移行元コンテンツの変換例はない。PoCの`_meta.js`はindexを隠す設定。 |

### Markdownファイル・URL対応の初期案

Hugoの`:filename/` permalinkと公開済み`docs/`を基準に旧URLを記録した。通常ページは同じURLをNextra側のファイル名へ対応させる。記事は移行時に`content/archive/`へまとめる案だが、公開パスは既存slugを維持する必要がある。`404.md`とルートページは別途実装する。

| 旧ファイル | 旧URL | 新ファイル案 | 新URL | 変換要否・特殊対応 |
| --- | --- | --- | --- | --- |
| `content/404.md` | `/404/`（404応答用`/404.html`も存在） | `app/not-found.jsx` | 404ページ | Hugo front matterをNext.js 404へ置換。GitHub Issueリンクとトップへのリンクを維持する。 |
| Hugoテーマ生成（`content/`にindexなし） | `/` | `content/index.mdx` | `/` | 現行トップはテーマ生成。見出し・記事一覧の要件を確認して再構成する。 |
| `content/about.md` | `/about/` | `content/about.mdx` | `/about/` | front matterをNextra metadataへ変換。本文内の外部URLは維持。 |
| `content/about-cos-camera.md` | `/about-cos-camera/` | `content/about-cos-camera.mdx` | `/about-cos-camera/` | front matterを変換。本文をそのまま移し、Twitter外部リンクを維持。 |
| `content/del-guide.md` | `/del-guide/` | `content/del-guide.mdx` | `/del-guide/` | 削除ガイドライン。本文の意味・表現を変更しない。 |
| `content/policy.md` | `/policy/` | `content/policy.mdx` | `/policy/` | プライバシーポリシー。本文の意味・表現を変更しない。 |
| `content/rule.md` | `/rule/` | `content/rule.mdx` | `/rule/` | 利用規約。本文の意味・表現を変更しない。内部リンク`/policy/`も維持。 |
| `content/post/2017/wcbbs-info20170316.md` | `/wcbbs-info20170316/` | `content/archive/wcbbs-info20170316.mdx` | `/wcbbs-info20170316/` | front matterのdate/category/tagを変換。 |
| `content/post/2017/wcbbs-info20170607.md` | `/wcbbs-info20170607/` | `content/archive/wcbbs-info20170607.mdx` | `/wcbbs-info20170607/` | front matterのdate/category/tagを変換。 |
| `content/post/2018/wcbbs-info20180221.md` | `/wcbbs-info20180221/` | `content/archive/wcbbs-info20180221.mdx` | `/wcbbs-info20180221/` | front matterと外部画像を変換。 |
| `content/post/2019/1904_dai-syasai.md` | `/1904_dai-syasai/` | `content/archive/1904_dai-syasai.mdx` | `/1904_dai-syasai/` | front matterと複数の外部画像URLを維持。 |
| `content/post/2019/c97-001.md` | `/c97-001/` | `content/archive/c97-001.mdx` | `/c97-001/` | front matterと画像リンクを維持。 |
| `content/post/2019/c97-501.md` | `/c97-501/` | `content/archive/c97-501.mdx` | `/c97-501/` | `draft: true`。ただし現行公開出力にページがあるためURL互換対象として要確認。 |
| `content/post/2019/c97-502.md` | `/c97-502/` | `content/archive/c97-502.mdx` | `/c97-502/` | `draft: true`、Hugo `{{< tweet ... >}}` shortcode、画像あり。公開出力にページがあるため要確認。 |
| `content/post/2019/end-homrin-bot.md` | `/end-homrin-bot/` | `content/archive/end-homrin-bot.mdx` | `/end-homrin-bot/` | front matterを変換。 |
| `content/post/2020/20021601.md` | `/20021601/` | `content/archive/20021601.mdx` | `/20021601/` | front matterを変換。 |
| `content/post/2020/c98-001.md` | `/c98-001/` | `content/archive/c98-001.mdx` | `/c98-001/` | 本文にHTTPの内部ドメイン画像を含む。HTTPS化・asset移管の要否を確認。 |
| `content/post/2020/c98-002.md` | `/c98-002/` | `content/archive/c98-002.mdx` | `/c98-002/` | 本文にHTTPの内部ドメイン画像、外部リンクを含む。 |
| `content/post/2020/report-comike-shinagawa.md` | `/report-comike-shinagawa/` | `content/archive/report-comike-shinagawa.mdx` | `/report-comike-shinagawa/` | 多数のraw HTML Flickr embedあり。表示とスクリプト読込方法を移行検討。 |
| `content/post/2021/c99-001.md` | `/c99-001/` | `content/archive/c99-001.mdx` | `/c99-001/` | 相対SVG画像`./c99-*.svg`が本文にある。元ファイルの所在・公開URLを調査して同じURLで配信する。 |
| `content/post/2022/0118234101.md` | `/0118234101/` | `content/archive/0118234101.mdx` | `/0118234101/` | front matterを変換。 |

`content/archive/`は情報設計の案であり、Nextraでファイルを移すだけでは記事の既存URLは保証されない。静的Export上のroute生成または互換用ページを実装し、出力URL一覧で検証する。

### Hugoが生成しているURL・ページ

`docs/`には通常の本文URLのほか、次のURL群が公開されている。記事をアーカイブにまとめても、これらのURLを消さないよう移行対象一覧に含める。

- 本文ページ: `/about/`、`/about-cos-camera/`、`/del-guide/`、`/policy/`、`/rule/`と各記事slug。`/`トップ、`/404/`、`/404.html`も出力済み。
- 古い出力にのみ存在する追加ページ: `/021601/`、`/5661384/`、`/kL5KtNRy7eWsoITdNA00DNbnF/`、`/aacp_96.html`、`/aacp_96.m3u`。HTMLのtitle/headingsを確認し、一部は既存記事との重複routeと判明。
- Taxonomy: `/tags/`と`/tags/<tag>/`、`/categories/`と`/categories/<category>/`。公開出力はtag 14種（`c97`, `c97_4日目`, `c98`, `hello`, `world`, `お知らせ`, `コミケ`, `コミックマーケット`, `ジャンルコード`, `企画枠`, `放送`, `放送関連お知らせ`, `車載`, `重要なお知らせ`）とcategory 7種（`hugo`, `ほむりんbot`, `ほむりんルーム`, `インフォ`, `コラム`, `ブログ`, `解散掲示板`）に加え、各一覧ページ。
- RSS/XML: `/index.xml`、`/post/index.xml`、tag/categoryの各`index.xml`、`/sitemap.xml`。RSSメニューを含め移行後の必要性と提供方法を決める。
- CNAME: `doc.t98.info`。ドメイン切替時も維持対象。

追加ページの照合結果:

| 旧URL | 既存コンテンツとの関係 | 移行時の対応 |
| --- | --- | --- |
| `/021601/` | 出力HTMLのtitleは「SNS運用終了のお知らせ(2/16)」。本文は`/20021601/`の記事と重複する旧slugと見られる。 | `/021601/`を互換routeとして残すか、旧URLから新しい正規URLへのredirectを用意する。 |
| `/5661384/` | 出力HTMLのtitleは「ほむりんbot サービス終了のお知らせ」。`/end-homrin-bot/`の記事と重複する旧slugと見られる。 | `/5661384/`を互換routeとして残すか、旧URLから新しい正規URLへのredirectを用意する。 |
| `/kL5KtNRy7eWsoITdNA00DNbnF/` | 出力HTMLの見出しは「差分くん v1」。Markdown記事ではなく、独立したツールHTML（約15.6KB、jQuery 1.12.4参照）。 | 専用の静的HTML/ページとして保持するか、現行稼働状況・利用状況を確認して扱いを決める。 |
| `/aacp_96.html` | standalone HTML。titleなし、見出しは「bgm」。 | `/aacp_96.m3u`と合わせ、参照元・利用状況を確認して保持方法を決める。 |
| `/aacp_96.m3u` | 公開済みプレイリスト。 | ファイルを同じパスで配信できる形で移行する。 |
| `/404.html` と `/404/` | 同じ404ページが両方出力されている。 | Export後に404表示・応答と旧パスを確認する。 |

なお、出力HTMLはいくつか`/site.webmanifest`と`/safari-pinned-tab.svg`を参照するが、調査時点のGitツリーでは該当ファイルを確認できない。リンク切れ候補としてアセット検査に含める。

公開済み`docs/`の同梱アセットは`c99-001/c99-0.svg`、`c99-1E.svg`、`c99-1WN.svg`、`c99-2E.svg`、`c99-2WN.svg`の5点、favicon一式、title logo、Bootstrap CSS/JSとjQuery。別途、`static/`にもfavicon一式とtitle logoがある。`aacp_96.m3u`も公開ファイルとして残っている。外部画像を含め、参照元ファイルとの対応を次段階で全件照合する。

### 特殊記法・コンテンツリスク

| 項目 | 確認内容 | 対応メモ |
| --- | --- | --- |
| Front matter | title/date/draftに加え、記事でtags/categoriesを使用。確認した20件に`aliases`はない。 | metadataへ機械的に写し、`draft: true`の扱いは公開済み出力と照合する。 |
| Hugo shortcode | `content/post/2019/c97-502.md`にTweet shortcode。Flickr shortcode定義は`layouts/shortcodes/flickr.html`。 | Tweet内容の代替表示、Flickr embedの実際の使用箇所・スクリプトを個別確認する。 |
| Raw HTML | Hugo unsafe設定有効。`report-comike-shinagawa.md`に複数のFlickr用`<a>`/`<img>`埋め込み。 | MDX構文で有効な形に調整。意味・本文を変更しない。 |
| Markdown拡張 | definition list、footnote、linkify、strikethrough、table、task list、typographer、heading attributes、TOCを有効化。 | Nextra/MDXでの互換状況を変換前に確認する。 |
| リンク・画像 | 外部画像が複数のホストにある。C99記事には相対`.svg`、C98記事には`http://ex.t98.info/...`画像あり。 | 既存URLと画像の所在を照合し、HTTPS・ローカル移管を決める。リンクの機械検査対象にする。 |
| `aliases` | 現行Markdown front matterに検出なし。 | 公開済みHTML、sitemap、外部リンクは別に調査し、MDだけでURL一覧を作らない。 |

### UI・実装参照元の確認

PoCの現行ファイルは次の通り。

| PoCファイル | 引き継ぎ候補 | 本番調整・確認 |
| --- | --- | --- |
| `app/layout.jsx` | Nextra `Layout` / `Navbar` / `Footer` / Search、`getPageMap()`、`lang="ja"` | サイト名、metadata、footer、Banner削除、feedback要否、Repository URLを変更。 |
| `app/[[...mdxPath]]/page.jsx` | Nextra静的MDX route、metadata、WrapperとTOC処理 | 本番のroute/path生成と旧URL維持を確認。 |
| `next.config.mjs` | `output: 'export'`、画像最適化無効 | PoC固有の設定が残らないか、静的出力を確認。 |
| `mdx-components.js` / `app/styles.css` | MDX component mappingとスタイル | raw HTML、画像、コードブロック等が既存本文で動くか確認。 |
| `content/_meta.js` | Nextra navigation metadata | archiveをナビゲーションで隠しつつ一覧ページ等から到達可能にする。 |
| `package.json` / lockfile | Pagefindを含む依存・postbuildの参考 | バージョン、静的出力を検索対象にするPagefindの入力パスと出力パスを確認。 |
| `.github/workflows/nextjs.yml` | GitHub Actionsのbuild/deploy例 | `t98info/doc.t98.info`の配信元・公開方法に合わせて作り直す。現状はGitHub Pages向け設定。 |

## Phase 2: 作業ブランチ

`t98info/doc.t98.info`の`master`（調査時点のHEAD `175bcc47b821fc934d1eeffa44d2d8ffa2c0b6a4`）から`migrate/nextra`を作成する。

| 作業 | 結果 |
| --- | --- |
| GitHub API / App経由の操作 | 使用しない。ブランチ作成APIは`403 Resource not accessible by integration`を返したため、git CLIへ切り替えた。 |
| `git clone` | 成功。ローカルMacに設定済みのgit認証を使い、`/private/tmp/doc-t98-info-migration`へcloneした。 |
| `git fetch origin` | 成功。remoteを確認し、`migrate/nextra`はまだ存在しない。 |
| `master`のHEAD | `175bcc47b821fc934d1eeffa44d2d8ffa2c0b6a4`。 |
| `migrate/nextra` | ローカルブランチを作成し、この調査記録を追加してpushする。 |
| `master`への変更 | なし。 |
| 作業環境 | 作業checkoutは`/private/tmp/doc-t98-info-migration`。会話のworkspace側には`plan.md`と調査記録を置いている。 |

Phase 1の追加調査と以後の変更は`migrate/nextra`上で行う。`master`は変更しない。

## 次の調査で確定すること

1. `docs/`内の追加HTML・画像・SVG・添付ファイルと各Markdownの対応関係、必要な旧URLの全リスト。
2. `docs/`内のHTMLと現在のMarkdownの差（draft記事、生成時期、ソース不在ページの特定）。
3. submodule theme、Hugo生成設定、既存公開ワークフローと実際の本番配信経路。
4. 内部リンク・外部リンク・画像参照を全ファイルから抽出し、移行後の検査一覧にする。
5. Pagefind対象と日本語検索の確認方法。PoCのファイルツリーにはPagefind専用UIやその設定ファイルはなく、`package.json`とworkflowでCLI実行を確認した。

本記録はPhase 1の初期調査であり、上記の確定後にURL対応表を完成させる。Phase 3以降の実装は行っていない。
