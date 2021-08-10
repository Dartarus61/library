import sequelizePkg from 'sequelize'
import connection from '../db.js'
const { DataTypes, Model } = sequelizePkg

class BookModel extends Model {}

BookModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        authorId: {
            type: DataTypes.UUID,
        },
    },
    {
        // Other model options go here
        sequelize: connection,
        modelName: 'book', // -> auto-pluralization to books
        timestamps: true,
        updatedAt: false,
    }
)

export default BookModel
