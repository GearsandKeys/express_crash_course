const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger')

const app = express();



// Init middleware
// app.use(logger);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

/*
app.get('/', (req,res) => {
    // Send html
    //res.send('<h1>Hello world!</h1>'); //take response object and send html to browser
    
    // Send html file
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));

});
*/


// Get all members
app.get('/api/members', (req,res) => {
    res.json(members); //res.json returns JSON
    //Now we can get these as JSON from Postman
});

// Get single member
app.get('/api/members/:id', (req,res) => {
    //res.send(req.params.id); returns whatever param passed in URL
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
});

const PORT = process.env.PORT || 5000; //checks for assigned port when deployed

//Listening as specified port, and call back function logs what port the server is on
app.listen(PORT, () => console.log(`Sever started on port: ${PORT}`)); 