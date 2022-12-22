import categoryModel from "../models/categoryModel.js";

export const addCategory = async (req, res) => {
    try {
        const data = req.body;
        const createdCategory = await categoryModel.create(data);
        res.setHeader('Content-Type', 'application/json');
        
        res.send({
            status: "Success",
            message: "Add Category Finished",
            data: createdCategory,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const getCategorys = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.setHeader('Content-Type', 'application/json');

        res.send({
            data:{
                categories
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const getCategoryId = async (req, res) => {
    try {
        const categoryId = await categoryModel.findById(req.params.id)
        res.setHeader('Content-Type', 'application/json')

        res.send({
            status: "Success",
            message: `Get Category with ID: ${req.params.id} success`,
            data: {
                categoryId
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: `Get Category with ID: ${req.params.id} not found`
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryModel.updateOne({_id:req.params.id},  {$set: req.body});
        res.send({
            status: "Success",
            message: `Updated Category with ID: ${req.params.id} Success`,
            data:{
                updatedCategory
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: `Updated Category with ID: ${req.params.id} Error`
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory= await categoryModel.deleteOne({_id:req.params.id});
        res.send({
            status: "Success",
            message: `Delete Category with ID: ${req.params.id} Success`,
            data:{
                deletedCategory
            }
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: `Delete Category with ID: ${req.params.id} Failed`
        });
    }
};