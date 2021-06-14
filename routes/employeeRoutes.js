// EMPLOYEE ROUTES
const router = require('express').Router()
const db = require('../db')

// use plural of data you're posting
router.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees'), (err, employees) => {
    if (err) { console.log(err) }
    res.json(employees)
  }
})

// Create data
router.post('/employees', (req, res) => {
  db.query('INSERT INTO employees SET ?', req.body, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// Update data
router.put('/employees/:id', (req, res) => {
  db.query('UPDATE employees SET ? WHERE ?', [req.body, { id: req.params.id }], err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// Delete data
router.delete('/employees/:id', (req, res) => {
  db.query('DELETE FROM employees WHERE ?', { id: req.params.id }, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

module.exports = router