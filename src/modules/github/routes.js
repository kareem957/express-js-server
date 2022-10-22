const express = require("express");

const controller = require("./controller");

module.exports = () => {
    const router = express.Router({ mergeParams: true });

    router.route("/list").get(controller.list);
    router.route("/push").post(controller.push);
    router.route("/merge-pr").post(controller.mergePR);
    router.route("/pull-request").post(controller.pullRequest);

    return router;
};
