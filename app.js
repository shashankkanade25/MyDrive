const express = require('express');
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/db')
connectToDB();
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.route')

const app = express();

//middlewares
app.set('view engine' , 'ejs'); //ejs setup
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/uploads', express.static('uploads')) // Serve uploaded files
app.use(express.static('public')) // Serve static files

app.use('/', indexRouter)
app.use('/user',userRouter) 


app.listen(3000, () => {
    console.log("server is running on port 3000");
})