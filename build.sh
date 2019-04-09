#!/bin/bash
set -o errexit
echo "---------------------------- build start ----------------------------"
install_nvm(){
  if [ -z $NVM_DIR ]
  then
    export NVM_DIR="$HOME/.nvm"
  else
    export NVM_DIR
  fi

  echo $NVM_DIR
  echo "$(ls -a $NVM_DIR)"
  if [ -s "$NVM_DIR/nvm.sh" ]
  then
    . "$NVM_DIR/nvm.sh"
  else
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
    . "$NVM_DIR/nvm.sh"
  fi
}
install_nvm 
echo "-------- install_nvm completed ----- "
nvm install 10.15.0
nvm use 10.15.0

#rm -rf node_modules;rm -rf ./server/node_modules;rm -rf ./client/node_modules;rm -rf ./server/package-lock.json;rm -rf ./client/package-lock;rm -rf dist;
echo "-------- install start ----- " 
npm install
echo "-------- install end ----- " 

echo "-------- build client start ----- "
npm run build
echo "-------- build client success! ----- "

echo "-------- build_project completed ----- "

