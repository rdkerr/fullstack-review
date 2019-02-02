const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  reponame: String,
  username: String,
  url: { type: String, unique: true },
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  let newRepo = new Repo(repo)
  .save((err, data) => {
    if (err) {
      if (err.code === 11000) {
        console.log('Already present in database.')
      } else {
        console.log('ERROR:', err);
      }
    } else {
      console.log('New repo saved');
    }
  });
}

let get = (callback) => {
  Repo.find().sort('-forks').limit(25).find(function (err, posts) {
    callback(posts);
  });
}

module.exports.save = save;
module.exports.get = get;