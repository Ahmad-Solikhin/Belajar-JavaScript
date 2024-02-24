import express from "express";
import userController from "../controller/user-controller.js";
import homeController from "../controller/home-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/api/users", userController.register);
publicRouter.get("/api", homeController.home);

export {
    publicRouter
}
