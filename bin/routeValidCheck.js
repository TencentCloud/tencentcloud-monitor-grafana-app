const fs = require('fs');

function hasPrefix(str, prefix) {
  return str.length >= prefix.length && str.slice(0, prefix.length) === prefix;
}
function getMatchedIndex(path, routes) {
  let resIndex = null;
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < routes.length; i++) {
    if (hasPrefix(path, routes[i].path)) {
      resIndex = i;
      break;
    }
  }
  return resIndex;
}
function run() {
  fs.readFile('src/datasource/plugin.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      throw err;
    }
    const errPaths = [];
    try {
      const { routes } = JSON.parse(data);
      routes.forEach(({ path }, indx) => {
        const matchedIndx = getMatchedIndex(path, routes);
        const isValid = matchedIndx === indx;
        if (!isValid) errPaths.push(`The path named: ${path} has a wrong match, expect ${indx} found ${matchedIndx}`);
      });
      if (errPaths.length > 0) throw new Error(errPaths.toString());
      console.log('check task complete, ok');
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
}

run();
