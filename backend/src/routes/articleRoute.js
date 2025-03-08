const express = require('express')
const Router = express.Router();
const { createArticle, deleteArticle ,editArticle,authorAllArticles, getAllArticles, getArticle, getFollowingAuthorArticles} = require('../controllers/articleController.js')
const isAuthenticated = require('../config/auth.js')

// routes for author  calling
Router.route('/createArticle').post(isAuthenticated, createArticle)
Router.route('/deleteArticle/:id').get(deleteArticle)
Router.route('/editArticle/:id').get(editArticle)
Router.route('/getMyArticles/:id').get(authorAllArticles)
Router.route('/myArticle/:id').get(getArticle)

// routes for user calling
Router.route('/authorAllArticles/:id').get(authorAllArticles)
Router.route('/getArticle/:id').get(getArticle)
Router.route('/getAllArticles').get(getAllArticles)
Router.route('/getFollowingAuthorArticles/:id').get(getFollowingAuthorArticles)

module.exports = Router; 
