const lib = require('./lib/processor');

exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  return await lib.handler(event);
};
