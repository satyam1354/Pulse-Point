const User = require('../models/user.model.js')
const Author = require('../models/author.model.js')

const Register = async (req, res) => {
    try {
        console.log(req.body)

        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are mandatory",
                success: false
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({
                message: "User already exists..",
                success: false
            })
        }

        const createUser = await new User({ name, email, password });
        let createdUser = await createUser.save();
        if (createdUser) {
            console.log("User created successfully..")
            return res.status(401).json({
                message: "User created successfully",
                success: true
            })
        }
    } catch (error) {
        console.log(error)
    }
}

 const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required...",
                success: false
            })
        }
        const user = await User.findOne({ email })
        //console.log(user)
        if (!user) {
            return res.status(401).json({
                message: "User does not exist",
                success: false
            })
        }
        if (user.password != password) {
            return res.status(401).json({
                message: "Invalid Credentials",
                success: false
            })
        }
        // Store user in session
        //req.session.user = {id:user._id, name:user.name, email:user.email, role:user.role}
        return res.status(200).json({
            message: "user logged in successfully",
            //user: req.session.user,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

 const Logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('connect-sid') //clear the session cookie 
    console.log(req.session)
    return res.status(200).json({
        message: " User logged out successfully..",
        success: true
    })
}
 const getMyProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password")
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error)
    }
}
 const bookmark = async (req, res) => {
    try {
        const articleId = req.params.id;
        const loggedInUserId = req.body.id;
        const user = await User.findById(loggedInUserId)
        ////console.log("bookmarkk endpoint")
        if (user.savedArticle.includes(articleId)) {
            //remove from bookmarks
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { savedArticle: articleId } })
            return res.status(401).json({
                message: "article removed from your bookmarks"
            })
        }
        else {
            //add to bookmark
            await User.findByIdAndUpdate(loggedInUserId, { $push: { savedArticle: articleId } })
            return res.status(401).json({
                message: "article added to your bookmarks"
            })
        }
    } catch (error) {
        console.log(error)
    }
}
 const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const authorId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId)
        if (loggedInUser.following.includes(authorId)) {
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { following: authorId } })
            await Author.findByIdAndUpdate(authorId, { $pull: { followers: loggedInUserId } })
            return res.status(201).json({
                message: "user unfollowed successfully"
            })
        }
        else {
            await User.findByIdAndUpdate(loggedInUserId, { $push: { following: authorId } })
            await Author.findByIdAndUpdate(authorId, { $push: { followers: loggedInUserId } })
            return res.status(201).json({
                message: "user followed successfully"
            })
        }
    } catch (error) {
        console.log(error)
    }

}

 const myReads = async (req, res) => {
    try {
        const id = req.params.id;
        const myReads = await User.findById(id).select("-password -email -name - followers -bookmark")
        return res.status(200).json({
            myReads,
            message: "history sent successfully"
        })
    } catch (error) {
        console.log(error)
    }
}
 const addToReads = async (req, res) => {
    try {
        const { userId } = req.body;
        const articleId = req.params.id;
        const user = await User.findById(userId)
        if (user.myReads.includes(articleId)) {
            await User.findByIdAndUpdate(userId,
                {
                    $pull: { myReads: articleId },
                    $push: { myReads: { $each: [articleId], $position: 0 } }
                }
            );
        }

        //no need ot return 
        //return res.status(200).json({message: "article added to my reads successfully.."})
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    Register,
    Login,
    Logout,
    getMyProfile,
    bookmark,
    follow,
    myReads,
    addToReads
}