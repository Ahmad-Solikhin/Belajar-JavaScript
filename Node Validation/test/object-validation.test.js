import Joi from "joi";

describe(`Joi`, () => {
    it('should be able to validate object', () => {
        const addressSchema = Joi.object({
            city: Joi.string().required().max(100),
            country: Joi.string().required().max(100)
        });

        const loginSchema = Joi.object({
            username: Joi.string().required().min(3).max(100).email(),
            password: Joi.string().required().min(6).max(100),
            address: addressSchema.required()
        });

        const req = {
            username: "gayuh@gmail.com",
            password: "rahasia",
            address: {
                city: "Bekasi",
                country: "Indonesia"
            }
        };

        const result = loginSchema.validate(req, {
            abortEarly: false
        });


        console.log(result);
    });
});