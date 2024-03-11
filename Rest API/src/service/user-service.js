import {validate} from "../validation/validation.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation
} from "../validation/user-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    return prismaClient.$transaction(async (prisma) => {
        const countUser = await prisma.user.count({
            where: {
                username: user.username
            }
        });

        if (countUser > 0) {
            throw new ResponseError(400, "username already used");
        }

        user.password = await bcrypt.hash(user.password, 10);

        return prisma.user.create({
            data: user,
            select: {
                username: true,
                name: true
            }
        });
    });

}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    let user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) throw new ResponseError(401, "Username or password wrong");

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isPasswordValid) throw new ResponseError(401, "Username or password wrong");

    const token = uuid().toString();

    return prismaClient.$transaction(async (prisma) => {
        return prisma.user.update({
            data: {
                token
            },
            where: {
                username: user.username
            },
            select: {
                token: true
            }
        });
    });
}

const get = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username
        },
        select: {
            username: true,
            name: true
        }
    });

    if (!user) throw new ResponseError(403, "User is not found");

    return user;
}

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (totalUser !== 1) throw new ResponseError(404, "user is not found");

    const data = {};

    if (user.name) data.name = user.name;
    if (user.password) data.password = await bcrypt.hash(user.password, 10);

    return prismaClient.$transaction(async prisma => {
        return prisma.user.update({
            data,
            where: {
                username: user.username
            },
            select: {
                username: true,
                name: true
            }
        });
    });
}

const logout = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    });

    if (!user) throw new ResponseError(404, "user is not found");

    await prismaClient.$transaction(async prisma => {
        await prisma.user.update({
            where: {
                username
            },
            data: {
                token: null
            }
        });
    });
}

export default {
    register,
    update,
    logout,
    login,
    get
}