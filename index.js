const express = require('express');
const path = require('path');

const app = express();


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

const PORT = process.env.PORT || 5000; //checks for assigned port when deployed

//Listening as specified port, and call back function logs what port the server is on
app.listen(PORT, () => console.log(`Sever started on port: ${PORT}`)); 