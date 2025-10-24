export const createBookQuery = `
    INSERT INTO books (title, author, isbn, published_date)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
`;

export const getBooksQuery = `SELECT * FROM books;`;

export const getBookByIdQuery = `SELECT * FROM books WHERE id = $1;`;

export const updateBookQuery = `UPDATE books SET title = $2, author = $3, isbn = $4, published_date = $5 WHERE id = $1 RETURNING *;`;

export const deleteBookQuery = `DELETE FROM books WHERE id = $1 RETURNING *;`;