import { Request, Response, NextFunction } from 'express';
import Book from '../models/book.model';

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const rawLimit = req.query.limit;
    const rawOffset = req.query.offset;

    const limitStr = typeof rawLimit === 'string'?rawLimit:'';
    const offSetStr = typeof rawOffset === 'string'?rawOffset:'';

    const limitNum = parseInt(limitStr);
    const offsetNum = parseInt(offSetStr);
    const filter = {userId:req.user!.userId};

    const [total,books] = await Promise.all([Book.countDocuments(filter),
    Book.find(filter).sort({ createdAt: -1 }).skip(offsetNum).limit(limitNum)])
    ;
    res.json({books,total});
  } catch (err) { next(err); }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, year } = req.body;
    const book = await Book.create({ title, author, year, userId: req.user!.userId });
    res.status(201).json(book);
  } catch (err) { next(err); }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.userId },
      req.body,
      { new: true }
    );
    res.json(book);
  } catch (err) { next(err); }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Book.deleteOne({ _id: req.params.id, userId: req.user!.userId });
    res.sendStatus(204);
  } catch (err) { next(err); }
};

