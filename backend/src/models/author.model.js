const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            enum: ["reader", "writer", "author", "admin"],
            default: "reader"
        },
        profile: {
            bio: { type: String },
            profile: { type: String }
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Prefer not to say"],
            default: "Prefer not to say",
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        myArticles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article"
            }
        ],
        managedAuthors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Author"
            }
        ]   // authors being managed by admin
    },
    { timestamps: true }
)
export const Author = mongoose.model('Author', authorSchema)
//module.exports = Author