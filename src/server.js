import {} from 'dotenv/config'
import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import { resolve } from 'path'
import { initDatabase } from './db.js'
import authorsController from './controllers/author.controller.js'
import booksController from './controllers/book.controller.js'

const app = express()
const port = 4000
initDatabase()

/**
 * @link https://expressjs.com/ru/guide/using-template-engines.html
 */
app.set('view engine', 'ejs')
app.set('views', resolve() + '/src/views')
app.set('layout', '__layout')

app.use(express.json())
app.use(expressLayouts)
app.use(express.static('.build/public'))

app.use('/books', booksController)
app.use('/authors', authorsController)
app.use('/', (req, res) => {
    return res.redirect('/books')
})

/*eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({ error: err.message || 'Something broke!' })
})
/*eslint-enable */

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
