import Joi from "joi";

describe(`Joi`, () => {
    it(`should be able t validate array`, () => {
        const hobbySchema = Joi.array().items(
            Joi.string().required().min(3).max(100)
        ).min(1).unique();

        const hobbies = ["Turu", "Coding", "Coding"];

        const result = hobbySchema.validate(hobbies, {abortEarly: false});
        console.info(result);
    });

    it('should be able validate array of object', () => {
        const addressSchema = Joi.object({
            city: Joi.string().required().max(100),
            country: Joi.string().required().max(100)
        });

        const addressesSchema = Joi.array().min(1).items(
            addressSchema.required()
        );

        const addresses = [
            {
                city: "Bekasi",
                country: "Indonesia"
            }
        ];

        const result = addressesSchema.validate(addresses, {abortEarly: false});
        console.info(result);
    });
});