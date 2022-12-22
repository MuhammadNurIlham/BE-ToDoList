import todoModels from "../models/todoModels.js";

export const addTodo = async (req, res) => {
    try {
        const todo = req.body;
        const createTodo = await todoModels.create(todo);
        res.setHeader('Content-Type', 'application/json');

        res.send({
            status: "Success",
            message: "Created To Do List Finished",
            todo: createTodo,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const getTodos = async (req, res) => {
    try {
        const todos = await todoModels.find().populate('user', 'name').populate('category', 'name');
        res.setHeader('Content-Type', 'application/json');

        res.send({
            data: {
                todos
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const getTodoId = async (req, res) => {
    try {
        const todoId = await todoModels.findById(req.params.id);
        res.setHeader('Content-Type', 'application/json');

        res.send({
            status: "Success",
            message: `Get Todo with ID: ${req.params.id} success`,
            data: {
                todoId
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: `Get Todo with ID: ${req.params.id} not found`
        });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await todoModels.updateOne({ _id: req.params.id }, { $set: req.body });
        res.send({
            status: "Success",
            message: `Updated Todo with ID: ${req.params.id} Success`,
            data: {
                updatedTodo
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: `Update Todo with ID: ${req.params.id} Error`
        });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await todoModels.deleteOne({ _id: req.params.id });
        res.send({
            status: "Success",
            message: `Delete Todo with ID: ${req.params.id} Success`,
            data: {
                deletedTodo
            }
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: `Delete Todo with ID: ${req.params.id} Failed`
        });
    }
};