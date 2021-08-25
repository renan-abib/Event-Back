const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const palavra = "palavra";

exports.update = async (req, res) => {
    console.log(req.body);
    try {
        const {
            username,
            newUsername,
            email,
            name,
            surname,
            city,
            country,
            zip,
        } = req.body;
        console.log("aqu");
        const exists = await User.updateOne(
            { username },
            {
                username: newUsername,
                email,
                name,
                surname,
                city,
                country,
                zip,
            }
        );
        // await User.find({ username }).update({ username: "teste2" })
        // const exists = await User.find({ username })
        console.log(exists);
        res.json({
            msg: "sucess",
        });
    } catch (error) {
        return;
    }
};

// return user data
exports.consult = async (req, res) => {
    try {
        const { username } = req.headers;
        console.log(username);
        const exists = await User.find({ username }).then((data) => {
            res.json({
                username: data[0].username,
                email: data[0].email,
                name: data[0].name,
                surname: data[0].surname,
                city: data[0].city,
                country: data[0].country,
                zip: data[0].zip,
            });
        });
    } catch (error) {
        return;
    }
};

// Create and Save a new USER
exports.create = async (req, res) => {
    // Validate request

    const { username, email, password, name, surname, city, country, zip } =
        req.body;

    if (!password) {
        res.status(400).send({ message: "Password can not be empty!" });
        return;
    }

    if (password.length < 6) {
        res.status(428).send({
            message: "Password must be larger than 6 characters!",
        });
        return;
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    // Create a USER
    const user = new User({
        username,
        email,
        password: encryptedPassword,
        name,
        surname,
        city,
        country,
        zip,
    });

    // const exists = await User.find({ username })
    // if (exists.length !== 0) {
    //     res.status(428).send({
    //         message: "username needs to be unique"
    //     })
    //     return
    // }

    // Save user in the database
    try {
        //generate JWT

        const resp = await user.save(user);

        res.json({
            usuario: resp,
        });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the user.",
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const exists = await User.find({ username });
    if (exists.length === 0) {
        res.status(428).json({
            message: "username/password incorrect",
        });
        return;
    }

    const encryptedPassword = exists[0].password;

    const passwordCompare = await bcrypt.compare(password, encryptedPassword);

    if (passwordCompare) {
        const token = jwt.sign({ username, password }, palavra);
        res.json({
            logged: true,
            message: "loggin successfully",
            token,
            username,
        });
    } else {
        res.status(428).json({
            logged: false,
            message: "username/password incorrect",
        });
    }
};

exports.recover = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    const exists = await User.find({ username });

    if (exists.length === 0) {
        return res.status(428).json({
            logged: false,
            message: "username/password incorrect",
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        exists[0].password
    );

    if (!isPasswordCorrect) {
        return res.status(428).json({
            logged: false,
            message: "username/password incorrect",
        });
    }

    if (isPasswordCorrect) {
        try {
            await User.find({ username }).update({
                password: await bcrypt.hash(newPassword, 8),
            });

            return res.json({
                message: "sucess",
            });
        } catch (error) {
            return res.status(428).json({
                logged: false,
                message: "username/password incorrect",
            });
        }
    }
};
