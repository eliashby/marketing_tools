#!/usr/bin/env bash

read -p "Are you sure you want to update S3 production files? (y/n)" desc

if [[ $desc == "y" ]]
then
  echo "Updating S3 production files"
  aws s3 sync ../marketing-library s3://response-web/production/forms/marketing-library/ --exclude "*" --include "index.html" --include "dist/build.js" --include "README.md" --acl public-read --profile web-dev
else
  echo "S3 update aborted"
fi
