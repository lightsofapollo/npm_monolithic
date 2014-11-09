# npm_monolithic

Example of monolithic project with multiple packages in a single repository.

## How it works

This works via a small set of hacks and npm configuration tricks:

  - set the "prefix" for local package installs to this project.

  - the `link` configuration in npm must be true this will symlink packages
    from the globally (global is now in the folder so this works)
    installed packages.

  - currently running npm install from the root package does not seem to
    use linking functionality (this could be a bug?) so we have a
    linkify.sh preinstall hook which runs npm install / link manually in
    each sub project to ensure dependencies are installed and linked.

  - in the "root" (never to be published) package use file: dependencies
    so npm / node commands work as usual.

## How to cache it?

Running a local registry is not a terrible option but is not the only
option for simple cases you can hash the contents of package.json and
store the node_modules folder as a tar.gz somewhere. This project
breaks those basic assumptions but this still can work via:

  - read package.json
  - hash each package.json in the sub packages
  - hash looks like:

    > md5 package.json
    > md5 sub1/package.json
    > md5 sub2/package.json

  - upload globally installed packages (the sum of all sub dependencies)

When downloading the cache running |npm install| again will work by
setting up the symlinks in the sub projects again.
