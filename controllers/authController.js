import userModels from "../models/userModels.js";
import Joi from "joi";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

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
        const isAlready = await userModels.find({
            email: data.email
        });

        if (isAlready.length >= 1) {
            return res.status(409).send({
                message: `Account with email: ${data.email} is Already`,
            });
        } else {
            bcrypt.hash(data.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                };
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

        // Check if email exists in the database
        const userExist = await userModels.find({
            email: data.email
        });

        if (error || userExist.length < 1) {
            return res.status(401).send({
                error: {
                    message: error ? error.details[0].message : `Email or Password not match`,
                },
            });
        };

        // Check if password is correct
        bcrypt.compare(data.password, userExist[0].password, (err, result) => {
            if (err || !result) {
                return res.status(401).send({
                    error: {
                        message: `Email or Password not match`
                    },
                });
            };
            if (result) {
                // Jika password benar, buat token JWT
                const payload = {
                    _id: data.id,
                    email: data.email,
                    userName: data.userName
                };
                const SECRET_KEY = 'merntodolist';
                const token = jwt.sign(payload, SECRET_KEY);

                res.send({
                    status: "Success",
                    message: "Login Success",
                    userAuth: {
                        email: data.email,
                        userName: data.userName
                    },
                    token,
                });
            }

        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    };
};

export const checkAuth = async(req, res) => {
    try {
        const id = req.user.id;
        const dataUser = await userModels.findOne({
            where: {
                id,
            },
        });

        if(!dataUser) {
            return res.status(404).send({
                status: "Failed",
            });
        };

        res.send({
            status: "Success",
            data: {
                user: {
                    id: dataUser.id,
                    name: dataUser.name,
                    email: dataUser.email,
                    userName: dataUser.userName
                },
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    };
};