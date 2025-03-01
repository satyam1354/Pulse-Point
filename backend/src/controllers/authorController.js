const Author = require('../models/author.model.js')

export const Register = async (req, res) => {
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
        if (author) {
            return res.status(401).then({
                message: "Author user already exists...",
                success: false
            })
        }
        const obj = { ...(name && { name }), email, password, ...(profile && { 'profile.profile': profile }), ...(bio && { 'profile.bio': bio }) }
        author = await Author.create(obj).save();

        return res.status(201).json({
            message: "Author user created successfully",
            author,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false
            })
        }
        const author = await Author.find({ email });
        if (!author) {
            return res.status(401).then({
                message: "Author user does not exists...",
                success: false
            })
        }
        if (author.password != password) {
            return res.status(400).then({
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
export const getAuthorProfile  = async(req, res) =>{
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