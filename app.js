require('dotenv').config();

const express = require('express');
const userRouter = require('./routes/user.routes')
const connectToDB = require('./config/db')
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.route')

const app = express();

//middlewares
app.set('view engine' , 'ejs'); //ejs setup
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public')) // Serve static files

app.use('/', indexRouter)
app.use('/user',userRouter) 

const PORT = process.env.PORT || 3000;

// Initialize database connection and start server
const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();