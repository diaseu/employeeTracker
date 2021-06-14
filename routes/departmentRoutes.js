// DEPARTMENT ROUTES
const router = require('express').Router()
const db = require('../db')

// use plural of data you're posting
router.get('/departments', (req, res) => {
  db.query('SELECT * FROM departments'), (err, departments) => {
    if (err) { console.log(err) }
    res.json(departments)
  }
})

// Create data
router.post('/departments', (req, res) => {
  db.query('INSERT INTO departments SET ?', req.body, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// Update data
router.put('/departments/:id', (req, res) => {
  db.query('UPDATE departments SET ? WHERE ?', [req.body, { id: req.params.id }], err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// Delete data
router.delete('/departments/:id', (req, res) => {
  db.query('DELETE FROM departments WHERE ?', { id: req.params.id }, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

module.exports = router