const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.findUsers);
userRouter.post("/", userController.addUsers);
userRouter.post("/login", userController.login);
userRouter.post("/generate-ticket", userController.generateTicket);
userRouter.post("/get-draw-sequence", userController.getDrawSequence);

module.exports = userRouter;
