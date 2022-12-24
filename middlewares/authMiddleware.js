import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            return res.send({
                status: "Failed",
                message: "Access Denied!",
            });
        }

        const SECRET_KEY = 'merntodolist';

        const verified = jwt.verify(token, SECRET_KEY);
        
        req.userModels = verified;

        next();

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Invalid Token!"
        });
    };
};