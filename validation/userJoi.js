import Joi from 'joi';

export const UserValid = Joi.object({

    firstName: Joi.string().min(2).max(20).label('first name').required(),

    lastName: Joi.string().min(2).max(20).label('last name').required(),

    roleType: Joi.number().default(2),

    phone: Joi.string().pattern(/^(\d{3}-)?\d{7}$/).message('Phone must be in the format 05X-XXXXXXX ').required(),

    email: Joi.string().email().lowercase().trim().required(),

    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/).message('password must be 9 characters long and include 1 uppercase letter, 1 lowercase letter, 1 special character, and numbers.').required(),

    city: Joi.string().min(2).max(56).label('city').required(),
    street: Joi.string().min(2).max(56).label('street').required(),
    houseNumber: Joi.number().min(1).label('houseNumber').required(),
    zip: Joi.string().min(3).max(9).label('zip').required(),
    imgSrc: Joi.string().uri().allow(""),
    imgAlt: Joi.string().allow(""),


    addToCart: Joi.array().items(
        Joi.object({
            productId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            quantity: Joi.number().min(1).required(),
            price: Joi.number().required(),
            addedAt: Date.now(),
            status: Joi.string().default('pending'),
        })
    ),
});

export const UserEditValid = Joi.object({

    firstName: Joi.string().min(2).max(20).label('first name').required(),

    lastName: Joi.string().min(2).max(20).label('last name').required(),

    roleType: Joi.number().default(2),

    phone: Joi.string().pattern(/^(\d{3}-)?\d{7}$/).message('Phone must be in the format 05X-XXXXXXX ').required(),

    email: Joi.string().email().lowercase().trim().required(),

    city: Joi.string().min(2).max(56).label('city').required(),
    street: Joi.string().min(2).max(56).label('street').required(),
    houseNumber: Joi.number().min(1).label('houseNumber').required(),
    zip: Joi.number().min(1).label('zip').required(),
    imgSrc: Joi.string().uri().allow(""),
    imgAlt: Joi.string().allow(""),
});

export const userLoginValidation = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/).required(),
});





