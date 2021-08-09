import sequelizePkg from 'sequelize'
import connection from '../db.js'
const { DataTypes, Model } = sequelizePkg

class AuthorModel extends Model {}

AuthorModel.init(
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
        surname: {
            type: DataTypes.STRING,
        },
    },
    {
        // Other model options go here
        sequelize: connection,
        timestamps: false,
        modelName: 'author', // -> auto-pluralization to authors
    }
)

export default AuthorModel
