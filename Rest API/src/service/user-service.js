import {validate} from "../validation/validation.js";
import {registerUserValidation} from "../validation/user-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
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

export default {
    register
}