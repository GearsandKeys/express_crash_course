const express = require('express');
const uuid = require('uuid')
const router = express.Router();
const members = require('../../Members')//Have to get out of api, and routes to find Members.js 

// Get all members
router.get('/', (req,res) => {
    res.json(members); //res.json returns JSON
    //Now we can get these as JSON from Postman
});

// Get single member
router.get('/:id', (req,res) => {
    //res.send(req.params.id); returns whatever param passed in URL
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
        //some() is an array function that checks to see at least one element is true.
    } else {
        //return error 400 (bad server request) if they request an ID that doesn't exist
        res.status(400).json({ msg: `No member with the id ${req.params.id} found.`})
    }
});

// Creating Member
router.post('/', (req, res) => {
    //res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    //checking for name and email before adding to array
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include name and email.'});
    }

    //add newMember to array
    members.push(newMember); //add new member
    res.json(members); //return all members with the new one

});

// Update member
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    //If a member with the id exists we will:
    if (found) {
        //updMember is what we send
        const updMember = req.body;
        //loop through and check id
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                //If there is something in the name or email, update, otherwise keep it the same
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                //send back response
                res.json({ msg: 'Member was updated.', member})
            }
        });
    } else {
         res.status(400).json({ msg: `No member with the id ${req.params.id} found.`})
    }
});

module.exports = router;