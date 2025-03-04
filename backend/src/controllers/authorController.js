const Author = require('../models/author.model.js')

const Register = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password, bio, profile } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false
            })
        }
        const author = await Author.find({ email });

        if (author?.length > 0) {
            console.log("runs");
            return res.status(409).json({
                message: "Author user already exists...",
                success: false
            })
        }
        // const obj = { ...(name && { name }), email, password }
        const obj = { ...(name && { name }), email, password, ...(profile && { 'profile.profile': profile }), ...(bio && { 'profile.bio': bio }) }
        const createdAuthor = await Author.create(obj) //new Author(obj).save();
        console.log(createdAuthor)

        return res.status(201).json({
            message: "Author user created successfully",
            createdAuthor,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
const Login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false
            })
        }
        const author = await Author.find({ email });
        if (!author?.length > 0) {
            return res.status(401).json({
                message: "Author user does not exists...",
                success: false
            })
        }
        // console.log(author)
        // console.log(author[0].password, " " , password)
        if (author[0].password != password) {
            return res.status(400).json({
                message: "Invalid credentials..",
                success: false
            })
        }
        return res.status(200).json({
            message: "Author user logged in successfully...",
            author,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
const getAuthorProfile = async (req, res) => {
    try {
        const authorId = req.params.id;
        const authorProfile = await Author.findById(authorId).select('-password')
        return res.status(200).json({
            message: "author profile sent successfully...",
            authorProfile,
            success: false
        })
    } catch (error) {
        console.log(error)
    }
}
const Logout = (req, res) => {

    return res.status(200).json({
        message: "user logged out successfully",
        success: true
    })
}

module.exports = {
    Logout,
    getAuthorProfile,
    Login,
    Register
}