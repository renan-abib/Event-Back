const dbConfig = require("../config/db.config.js")

const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.festivals = require("./festival.model.js")(mongoose)
db.users = require("./users.model.js")(mongoose)
db.mongoose.set("useNewUrlParser", true)
db.mongoose.set("useFindAndModify", false)
db.mongoose.set("useCreateIndex", true)

module.exports = db
