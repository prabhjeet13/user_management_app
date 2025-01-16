const express = require("express");
const app = express();
require('dotenv').config();
// fetch port
const PORT = process.env.PORT || 4000;
const cors = require('cors');
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

app.use(express.json());
const userRoutes = require('./routes/User');
app.use('/api/v1/users',userRoutes);


//database
const {dbConnect} = require('./config/database');
// listening on port
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})
dbConnect();
