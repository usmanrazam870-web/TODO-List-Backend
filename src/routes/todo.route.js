const express=require('express')
const todoController=require('../controllers/todo.controller')
const router=express.Router()


router.post('/add',todoController.createList)
router.get('/view',todoController.getList)
router.patch('/update/:id',todoController.updateList)
router.delete('/update/:id',todoController.deleteList)

module.exports=router