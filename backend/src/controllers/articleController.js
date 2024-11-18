const Article = require('../models/article.model.js')
const User = require('../models/user.model.js')

const createArticle = async(req, res) =>{
    try {
        // console.log(req.body)
    const {title, summary, content,  tags , author} = req.body;
    if(!title || !summary || !content || !tags || !author){
        return res.status(401).json({
            message:"All fields are mandatory",
            success: false
        })
    }
    const obj = {title, summary, content, tags, author};
    const createArticle = new Article(obj);
    const articleCreated = await createArticle.save();
 
     console.log(articleCreated)
     return res.status(201).json({
        message:"Article created successfully...",
        success: true
     })
    } catch (error) {
        console.log(error)
    }
}
const deleteArticle = async (req, res)=>{
    try {
        const id = req.params.id;
    const article  = await Article.findByIdAndDelete(id);
    if(article){
        console.log("article deleted successfully")
        return res.status(200).json({
            message:"Article deleted successfully...",
            success: true
        })
    }
    } catch (error) {
        console.log(error)
    }
}
const getAllArticles  = async(req, res)=>{
try {
    const articles = await Article.find();
    console.log(articles)
    return res.status(200).json({
        articles:articles
    })
} catch (error) {
    console.log(error)
}
}
const getFollowingArticles = async(req, res)=>{
   try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const followingUserArticle = await Promise.all(loggedInUser.following.map((e)=>{
        return Article.find({author:e});
    })) 
    return res.status(200).json({
        atricles : followingUserArticle
    })
   } catch (error) {
    console.log(error)
   } 
}
 
module.exports = {
    createArticle, 
    deleteArticle,
    getAllArticles,
    getFollowingArticles
}