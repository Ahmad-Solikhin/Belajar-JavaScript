import Joi from "joi";

describe('Joi', () => {
    it('should be able create custom validation', () => {
        const registerSchema = Joi.object({
            username: Joi.string().required().min(3).max(100).email(),
            password: Joi.string().required().min(6).max(100).custom((value, helpers) => {
                if (value.startsWith("gayuh"))
                    return helpers.error("password.wrong");

                return value;
            }).messages({
                "password.wrong": "password can not start with 'gayuh'"
            }),
            confirmPassword: Joi.string().required().min(6).max(100)
        }).custom((value, helpers) => {
            if (value.password !== value.confirmPassword)
                return helpers.error("register.password.different");

            return value;
        }).messages({
            "register.password.different": "password and confirm password is different"
        })

        const req = {
            username: "gayuh@gmail.com",
            password: "123gayuh",
            confirmPassword: "123gayuh"
        };

        const result = registerSchema.validate(req, {abortEarly: false});
        console.info(result);
    });
});