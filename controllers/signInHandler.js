const signInHandler = (req, res, db, bcrypt) => {
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', req.body.email)
          .then((response) => {
            res.json(response[0]);
          })
          .catch((error) => {
            res.status(400).json('Unabale to find the user');
          });
      } else {
        res.status(404).json('Wrong cridentials');
      }
    })
    .catch((err) => res.status(400).json('Invalid credentials'));
};
module.exports = {
  signInHandler,
};
