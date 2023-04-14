import bcrypt from 'bcrypt';
import userRepositories from '../repositories/userRepositories.js';
import jwt from 'jsonwebtoken';
import { duplicatedEmailError, invalidCredentialsError } from '../errors/index.js';
import 'dotenv/config';

async function create({ name, email, password }) {

    const { rowCount } = await userRepositories.findByEmail(email);
    if (rowCount) throw duplicatedEmailError(email);

    const hashPassword = await bcrypt.hash(password, 10);
    await userRepositories.create({ name, email, password: hashPassword });
}

async function signin({ email, password }) {
    const { rowCount, rows: [user] } = await userRepositories.findByEmail(email);
    if (!rowCount) throw invalidCredentialsError();
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw invalidCredentialsError()

    const token = jwt.sign({userId: user.id}, process.env.SECRET_JWT, {expiresIn: 86400})
    // payload costuma ser o ID do usuário
    // o segundo argumento é uma chave secreta gerada a partir de hash SHA-256
    // o terceiro argumento pode ser uma option do jwt, nesse caso 'expiresIn' (expira em...) 'x' segundos

    return token;
}

export default {
    create,
    signin,
}