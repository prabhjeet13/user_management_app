const express = require("express");
const app = express();
require('dotenv').config();
// fetch port
const PORT = process.env.PORT || 4000;
app.use(express.json());
const userRoutes = require('./routes/User');
app.use('/api/v1/user',userRoutes);


//database
const {dbConnect} = require('./config/database');
// listening on port
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})
dbConnect();
