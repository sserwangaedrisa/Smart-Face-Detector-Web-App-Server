const validator = require('validator');

function isValidEmail(email) {
  return validator.isEmail(email);
}

const RegisterHandler = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);
  if (!email || !password || !name) {
    return res.status(400).json('Incolect form inputs');
  } else if (!isValidEmail(email)) {
    return res.status(400).json('Invalid email');
  } else if (password.lenth < 4) {
    return res.status(400).json('Short password');
  } else if (name.lenth > 20) {
    return res.status(400).json('Too long name');
  } else {
    db.transaction((trx) => {
      trx
        .insert({
          email: email,
          hash: hash,
        })
        .into('login')
        .returning('email')
        .then((returnedEmail) => {
          const emailFromDB = returnedEmail[0].email;
          return trx('users').returning('*').insert({
            email: emailFromDB,
            name: name,
            joined: new Date(),
          });
        })
        .then((response) => {
          res.json(response[0]);
        })
        .then(trx.commit)
        .catch((error) => {
          trx.rollback();
          res.status(500).json('An error occurred while adding the user');
        });
    });
  }
};

module.exports = {
  RegisterHandler: RegisterHandler,
};
