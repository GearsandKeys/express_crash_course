const express = require('express');
const path = require('path');
const logger = require('./middleware/logger')

const app = express();

// Init middleware
// app.use(logger);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Members API Routes
//This allows use to use router() and route things in members.js
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000; //checks for assigned port when deployed

//Listening as specified port, and call back function logs what port the server is on
app.listen(PORT, () => console.log(`Sever started on port: ${PORT}`)); 