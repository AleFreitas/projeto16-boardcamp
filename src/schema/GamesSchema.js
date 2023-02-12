import joi from 'joi';

export const GamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri(),
    stockTotal: joi.number().min(1),
    pricePerDay: joi.number().min(1)
});