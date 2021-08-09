import { Router } from 'express'
import AuthorService from '../services/author.service.js'
import { createAuthorDto } from '../validation/author.schema.js'
import { removeBookDto as removeAuthorDto } from '../validation/book.schema.js'
const authorsController = Router()

authorsController.get('/', async (req, res) => {
    const authors = await AuthorService.getAll()
    res.render('authors/index', { authors, url: '/authors' })
})

authorsController.post('/create', createAuthorDto, async (req, res, next) => {
    try {
        const author = await AuthorService.create(req.body)
        res.status(201).json(author)
    } catch (error) {
        next(error)
    }
})

authorsController.delete('/:id', removeAuthorDto, async (req, res, next) => {
    try {
        const target = await AuthorService.getById(req.params.id)
        if (target.books && target.books.length) {
            return res.status(400).json({ error: 'Сперва удалите книги автора!' })
        }
        target.destroy()
        res.status(200).send()
    } catch (error) {
        next(error)
    }
})

export default authorsController
