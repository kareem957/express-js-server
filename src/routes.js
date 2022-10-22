const express = require("express");

const githubActionRoutes = require("./modules/github/routes");

const apiRouter = express.Router({ mergeParams: true });

apiRouter.use("/github", githubActionRoutes());

module.exports = apiRouter;
