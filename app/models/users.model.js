const uniqueValidator = require("mongoose-unique-validator")

module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            username: {
                type: String,
                lowercase: true,
                unique: true,
                required: [true, "can't be blank"],
                match: [/^[a-zA-Z0-9]+$/, "is invalid"],
                index: true
            },
            email: {
                type: String,
                lowercase: true,
                unique: true,
                required: [true, "can't be blank"],
                match: [/\S+@\S+\.\S+/, "is invalid"],
                index: true
            },
            password: {
                type: String,
                required: [true, "can't be blank"],
                minlength: 6,
                index: true
            },
            name: {
                type: String,
            },
            surname: {
                type: String,
            },
            city: {
                type: String,
            },
            country: {
                type: String,
            },
            zip: {
                type: String,
            }
        },
        { timestamps: true }
    )

    schema.plugin(uniqueValidator, { message: "is already taken." })
    // schema.method("toJSON", function() {
    //   const { __v, _id, ...object } = this.toObject();
    //   object.id = _id;
    //   return object;
    // });

    const Users = mongoose.model("Users", schema)
    return Users
}
