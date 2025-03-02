const Article = require('../models/article.model.js');
const Author  = require('../models/author.model.js');
// const User = require('../models/user.model.js')

const createArticle = async (req, res) => {
    try {
        console.log(req.body)
        const { title, description, content, image , video, tags,  authorId, authorName, action} = req.body;
        if (!title || !description || !content || !tags || !authorId || !authorName) {
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false
            })
        }
        const obj = { title, description, content, tags, ...(image && { image }), ...(video && {media: video }), authorId, authorName, status: action };
        const articleCreated = await new Article(obj).save();

        await Author.findByIdAndUpdate(authorId, { $push: { articles: articleCreated._id } })

        //console.log(articleCreated)
        return res.status(201).json({
            message: "Article created successfully...",
            article: articleCreated,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
}
const editArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findById(id);
        if (article) {
            return res.status(200).json({
                article: article,
                success: true
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findByIdAndDelete(id);
        await Author.findByIdAndDelete()
        if (article) {
            console.log("article deleted successfully")
            return res.status(200).json({
                message: "Article deleted successfully...",
                success: true
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const authorAllArticles = async (req, res) => {
    try {
        const authorId = req.params.id;  //author id
        const articles = await Article.findById(authorId).populate("articles");
        return res.status(200).json({
            articles,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
const getAllArticles = async (req, res) => {
    try {
        const allArticles = await Article.findById();
        //console.log(allArticles)
        return res.status(200).json({
            articles: allArticles
        })
    } catch (error) {
        console.log(error)
    }
}
const getArticle = async (req, res) => {
    try {
        const id = req.query.id;
        // console.log(id)
        const article = await Article.findById(id);
        //console.log(article)
        return res.status(200).json({
            article: article
        })
    } catch (error) {
        console.log(error)
    }
}
const getFollowingArticles = async (req, res) => {
    try {
        const id = req.params.id;  // user id
        const loggedInUser = await User.findById(id);
        const followingUserArticle = await Promise.all(loggedInUser.following.map((e) => {
            return Article.find({ author: e });
        }))
        return res.status(200).json({
            atricles: followingUserArticle
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createArticle,
    deleteArticle,
    editArticle,
    authorAllArticles,

    getAllArticles,
    getArticle,
    getFollowingArticles,

}