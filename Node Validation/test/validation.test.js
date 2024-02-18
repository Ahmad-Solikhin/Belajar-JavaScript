import Joi from "joi";

describe("Joi", () => {
    it(`Should be create schema`, () => {
        const schema = Joi.string().min(1).max(100).required();
        const name = "Gayuh";

        const result = schema.validate(name);
        if (result.error) {
            console.info(result.error);
        }

        expect(result.error).toBeUndefined();
    });

    it(`Should be able validate basic data type`, () => {
        const usernameSchema = Joi.string().email().required();
        const adminSchema = Joi.boolean().required();
        const priceSchema = Joi.number().required().min(1000).max(1000000);

        const resultUsername = usernameSchema.validate("ahmadsgr39@gmail.com");
        console.info(resultUsername);

        const resultAdmin = adminSchema.validate(true);
        console.info(resultAdmin);

        const resultPrice = priceSchema.validate(10000);
        console.info(resultPrice);
    });
});