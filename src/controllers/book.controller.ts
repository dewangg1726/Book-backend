import { Request, Response, NextFunction } from 'express';
import Book from '../models/book.model';

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find({ userId: req.user!.userId }).sort({ createdAt: -1 });
    res.json(books);
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
