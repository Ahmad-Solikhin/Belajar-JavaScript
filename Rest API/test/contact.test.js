import {
    createTestContact,
    createTestUser,
    deleteAllTestContact,
    deleteTestUser,
    getTestContact,
    securePostSuperTest
} from "./test.util.js";
import {logger} from "../src/application/logging.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";

describe('POST "/api/contacts', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await deleteAllTestContact();
        await deleteTestUser();
    });

    it('should be able to create new contact', async () => {
        const result = await securePostSuperTest("/api/contacts", {
            first_name: "test",
            last_name: "test",
            email: "test@gmail.com",
            phone: "091730136314"
        }, "X-API-TOKEN", "test");

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();

        delete result.body.data.id;

        expect(result.body.data).toEqual({
            first_name: "test",
            last_name: "test",
            email: "test@gmail.com",
            phone: "091730136314"
        });
    });

    it('should not be able to create new contact because bad request', async () => {
        const result = await securePostSuperTest("/api/contacts", {
            first_name: "test",
            last_name: "test",
            email: "test@gmail.com",
            phone: "09173019370197300136314"
        }, "X-API-TOKEN", "test");

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });
});

describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await deleteAllTestContact();
        await deleteTestUser();
    });

    it('should be able get contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id)
            .set("X-API-TOKEN", "test");

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.phone).toBe(testContact.phone);
    });

    it('should not able get contact because not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get("/api/contacts/" + (testContact.id + 1))
            .set("X-API-TOKEN", "test");

        expect(result.status).toBe(404);
        expect(result.body.data).toBeUndefined();
    });
});