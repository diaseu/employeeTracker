const router = require('express').Router()

router.use('/api/department', require('./departmentRoutes.js'))
router.use('/api/role', require('./roleRoutes.js'))
router.use('/api/employee', require('./employeeRoutes.js'))

module.exports = router
