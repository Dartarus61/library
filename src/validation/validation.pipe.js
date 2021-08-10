import { validationResult } from 'express-validator'

export async function validate(schema, req, res, next) {
    await schema.run(req)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}
