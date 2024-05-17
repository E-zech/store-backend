import Joi from 'joi';

export const ProductValid = Joi.object({
    title: Joi.string().min(2).max(30).required(),

    description: Joi.string().min(10).max(900).required(),

    howToUse: Joi.string().min(10).max(900).required(),

    Ingredients: Joi.string().min(10).max(900).required(),

    price: Joi.number().required(),

    discount: Joi.number(),

    imgUrl: Joi.string().uri().allow(""),

    imgAlt: Joi.string().allow(""),

    category: Joi.string().valid('Face', 'Eyes', 'Body', 'Hands', 'Feet').required(),

    faves: Joi.array().default([]),

    totalQuantity: Joi.number(),

    createdAt: Joi.date(),
});

