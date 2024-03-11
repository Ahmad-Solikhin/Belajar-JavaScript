import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";
import supertest from "supertest";
import {web} from "../src/application/web.js";

const deleteTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    });
}

const createTestUser = async () => {
    const password = await bcrypt.hash("rahasia", 10);
    await prismaClient.user.create({
        data: {
            username: "test",
            password,
            name: "test",
            token: "test"
        }
    });
}

const postSuperTest = async (url, data) => {
    return supertest(web)
        .post(url)
        .send(data);
}

const getSuperTest = async (url, token, key) => {
    return supertest(web)
        .get(url)
        .set(token, key);
}

const securePatchSuperTest = async (url, data, token, key) => {
    return supertest(web)
        .patch(url)
        .send(data)
        .set(token, key);
}

const securePostSuperTest = async (url, data, token, key) => {
    return supertest(web)
        .post(url)
        .send(data)
        .set(token, key);
}

const secureDeleteSuperTest = async (url, token, key) => {
    return supertest(web)
        .delete(url)
        .set(token, key);
}

const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

const deleteAllTestContact = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: "test"
        }
    });
}

const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            email: "test@gmail.com",
            phone: "0810730193613"
        }
    });
}

const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: "test"
        }
    });
}

export {
    getTestContact,
    createTestContact,
    deleteTestUser,
    createTestUser,
    getTestUser,
    postSuperTest,
    getSuperTest,
    securePatchSuperTest,
    secureDeleteSuperTest,
    deleteAllTestContact,
    securePostSuperTest
}