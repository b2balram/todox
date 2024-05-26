const express = require('express')
const TodoController = require('../controllers/todoController')
const router = express.Router();

router.post('/', TodoController.create);
router.get('/', TodoController.findAll);
router.put('/:id', TodoController.update);
module.exports = router