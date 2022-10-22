const express = require("express");
const path = require("path");

const moduleRoutes = require("./src/routes");
const { RouteNotFoundError } = require("./src/lib/error");

const apiRouter = express.Router();

module.exports = () => {
    apiRouter
        .get("/healthcheck", (req, res) => {
            console.log("Server is up and running !!!");
            res.status(200).sendFile(path.join(__dirname, "static/index.html"));
        })
        .use("/api", moduleRoutes)
        .all("*", () => {
            throw new RouteNotFoundError();
        });

    return apiRouter;
};
