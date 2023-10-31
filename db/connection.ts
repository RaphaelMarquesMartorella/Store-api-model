const mongoose = require('mongoose')


const connectDB = (url:any) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}
module.exports = connectDB