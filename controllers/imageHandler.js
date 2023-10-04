const clarifai = require('clarifai');


const imageHandler = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => res.json(entries[0].entries))
    .catch((error) => res.status(404).json('Failed to get count'));
};
module.exports = {
  imageHandler,
  apiCallHandler,
};
