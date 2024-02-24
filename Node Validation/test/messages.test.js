import Joi from "joi";

describe(`Joi`, () => {
    it('should be able use custom message for validation', () => {
        const schema = Joi.string().min(3).max(10).required().messages({
            'string.min': '{{#label}} panjang harus minimal {{#limit}} karakter',
            'string.max': '{{#label}} panjang harus maksimal {{#limit}} karakter'
        });

        const result = schema.validate('GJHBGDAIJOCBAISCBASCA', {abortEarly: false});
        console.info(result);
    });

    it('should be able use custom message in object validation', () => {
        const schema = Joi.object({
            username: Joi.string().required().email().messages({
                "any.required": "{{#label}} haurs diisi",
                "string.email": "{{#label}} haurs berupa email"
            }),
            password: Joi.string().required().min(6).max(10).messages({
                "any.required": "{{#label}} harus diisi",
                "string.min": "{{#label}} minimal {{#limit}} karakter",
                "string.max": "{{#label}} maximal {{#limit}} karakter"
            })
        });

        const data = {
            username: "gayuh@gmail.com",
            password: "test123"
        }

        const result = schema.validate(data, {abortEarly: false});
        console.info(result);
    });
});