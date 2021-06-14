// ROLE ROUTES
const router = require('express').Router()
const db = require('../db')

// use plural of data you're posting
router.get('/roles', (req, res) => {
  db.query('SELECT * FROM roles'), (err, roles) => {
    if (err) { console.log(err) }
    res.json(roles)
  }
})

// Create data
router.post('/roles', (req, res) => {
  db.query('INSERT INTO roles SET ?', req.body, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// Update data
router.put('/roles/:id', (req, res) => {
  db.query('UPDATE roles SET ? WHERE ?', [req.body, { id: req.params.id }], err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// Delete data
router.delete('/roles/:id', (req, res) => {
  db.query('DELETE FROM roles WHERE ?', { id: req.params.id }, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

module.exports = router