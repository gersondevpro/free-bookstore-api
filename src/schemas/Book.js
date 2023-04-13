import joi from 'joi';

const bookSchema = joi.object({
    name: joi.string().min(2).required(),
    author: joi.string().required(),
    userId: joi.number(),
    available: joi.boolean().default(true)
})

export { bookSchema };