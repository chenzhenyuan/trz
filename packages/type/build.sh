#!/usr/bin/env zsh

TARGET="./release"

if [[ -e release ]]; then
  rimraf release
  echo '删除最近一次残存文件'
fi

sleep 1

# -----
babel src --out-dir="$TARGET" --extensions=".ts" --config-file="../../.babelrc" --no-comments

tsc --baseUrl "." --rootDir "./src" --outDir "$TARGET"

cpr package.json release/
cpr README.md release/
cpr LICENSE release/
cpr CHANGELOG.md release/
