const mongoose = require('mongoose');
require('dotenv').config();
exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((error) => {
        console.log("DB connectection failed");
        process.exit(1);
    })
}