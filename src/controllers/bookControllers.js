import bookServices from "../services/bookServices.js";

async function create(req, res, next) {

    const { name, author } = req.body;
    const { id } = res.locals.user;

    try {
        await bookServices.create({ name, author, userId: id });
        res.sendStatus(201)

    } catch (err) {
        next(err)
    }
}

async function findAll(req, res, next) {

    try {
        const books = await bookServices.findAll();
        res.send({books})
        // res.json(books) retorna um objeto da mesma forma que res.send({ books }), porém sem a lista "books []"

    } catch (err) {
        next(err);
    }

}

export default {
    create,
    findAll
}