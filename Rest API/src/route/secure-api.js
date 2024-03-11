import express from "express";
import userController from "../controller/user-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";
import contactController from "../controller/contact-controller.js";

const secureRouter = new express.Router();

//User api
secureRouter.use(authMiddleware);
secureRouter.get("/api/users/current", userController.get);
secureRouter.patch("/api/users/current", userController.update);
secureRouter.delete("/api/users/logout", userController.logout);

//Contact api
secureRouter.post("/api/contacts", contactController.create);
secureRouter.get("/api/contacts/:contactId", contactController.get);
secureRouter.put("/api/contacts/:contactId", contactController.update);

export {
    secureRouter
}