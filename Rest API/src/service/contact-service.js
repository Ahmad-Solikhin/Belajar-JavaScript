import {validate} from "../validation/validation.js";
import {
    createContactValidation,
    getContactValidation,
    updateContactValidation
} from "../validation/contact-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const contact = validate(createContactValidation, request);
    contact.username = user.username;

    return prismaClient.$transaction(async prisma => {
        return prisma.contact.create({
            data: contact,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                phone: true
            }
        });
    });
}

const get = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const contact = await prismaClient.contact.findFirst({
        where: {
            username: user.use,
            id: contactId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });

    if (!contact) throw new ResponseError(404, "contact not found");

    return contact;
}

const update = async (user, request) => {
    const contact = validate(updateContactValidation, request);

    return prismaClient.$transaction(async prisma => {
        const totalContact = await prisma.contact.count({
            where: {
                username: user.username,
                id: request.id
            }
        });

        if (totalContact !== 1) throw new ResponseError(404, "contact not found");

        return prisma.contact.update({
            where: {
                id: contact.id
            },
            data: {
                first_name: contact.first_name,
                last_name: contact.last_name,
                email: contact.email,
                phone: contact.phone
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                phone: true
            }
        });
    });
}

export default {
    create,
    update,
    get
}