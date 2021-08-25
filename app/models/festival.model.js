module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            name: String,
            date: Date,
            time: String,
            city: String,
            category: String,
            description: String
        },
        { timestamps: true }
    )

    // schema.method("toJSON", function() {
    //   const { __v, _id, ...object } = this.toObject();
    //   object.id = _id;
    //   return object;
    // });

    const Festival = mongoose.model("Festival", schema)
    return Festival
}
