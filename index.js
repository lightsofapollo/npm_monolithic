var fork = require('child_process').fork;

/**
Tiny wrapper for splitting up NODE_PATH
*/
function getPaths() {
  if (!process.env.NODE_PATH) {
    return [];
  }
  return process.env.NODE_PATH.split(':');
}


function main() {
  var modulePaths = getPaths();

  // In the case where we do not have module paths setup for this repo fork the
  // process and with the right configuration....
  if (modulePaths.indexOf(__dirname) === -1) {
    modulePaths.push(__dirname);
    var envs = {};
    for (var key in process.env) envs[key] = process.env[key];
    envs.NODE_PATH = modulePaths;

    // Not concerned about memory here though maybe we should be.
    var childProc = fork(__filename, process.argv.slice(2), { env: envs })
    return;
  }

  console.log(require('package_b'));
  console.log(require('package_a'));
}

main();
