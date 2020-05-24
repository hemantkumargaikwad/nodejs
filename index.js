const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotEnv =  require('dotenv')
//Import Routes 
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/privateRoutes')

dotEnv.config();
//Connect DB 
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true }, 
    ()=> console.log("Database connected"))

//Middleware 
app.use(express.json())
//Route middleware 
app.use('/api/user', authRoutes)
app.use('/api/posts', privateRoutes)

app.listen(process.env.PORT, ()=> console.log("Server is running on port ", process.env.PORT));