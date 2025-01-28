const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const  studentModel= require('./models/Student');
const sprofile = require('./models/Sprofile');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/dinesh');

/*app.post('/login', (req, res) => {
        studentModel.create(req.body)
        .then(students => res.json(students))
        .catch(err => res.json(err))
 });*/
app.post('/login', (req, res) => {
        const {uid, password} = req.body;
        studentModel.findOne({uid : uid})
        .then(user=>{
            if(user){
                if(user.password === password){
                    res.json({message: "Success"});
                }else{
                    res.json({message: "Password Incorrect"});
                }
            } else{
                res.json("No record Existed");
            }
        })
 });

 app.post('/home', (req, res) => {
    const { uid } = req.body;  // Destructure uid from the request body

    console.log('Received UID:', uid);  // Log received uid to ensure it's passed correctly

    if (!uid) {  // Check if uid is provided
        return res.status(400).json({ message: "No UID provided" });
    }

    sprofile.findOne({ uid: uid })  // Search for the user by uid
        .then(user => {
            if (user) {
                res.json({ message: "UID received", user });  // Respond with success if user found
            } else {
                res.status(404).json({ message: "No user found with the provided UID" });  // Respond with error if user not found
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error", error: err.message });  // Handle any errors from the DB
        });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
