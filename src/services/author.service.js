import { AuthorModel } from '../models/index.model.js'
import ErrorResponse from '../errorResponse.js'

export default class AuthorService {
    static async getAll() {
        return AuthorModel.findAll({ include: 'books' })
    }

    static async create(dtoIn) {
        return AuthorModel.create(dtoIn)
    }

    static async remove(authorId) {
        const target = await AuthorModel.findByPk(authorId, { include: 'books' })
        if (target.books && target.books.length) {
            throw new ErrorResponse(400, 'Сперва удалите книги автора!')
        }
        await target.destroy()
    }
}
