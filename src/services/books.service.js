import { BookModel } from '../models/index.model.js'

export default class BooksService {
    static async getAll() {
        return BookModel.findAll({
            include: 'author',
        })
    }
    static async create(dtoIn) {
        return BookModel.create(dtoIn)
    }
    static async remove(bookId) {
        const target = await BookModel.findByPk(bookId)
        return target.destroy()
    }
}
