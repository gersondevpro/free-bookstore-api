import connectionDb from "../config/database.js"

async function create ({ name, author, userId }) {

    return await connectionDb.query(`
        INSERT INTO books (name, author, "userId")
        VALUES ($1, $2, $3)
    `, [name, author, userId])

};

async function findByName (name) {
    
    return await connectionDb.query(`
        SELECT * FROM books WHERE name = $1
    `, [name])
};

async function findAll () {
    
    return await connectionDb.query(`
    SELECT b.id, b.name, b.author, b.available,
    u.name AS "createdBy"
    FROM books b
    JOIN users u
    ON b."userId" = u.id
    `);
};

async function findById(bookId) {

    return await connectionDb.query(`
    SELECT * FROM books WHERE id = $1
`, [bookId]);

};

async function takeBook({userId, bookId}) {

    await connectionDb.query(`
    UPDATE books SET available = $1 WHERE id = $2
    `, [false, bookId])

    await connectionDb.query(`
    INSERT INTO "myBooks" ("userId", "bookId") VALUES ($1, $2)
    `, [userId, bookId])

}

async function findMyBooks(userId) {
    return await connectionDb.query(`
    SELECT
        u.name as "user_name",
        b.name as "book_name",
        b.author as "bookAuthor"
    FROM "myBooks" m
        JOIN users u ON m."userId" = u.id
        JOIN books b ON m."bookId" = b.id
    WHERE m."userId" = $1 
    `, [userId])
}

export default { create, findByName, findAll, findById, takeBook, findMyBooks };