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
        await AuthorService.remove(req.params.id)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
})

export default authorsController
