import {
    createTestUser,
    deleteTestUser,
    getSuperTest,
    getTestUser,
    postSuperTest,
    secureDeleteSuperTest,
    securePatchSuperTest
} from "./test.util.js"
import {logger} from "../src/application/logging.js";
import bcrypt from "bcrypt";

describe('POST /api/users', () => {

    afterEach(async () => {
        await deleteTestUser();
    });

    it('should can be able register new user', async () => {
        const result = await postSuperTest("/api/users", {
            username: "test",
            password: "rahasia",
            name: "test"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should can't be able register new user because username already exist", async () => {
        let result = await postSuperTest("/api/users", {
            username: "test",
            password: "rahasia",
            name: "test"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        logger.info(result.body);

        result = await postSuperTest("/api/users", {
            username: "test",
            password: "rahasia",
            name: "test"
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });
});

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await deleteTestUser();
    });

    it('should be able to login', async () => {
        const result = await postSuperTest("/api/users/login", {
            username: "test",
            password: "rahasia"
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
    });

    it('should not be able to login because wrong password', async () => {
        const result = await postSuperTest("/api/users/login", {
            username: "test",
            password: "salah123"
        });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.error).toBeDefined();
    });

    it('should not be able to login because wrong username', async () => {
        const result = await postSuperTest("/api/users/login", {
            username: "salah",
            password: "rahasia"
        });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.error).toBeDefined();
    });

    it('should not be able to login because blank username and password', async () => {
        const result = await postSuperTest("/api/users/login", {
            username: "",
            password: ""
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.error).toBeDefined();
    });

});

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await deleteTestUser();
    });

    it('should be able to get current login user info', async () => {
        const result = await getSuperTest("/api/users/current", "X-API-TOKEN", "test");

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
    });

    it('should not be able to get current login user info because wrong token', async () => {
        const result = await getSuperTest("/api/users/current", "X-API-TOKEN", "salah");

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.error).toBeDefined();
    });
});

describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await deleteTestUser();
    });

    it('should be able update name', async () => {
        const result = await securePatchSuperTest("/api/users/current", {
            name: "Gayuh"
        }, "X-API-TOKEN", "test");

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Gayuh");
    });

    it('should be able update password', async () => {
        const result = await securePatchSuperTest("/api/users/current", {
            password: "rahasia123"
        }, "X-API-TOKEN", "test");

        logger.info(result.body);

        const user = await getTestUser();

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("test");
        expect(await bcrypt.compare("rahasia123", user.password)).toBe(true);
    });

    it('should be able update password and name', async () => {
        const result = await securePatchSuperTest("/api/users/current", {
            password: "rahasia123",
            name: "Gayuh"
        }, "X-API-TOKEN", "test");

        logger.info(result.body);

        const user = await getTestUser();

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Gayuh");
        expect(await bcrypt.compare("rahasia123", user.password)).toBe(true);
    });

    it('should not be able update password and name because wrong token', async () => {
        const result = await securePatchSuperTest("/api/users/current", {
            password: "rahasia123",
            name: "Gayuh"
        }, "X-API-TOKEN", "salah");

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.error).toBeDefined();
    });

});

describe('DELETE /api/users/logout', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await deleteTestUser();
    });

    it('should be able to logout', async () => {
        const result = await secureDeleteSuperTest("/api/users/logout", "X-API-TOKEN", "test");

        const user = await getTestUser();

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.message).toBeDefined();
        expect(user.token).toBeNull();
    });

    it('should be not able to logout because wrong token', async () => {
        const result = await secureDeleteSuperTest("/api/users/logout", "X-API-TOKEN", "salah");

        const user = await getTestUser();

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.error).toBeDefined();
    });
});