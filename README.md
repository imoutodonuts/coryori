# Coryori

与朋友分享你的食谱。

## Usage

[安装 CouchDB](https://docs.couchdb.org/en/stable/install/index.html)

安装完成后打开 `CORS` 并新建一个名为 `coryori` 的数据库。

将以下命令的占位符替换为真实数据库信息，并加上前缀 `coryori://` 即可分享给你的朋友。

```sh
printf 'http(s)://username:password@host:port/database-name' | base64
```

[下载 Coryori](https://github.com/imoutodonuts/coryori/releases)

将解压后的文件部署于你的服务器，打开页面后输入上述链接即可同步服务器数据。

> 由于 `Web Crypto API` 的限制，请部署于 `SSL` 站点。

## Build

```sh
git clone https://github.com/imoutodonuts/coryori.git
cd coryori
npm install
npm run build
```
