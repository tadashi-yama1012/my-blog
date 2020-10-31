---
title: '今どきのJScript（2020年10月版）'
date: '2020-10-31 16:30:00'
---

最近、JScriptをいじる機会があったのでその備忘録。

JScriptは仕様的にはES3に基づいているらしい。ES3て・・・

なので当然、最近の書き方なんて通用しない。だから、ES2015とか使いたいならトランスパイルするしかない。

BabelとWebpackを使う。

preset-envのtargetsは「ie:'8'」。core-jsは使用しない。looseをtrueにして、modulesはfalse。

webpackは必ずモードを「production」にする。「development」だとObject.definePropertyを使われてエラーになる。

あと、webpackを使用するのは出力ファイルのエンコーディングをUTF-16LEにしたいから。
「[webpack-encoding-plugin](https://www.npmjs.com/package/webpack-encoding-plugin)」を使う。

このへんをどうにかできるならrollupでも良い。

あとはpakage.jsonにbrowserslistにdefaultを指定しておく。

これでES2015でモジュールなJavaScriptをJScriptにできる・・・はず。

<br>

正直、苦痛でしかないのでやめよう。