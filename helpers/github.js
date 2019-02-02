const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  request.get({
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else {
        callback(data);
      }
  });
}

module.exports.getReposByUsername = getReposByUsername;