import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getBooks, createBook, updateBook, deleteBook } from '../controllers/book.controller';

const router = Router();

router.use(authenticate);      // protect everything below
router.get('/', getBooks);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
