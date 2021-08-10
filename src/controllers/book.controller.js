import { Router } from 'express'
import BooksService from '../services/books.service.js'
import AuthorsService from '../services/author.service.js'
import { addBookDto, removeBookDto } from '../validation/book.schema.js'
const booksController = Router()

booksController.get('/', async (req, res, next) => {
    try {
        const books = await BooksService.getAll()
        const authors = await AuthorsService.getAll()
        res.render('books/index', { books, authors, url: '/books' })
    } catch (error) {
        next(error)
    }
})

booksController.post('/add', addBookDto, async (req, res, next) => {
    try {
        const book = await BooksService.create(req.body)
        res.status(201).json(book)
    } catch (error) {
        next(error)
    }
})

booksController.delete('/:id', removeBookDto, async (req, res, next) => {
    try {
        await BooksService.remove(req.params.id)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
})

export default booksController
