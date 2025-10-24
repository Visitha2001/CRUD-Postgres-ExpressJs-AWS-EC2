import { pool } from "#config/postgres.js";
import {
    createBookQuery,
    getBooksQuery, 
    getBookByIdQuery, 
    updateBookQuery, 
    deleteBookQuery 
} from "#sql/bookPool.js";

export const createBook = async (req, res) => {
    const { title, author, isbn, published_date } = req.body;
    try {
        const result = await pool.query(
            createBookQuery,
            [title, author, isbn, published_date]
        );
        res.status(201).json({
            message: 'Book created successfully : ' + result.rows[0].id,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Failed to create book' });
    }
};

export const getBooks = async (req, res) => {
    try {
        const result = await pool.query(getBooksQuery);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(getBookByIdQuery, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        res.status(500).json({ error: 'Failed to fetch book by ID' });
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, isbn, published_date } = req.body;
    if (req.body === null) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!title || !author || !isbn || !published_date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const result = await pool.query(
            updateBookQuery,
            [id, title, author, isbn, published_date]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({
            message: 'Book updated successfully : ' + id,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Failed to update book' });
    }
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(deleteBookQuery, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully : ' + id });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Failed to delete book' });
    }
};
