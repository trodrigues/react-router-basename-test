#!/bin/bash
set -e

PAGES_DIR=./gh-pages
REPO="git@github.com:trodrigues/react-router-basename-test.git"

echo "Publishing"

# get the gh-pages branch of the repo
if [ ! -d $PAGES_DIR ] ; then
  git clone --single-branch --branch gh-pages $REPO $PAGES_DIR
fi

cp index.html dist/*.js $PAGES_DIR

pushd $PAGES_DIR
git add .
git commit -a -m "update"
if [ $? -eq 1 ] ; then
  echo "Nothing to update"
else
  git push origin gh-pages
fi
popd
