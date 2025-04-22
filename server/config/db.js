const mongoose = require('mongoose')
const URL = process.env.MONOGODB_URL

const getDatabse = async ()=> {
    mongoose.connect(URL)
    .then(()=>{
        console.log("Database Connected");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = getDatabse