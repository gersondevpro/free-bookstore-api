function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {abortEarly: false});
        if (error) {
            return res.status(422).send(error.detail.map((detail) => detail.message));
        };

        next()

    };
};

export {
    validateSchema,
}