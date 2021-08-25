module.exports = (app) => {
    const users = require("../controllers/user.controller");

    const router = require("express").Router();

    const { authenticateToken } = require("../middlewares/auth");

    router.get("/logged", authenticateToken, users.consult);

    // Create a new User
    router.post("/", users.create);

    //login into application
    router.post("/login", users.login);

    //recover password
    router.post("/login/reset", users.recover);

    router.post("/update", authenticateToken, users.update);

    app.use("/api/users", router);
};
