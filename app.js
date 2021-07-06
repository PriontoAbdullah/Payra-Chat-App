// External Imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// Internal Imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');

// Initialize App
const app = express();
dotenv.config();

// Request Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set View Engine
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse Cookie
app.use(cookieParser(process.env.SECRET_KEY));

// Routing Setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

// Error Handling
// 404 Not Found Handler
app.use(notFoundHandler);

// Common Error Handler
app.use(errorHandler);

// Mongodb URL
const mongoDB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4bhwg.mongodb.net/${process
	.env.DB_NAME}?retryWrites=true&w=majority`;

// Database Connection
mongoose
	.connect(mongoDB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Database Connected');
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on PORT ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		return console.log(err);
	});
