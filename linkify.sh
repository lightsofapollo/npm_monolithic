#! /bin/bash -e

# Ensure we are linked to the correct package versions...
for package in "package_a package_b"; do
  full_path=$PWD/$package
  cd $full_path
  npm install
  cd ..
  npm link $full_path
done
