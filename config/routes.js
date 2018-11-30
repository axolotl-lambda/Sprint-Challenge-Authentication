const axios = require('axios')

const { authenticate } = require('./middlewares')
const db = require('../database/dbConfig.js')

module.exports = server => {
  server.post('/api/register', register)
  server.post('/api/login', login)
  server.get('/api/jokes', authenticate, getJokes)
}

function register(req, res) {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 4)
  db('users')
    .insert({ username, password: hash })
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err))
}

function login(req, res) {
  const { username, password } = req.body

  db('users')
    .where({ username })
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        // generate token
        // const token = generateToken({ ...user })
        res.status(200).json({ message: 'you may pass', token })
      } else {
        res.status(401).json({ message: 'you shall not pass' })
      }
    })
    .catch(err => res.status(500).json(err))
}

function getJokes(req, res) {
  axios
    .get('https://safe-falls-22549.herokuapp.com/random_ten')
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err })
    })
}
