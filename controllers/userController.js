import userModels from "../models/userModels.js";

export const addUser = async (req, res) => {
    try {
        const data = req.body;
        const cretaedData = await userModels.create(data);

        res.setHeader('Content-Type', 'application/json');
        res.send({
            status: "Success",
            message: "Add Data user finished",
            data: cretaedData,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await userModels.find();
        res.setHeader('Content-Type', 'application/json');

        // res.json(users);
        res.send({
            data: {
                users
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        // const id = req.params
        const userId = await userModels.findById(req.params.id);
        res.setHeader('Content-Type', 'application/json');

        // res.json(userId);
        res.send({
            status: "Success",
            message: `Get user with ID: ${req.params.id} success`,
            data: {
                userId
            },
        });
    } catch (error) {
        console.log(error);
        // res.status(500).json({
        //     message: error.message
        // });
        res.send({
            status: "Failed",
            message: `Get user with ID: ${req.params.id} not found`
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModels.updateOne({_id:req.params.id}, {$set: req.body});
        res.send({
            status: "Success",
            message: `Update User with ID: ${req.params.id} Success`,
            data:{
                updatedUser
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
            status:"Failed",
            message:`Update User with ID: ${req.params.id} Error`
        });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModels.deleteOne({_id:req.params.id});
        res.send({
            status:"Success",
            message: `Delete User with ID: ${req.params.id} Success`,
            data: {
                deletedUser
            }
        });

    } catch (error) {
        console.log(error);
        res.send({
            status:"Failed",
            message: `Delete User with ID: ${req.params.id} Failed`
        });
    }
};