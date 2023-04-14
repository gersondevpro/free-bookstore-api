import { unauthorizedError } from "../errors/index.js";
import userRepositories from "../repositories/userRepositories.js";
import jwt from "jsonwebtoken";

async function authValidation(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) throw unauthorizedError()

    const parts = authorization.split(" ");
    if (parts.length !== 2) throw unauthorizedError()

    const [schema, token] = parts;
    if (schema !== "Bearer") throw unauthorizedError()

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
        try {
            if (error) throw unauthorizedError();
            const { rows: [user] } = await userRepositories.findById(decoded.userId);

            if (!user) throw unauthorizedError();

            res.locals.user = user;

            next()
        } catch (err) {
            next(err)
        }
    })
}

export default { authValidation };