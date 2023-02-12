import joi from 'joi';

export const CustomerSchema = joi.object({
    cpf: joi.string().regex(/^\d+$/).length(11),
    phone: joi.string().regex(/^[0-9]+$/).min(10).max(11),
    name: joi.string().required(1),
    birthday: joi.date()
});
