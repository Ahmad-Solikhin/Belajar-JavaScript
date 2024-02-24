import supertest from "supertest";
import {web} from "../src/application/web.js";
import {prismaClient} from "../src/application/database.js";
import {log} from "../src/application/logging.js";

describe('POST /api/users', () => {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: {
                    not: "null"
                }
            }
        })
    });

    it('should can be able register new user', async () => {
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: "gayuh",
                password: "rahasia",
                name: "Ahmad Solikhin Gayuh Raharjo"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("gayuh");
        expect(result.body.data.name).toBe("Ahmad Solikhin Gayuh Raharjo");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should can't be able register new user because username already exist", async () => {
        let result = await supertest(web)
            .post("/api/users")
            .send({
                username: "gayuh",
                password: "rahasia",
                name: "Ahmad Solikhin Gayuh Raharjo"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("gayuh");
        expect(result.body.data.name).toBe("Ahmad Solikhin Gayuh Raharjo");
        expect(result.body.data.password).toBeUndefined();

        log.info(result.body);

        result = await supertest(web)
            .post("/api/users")
            .send({
                username: "gayuh",
                password: "rahasia",
                name: "Ahmad Solikhin Gayuh Raharjo"
            });
        
        log.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });
});