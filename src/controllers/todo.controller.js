const todoModel = require('../models/todo.model')
const jwt = require('jsonwebtoken')

async function createList(req, res) {
    try {
        const { title, description, dueDate, isCompleted } = req.body
    
        const isTitleExist = await todoModel.findOne({ title })
    
        if (isTitleExist) {
            return res.status(401).json({
                message: "Title Exist"
            })
        }
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        
        const todo = await todoModel.create({
            title, description, dueDate, isCompleted
        })
    
        res.status(201).json({
            message: "Created Successfully",
            todo
        })
    }
    catch (err) {
        return res.status(401).json({
            message: "error",
            error: err.message
        })
    }
}

async function getList(req, res) {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        
        const allList = await todoModel.find()
        
        res.status(200).json({
            message: "View All todo",
            allList
        })
    }
    catch (err) {
        return res.status(401).json({
            message: "error",
            error: err.message
        })
    }
}

async function updateList(req, res) {
    try {
        const { title, description, dueDate, isCompleted } = req.body
        const id = req.params.id
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        
    
        const updatedTodo = await todoModel.findByIdAndUpdate(
            id,
            { title, description, dueDate, isCompleted },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json({
            message: "Updated Successfully",
            updatedTodo
        });
    }
    catch (err) {
        res.status(401).json({
            message: "error",
            error: err.message
        })
    }
}

async function deleteList(req, res) {
    try {
        const id = req.params.id
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        
        
        const deletedTodo = await todoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json({
            message: "Deleted Successfully", 
            deletedTodo
        });
    }
    catch (err) {
        res.status(401).json({
            message: "error",
            error: err.message
        })
    }
}

module.exports = { createList, getList, updateList, deleteList }