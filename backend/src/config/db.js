const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: '/.env' })

const databaseConnection = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("you are connected to database of PULSE POST")
    }).catch((error) => {
        console.log(error)
    })
}
module.exports = databaseConnection