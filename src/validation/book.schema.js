import { checkSchema } from 'express-validator'
import { validate } from './validation.pipe.js'

export const addBookDto = async (...args) => {
    const schema = checkSchema({
        name: {
            isLength: {
                errorMessage: 'Book name should be at least 3 chars long',
                options: { min: 3 },
            },
            exists: true,
            isString: true,
        },
        description: {
            isString: true,
            optional: true,
        },
        authorId: {
            isUUID: true,
            exists: true,
        },
    })
    await validate(schema, ...args)
}

export const removeBookDto = async (...args) => {
    const schema = checkSchema({
        id: {
            isUUID: true,
            exists: true,
        },
    })
    await validate(schema, ...args)
}
