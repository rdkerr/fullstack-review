const express = require('express');
const parser = require('body-parser');
const git = require('../helpers/github');
const db = require('../database/index');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());

app.post('/repos', function (req, res) {
  git.getReposByUsername(req.body.username, (results) => {
    results = JSON.parse(results);
    results.forEach((result) => {
      db.save({
        username: result.owner.login,
        reponame: result.name,
        url: result.html_url,
        forks: result.forks
      });

    });
    res.status(201).send();
  });
});

app.get('/repos', function (req, res) {
  db.get((data) => {
    res.status(200).send(data);
  });
});

let port = 1129;

app.listen(process.env.PORT || port, function() {
  console.log(`listening on port ${process.env.PORT || port}`);
});

