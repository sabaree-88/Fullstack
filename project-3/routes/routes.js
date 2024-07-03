import express from "express";
import { addBook, getBooks, getBooksByID, updateBookById, deleteBook } from "../controllers/BookController.js";
const router = express.Router();

router.post('/addBook', addBook);
router.get('/getBooks', getBooks);
router.get('/getBookById/:id', getBooksByID);
router.put('/updateBookById/:id', updateBookById);
router.delete('/deleteBook/:id', deleteBook);

export default router;