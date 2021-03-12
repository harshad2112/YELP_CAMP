var mongoose = require("mongoose");
var campgroundSchema =  new mongoose.Schema({
    name: String,
    url: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

module.exports = mongoose.model("allcampgrounds", campgroundSchema);