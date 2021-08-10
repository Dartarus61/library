/**
 * @link https://sequelize.org/master/manual/getting-started.html
 */
import { Sequelize } from 'sequelize'

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_USER_PASSWORD) {
    console.error('Error: please configure "DB_NAME", "DB_USER" and "DB_USER_PASSWORD" env variables')
    process.exit(1)
}

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_USER_PASSWORD, {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    logging: false,
})

export async function initDatabase() {
    try {
        await connection.authenticate()
        console.log('DB connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

export default connection
