const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);