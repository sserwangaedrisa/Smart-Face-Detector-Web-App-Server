const clarifai = require('clarifai');

const apiCallHandler = (req, res) => {
  const raw = JSON.stringify({
    inputs: [
      {
        data: {
          image: {
            url: req.body.input,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 7dd352e7546e4369812f85f7503a5b26', // Replace with your Clarifai API key
    },
    body: raw,
  };

  fetch(
    `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
    requestOptions
  );
};

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
