const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "reader", "writer", "admin"],
            default: "user"
        },
        profile: {
            bio: { type: String },
            profile: { type: String }
        },
        gender: {
            type: String,
            enum: ['male', 'famale', 'Prefer not to say'],
            default: "Prefer not to say"
        },
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Author'
            }
        ],
        savedArticle: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article"
            }
        ],
        myReads: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article"
            }
        ],
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);
module.exports = User