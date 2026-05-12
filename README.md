# Uranai Garden

占い・診断・おみくじ系エンタメサイトの Next.js MVP です。スマホファースト、静的生成中心、SEO/OGP/構造化データ、広告・アフィリエイト枠、LINE/メール登録 CTA、関連記事/人気コンテンツ導線を最初から入れています。

## セットアップ

```bash
npm install
npm run dev
```

開発サーバーは通常 `http://localhost:3000` で起動します。

## 本番ビルド

```bash
npm run lint
npm run build
npm run start
```

Next.js 16 系を想定しています。Node.js は 20.9 以上を使ってください。

## 環境変数

`.env.example` を参考に `.env.local` を作成します。

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SITE_NAME=Uranai Garden
NEXT_PUBLIC_LINE_CTA_URL=https://line.me/R/ti/p/@your-line-id
NEXT_PUBLIC_EMAIL_CTA_URL=https://example.com/newsletter
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

## Vercel デプロイ手順

1. GitHub にリポジトリを作成して push
2. Vercel で New Project からリポジトリを選択
3. Framework Preset は Next.js
4. Environment Variables に `.env.example` と同じキーを設定
5. Deploy を実行
6. 独自ドメイン設定後、`NEXT_PUBLIC_SITE_URL` を本番URLへ変更

## データ追加方法

占い・記事データは `src/lib/content.ts` に集約し、一部の占いデータとアフィリエイト設定は JSON で管理しています。

- 今日の運勢: `dailyFortunes`
- 星座: `zodiacSigns`
- タロット: `tarotCards`
- おみくじ: `omikujiResults`
- 夢占い: `dreams`
- 記事: `articles`
- 診断: `diagnosisContent`
- おみくじJSON: `src/content/omikuji.json`

アフィリエイトリンクは JSON で管理しています。

- `src/content/affiliate-links.json`

商品を増やす場合は `items` に `id`, `category`, `title`, `description`, `priceLabel`, `badge`, `url` を追加してください。

## AdSense 設定

広告枠は `src/components/AdSlot.tsx` で共通化しています。

配置済みの広告枠:

- 記事上部: `article-top`
- 記事中: `article-middle`
- 記事下: `article-bottom`
- サイドバー: `sidebar`
- 結果ページ下部: `result-bottom`

本番では AdSense 審査後、`NEXT_PUBLIC_ADSENSE_CLIENT` を設定し、`AdSlot` 内を実際の `ins.adsbygoogle` タグに差し替えてください。

## アフィリエイト ID 設定

`.env.example` に以下のキーを用意しています。

```bash
AFFILIATE_TAG_BOOKS=your-book-affiliate-tag
AFFILIATE_TAG_GOODS=your-goods-affiliate-tag
AFFILIATE_TAG_BEAUTY=your-beauty-affiliate-tag
```

MVPでは `src/content/affiliate-links.json` の `url` に仮リンクを置いています。ASPやAmazonアソシエイト等の審査後、カテゴリごとに実リンクへ差し替えてください。

## SEO 実装

- `title` / `description` / OGP / canonical: `src/lib/seo.ts`
- sitemap.xml: `src/app/sitemap.ts`
- robots.txt: `src/app/robots.ts`
- Article 構造化データ: 記事詳細
- FAQ 構造化データ: トップ・記事詳細
- BreadcrumbList 構造化データ: 詳細ページ
- 内部リンク: 人気コンテンツ、関連記事、今日の運勢 CTA

## TODO

- GoogleフォームやFormspree等でお問い合わせ送信を有効化
- AdSense 審査後に本番広告タグへ差し替え
- ASP審査後に商品リンクを本番リンクへ差し替え
- 診断結果別の静的OGP画像生成を追加
- GA4/Search Console 連携
- 夢占いと記事をさらに拡充
- 商品ランキングの更新日とレビュー根拠を運用で追加
