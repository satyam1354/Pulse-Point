const express = require('express')
const Router = express.Router();
const { Register, Login, Logout, getMyProfile, bookmark, follow, myReads, addToReads } = require('../controllers/userController.js')

Router.route('/register').post(Register)
Router.route('/login').post(Login)
Router.route('/logout').get(Logout)
Router.route('/profile/:id').get(getMyProfile)
Router.route('/bookmark/:id').put(bookmark)
Router.route('/follow/:id').put(follow)
Router.route('/myreads/:id').get(myReads)
Router.route('/addToReads/:id').put(addToReads)
// we need to add middleware to verifying routes to check that api call being made is by logged in user else anyone with userid can call  to this routes
module.exports = Router;