---
title: 'Laravelの認証機能をカスタマイズした時の話'
date: '2020-10-03 20:56:00'
---

はじめにデータベース設計ありきでLaravelアプリの開発を始めて、Laravel標準の認証機能を使いたいという欲張りな希望に四苦八苦した話。

<br>

## RegisterControllerの変更

```php
protected function validator(array $data)
{
    return Validator::make($data, [
        'USR_firstName' => ['required', 'string', 'max:255'],
        'USR_lastName' => ['required', 'string', 'max:255'],
        'USR_firstKana' => ['required', 'string', 'max:255'],
        'USR_lastKana' => ['required', 'string', 'max:255'],
        'USR_mail' => ['required', 'string', 'email', 'max:255', 'unique:M_users'],
        'USR_password' => ['required', 'string', 'min:8', 'confirmed'],
    ]);
}
protected function create(array $data)
{
    return User::createUser(
        $data['USR_firstName'],
        $data['USR_lastName'],
        $data['USR_firstKana'],
        $data['USR_lastKana'],
        $data['USR_mail'],
        Hash::make($data['USR_password']),
    );
}
```

何はともあれユーザ登録からということで、バリデータに通すデータを追加したり、ユーザ作成関数を変更したりなどした。

ここで注意したいのが、バリデータのメールの部分で、ユニーク制約を設定している部分。

「unique:」の後ろに対象となるテーブル名を指定しなければいけないのだが、これが分からなくて難儀した。

最初は「unique:users」となっていたのだが、ユーザテーブルの名称を「M_users」にしていたので、「unique:M_users」にしなければいけなかった。普通に見逃してしまっていた。

<br>

## LoginControllerの変更

```php
public function username()
{
    return 'USR_mail';
}
```

最終的には変更はこれだけになった。

username()とはユーザ名に使用するカラム名を指定する関数になる。デフォルトではメールアドレスが指定されている。自分の変更も接頭辞がついたメールアドレスカラムになっている。

ユーザのログインには当然、メールアドレスの他にパスワードも必要となる。だがこれが問題だった。

パスワードについてはLaravelのソースコードにハードコードされていて、ユーザ名（メールアドレス）のように後からの変更が難しい感じだった。何のためにEloquentのモデルを使っているのかって感じではあるが、しっかりと文字列で「password」と指定されているのだからどうしようもなかった。

ハードコードされている理由はよく分からないが、Laravelのソースコードにまで手を入れるのは避けたかったのでDB設計の方を曲げることにした。残念。

<br>

## 終わりに

ビューテンプレートの変更については割愛。

とりあえず、これで動いた。Laravel標準の認証機能の恩恵を受けられるなら多少の苦労も安いものだ。

変更したコードの量は大したことは無かったが、Laravel本体のソースコードを覗き込んだのは初めてだったので、結構楽しかった。あーでもない、こーでもないと右往左往するのは楽しい。

結論としては、フレームワークが指定するルールには従っておくのがベターだという、ありきたりなものになった。

このことは記録に残しておこうと思ったので、記事にしてみましたとさ。

おしまい。