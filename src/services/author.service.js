import { AuthorModel } from '../models/index.model.js'

export default class AuthorService {
    static async getAll() {
        return AuthorModel.findAll({ include: 'books' })
    }

    static async create(dtoIn) {
        return AuthorModel.create(dtoIn)
    }

    static async getById(authorId) {
        return AuthorModel.findByPk(authorId, { include: 'books' })
    }
}
