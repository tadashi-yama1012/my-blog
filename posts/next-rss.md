---
title: 'Next.jsでRSSなライブラリ作った！'
date: '2020-09-28 16:04:00'
tag: 'programming,javascript,next.js'
---

以前にもNext.jsなブログサイトでRSSを生成するコードを書いたのだが、あまり汎用的ではなかった。

今回、next-sitemapを参考（というか丸パクリ）にして[next-rss](https://www.npmjs.com/package/next-rss)なるライブラリを作ってみた。

```js
module.exports = {
    siteTitle: 'example web site',
    siteDescription: 'example web site rss feed',
    siteLanguage: 'en',
    siteCopyright: '©Tadashi Yamazaki',
    siteUrl: 'http://example.com',
    outDir: 'public',
    postsDir: 'posts',
}
```

こんな内容の設定ファイル「next-rss.js」をルートディレクトリに配置して、

```sh
npm run build
npx next-rss
```

を実行すればpublicディレクトリにRSSとATOMを吐いてくれる。

デプロイ用のNPMスクリプトに上記のコマンドを追加してやれば、デプロイするごとにRSSを作成できる。やったね！