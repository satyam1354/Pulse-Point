const mongoose = require('mongoose')
const slugify = require('slugify')

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            required: true
        },
        authorName: {
            type: String,
            required: true
        },

        tags: [String],
        category: { type: String },

        image: { type: String }, // main image URL
        media: [{ type: String }], // additional media URLs

        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft'
        },

        slug: { type: String, unique: true },   //user-friendly, readable string used in URLs
        readingTime: { type: Number } // in minutes

    },
    { timestamps: true } 
);

articleSchema.pre('save', function (next) {
    //Generate slug if not already set
    if (!this.slug && this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    //Calculate reading time
    const words = this.content.split(' ').length;
    this.readingTime = Math.ceil(words / 200);
    next();
})

const Article = mongoose.model('Article', articleSchema);
module.exports = Article