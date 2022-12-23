import userModels from "../models/userModels.js";
import Joi from "joi";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const data = req.body;

        const schema = Joi.object({
            name: Joi.string().min(5).required(),
            phone: Joi.string().min(12).required(),
            email: Joi.string().email().min(6).required(),
            userName: Joi.string().min(3).required(),
            password: Joi.string().min(6).required()
        });

        const { error } = schema.validate(data);

        if (error) {
            return res.send({
                error: {
                    message: error.details[0].message,
                }
            });
        };

        // Check if email is already registered
        const isAlready = await userModels.findOne({
            where: {
                email: data.email
            }
        });

        if (isAlready) {
            return res.send({
                error: {
                    message: `Account with email: ${data.email} is Already`,
                },
            });
        };

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Register the user if email is not already registered
        const newUser = await userModels.create({
            name: data.name,
            phone: data.phone,
            email: data.email,
            userName: data.userName,
            password: hashedPassword,
        });

        res.send({
            status: "Success",
            message: "Register Success",
            newUser,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
            error: {
                message: `Account with email: ${req.body.email} is Already`
            }
        });
    };
};


export const login = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const data = req.body;

        const schema = Joi.object({
            email: Joi.string().email().min(6).required(),
            userName: Joi.string().min(3).required(),
            password: Joi.string().min(6).required()
        });

        const { error } = schema.validate(data);

        if (error) {
            return res.send({
                error: {
                    message: error.details[0].message,
                },
            });
        };

        // Check if email exists in the database
        const userExist = await userModels.findOne({
            where: {
                email: data.email
            }
        });

        if (!userExist) {
            return res.send({
                error: {
                    message: `Email or Password not match`
                },
            });
        };

        // Check if password is correct
        const isValid = await bcrypt.compare(data.password, userExist.password);

        if (!isValid) {
            return res.send({
                error: {
                    message: `Email or Password not match`
                },
            });
        };

        res.send({
            status: "Success",
            message: "Login Success",
            data,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
            error: {
                message: `Email or Password not match`
            }
        });
    };
};

