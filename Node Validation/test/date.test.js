import Joi from "joi";

describe(`Joi`, () => {
    it(`Should be able to validate date`, () => {
        const birthDateSchema = Joi.date().required().max("now").min("1-1-1988");

        const result = birthDateSchema.validate("1-1-1987");
        console.info(result);

        console.info(typeof result.value);
        console.info(typeof result.error);

        const result2 = birthDateSchema.validate("7-10-2001");
        console.info(result2);
    });
});