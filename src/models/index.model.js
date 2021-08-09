import connection from '../db.js'
import AuthorModel from './author.model.js'
import BookModel from './book.model.js'

BookModel.belongsTo(AuthorModel)
AuthorModel.hasMany(BookModel)
connection.sync({ alter: true })

export { AuthorModel, BookModel }
