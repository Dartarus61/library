import { checkSchema } from 'express-validator'
import { validate } from './validation.pipe.js'

export const createAuthorDto = async (...args) => {
    const schema = checkSchema({
        name: {
            exists: true,
            isString: true,
        },
        surname: {
            isString: true,
            optional: true,
        },
    })
    await validate(schema, ...args)
}
