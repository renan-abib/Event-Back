module.exports = (app) => {
    const festivals = require("../controllers/festival.controller.js")

    var router = require("express").Router()

    const { authenticateToken } = require("../middlewares/auth")

    // Create a new Tutorial
    router.post("/", authenticateToken, festivals.create)

    // Retrieve all festivals
    router.get("/", authenticateToken, festivals.findAll)

    // Retrieve all published festivals
    router.get("/published", festivals.findAllPublished)

    // Retrieve a single Tutorial with id
    router.get("/:id", festivals.findOne)

    // Update a Tutorial with id
    router.put("/:id", festivals.update)

    // Delete a Tutorial with id
    router.delete("/:id", festivals.delete)

    // Create a new Tutorial
    router.delete("/", festivals.deleteAll)

    app.use("/api/festivals", router)
}
