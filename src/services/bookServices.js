import { conflictError, notFoundError } from "../errors/index.js";
import bookRepositories from "../repositories/bookRepositories.js";

async function create({ name, author, userId }) {
    const { rows: [book] } = await bookRepositories.findByName(name);
    if (book) throw conflictError(("Book already exists"));

    await bookRepositories.create({ name, author, userId })
}

async function findAll() {
    const { rows, rowCount } = await bookRepositories.findAll();
    if (!rowCount) throw notFoundError();
    return rows;

}

async function takeBook({ userId, bookId }) {
    const { rows: [book], rowCount } = await bookRepositories.findById(bookId);
    if (!rowCount) throw notFoundError()
    if (!book.available) throw conflictError("Book not available")

    await bookRepositories.takeBook({ userId, bookId })
}

async function findMyBooks(userId) {
    const { rows, rowCount } = await bookRepositories.findMyBooks(userId);
    if (!rowCount) throw notFoundError();
    return rows;
}

export default { create, findAll, takeBook, findMyBooks };