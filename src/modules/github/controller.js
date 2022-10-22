const GithubActions = require("../../../modals/GithubActions");

const list = async (req, res) => {
    try {
        const actionsList = await GithubActions.find();
        res.status(200).json({
            message: "Github Actions List",
            data: actionsList,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const push = async (req, res) => {
    try {
        const { request_id, author, branch, createdAt } = req.body;
        if (!request_id || !author || !branch || !createdAt)
            throw new Error("request_id, author, branch, createdAt are mandatory fields !!!");
        console.log(req.body);
        await GithubActions.create({
            request_id,
            author,
            action: "push",
            to_branch: branch,
            timestamp: createdAt,
        });
        res.status(200).json({ message: "successfully pushed your changes !!!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        throw new Error(err.message);
    }
};

const pullRequest = async (req, res) => {
    try {
        const { request_id, author, from_branch, to_branch, createdAt } = req.body;
        console.log(req.body);
        await GithubActions.create({
            request_id,
            author,
            action: "pull_request",
            from_branch,
            to_branch,
            timestamp: createdAt,
        });
        res.json({ message: "success" });
    } catch (err) {
        throw new Error(err);
    }
};

const mergePR = async (req, res) => {
    try {
        const { request_id, author, from_branch, to_branch, createdAt } = req.body;
        console.log(req.body);
        await GithubActions.create({
            request_id,
            author,
            action: "merge_pr",
            from_branch,
            to_branch,
            timestamp: createdAt,
        });
        res.json({ message: "success" });
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = { list, push, pullRequest, mergePR };
