const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())

app.use(express.json())

// // parse requests of content-type - application/json
// app.use(bodyParser.json())

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models")

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!")
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err)
        process.exit()
    })

require("./app/routes/festival.routes")(app)
require("./app/routes/user.routes")(app)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "app", "/public", "/index.html"))
})

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
