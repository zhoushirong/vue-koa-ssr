#!/bin/bash
set -o errexit

echo "-------- nodejs install start ----- "
# build.sh 中 compress.dir 的属性值
echo "------- 进入 compressed 目录 ------- "
cd compressed
echo "------- 安装 nodejs 依赖 ------- "
npm install --production
echo "-------- nodejs install end ----- " 

