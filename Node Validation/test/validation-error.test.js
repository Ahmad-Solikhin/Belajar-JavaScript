import Joi from "joi";

describe(`Joi`, () => {
    it(`Should be able to create validation error object to get the detail`, () => {
        const emailSchema = Joi.string().min(5).email().required();

        const result = emailSchema.validate("ups", {
            abortEarly: false
        });
        console.info(result);

        if (result.error) {
            result.error.details.forEach(detail => {
                console.info(`${detail.context} = ${detail.message}`);
            });
        }
    });
});