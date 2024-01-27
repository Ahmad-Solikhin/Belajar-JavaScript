import express from "express";

const APP_PORT = 3000;

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello World"
    });
});

app.listen(APP_PORT, () => {
    console.info(`App running on port : ${APP_PORT}`);
});
