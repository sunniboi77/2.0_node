const { join } = require('lodash');

// This is the server file for task 2.8 with mongoose with real database 
const express = require('express');
const res = require('express/lib/response');
const { v4 } = require('uuid');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');
    
const mongoose = require('mongoose');
const Models = require('./models.js');
//const { update } = require('lodash');

const Movies = Models.Movie;
const Users = Models.User;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/szaFlix', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/',(req,res) => {
  res.send('<h1>Hello Movies server  </h1>')
})

//GET - documentation.html
app.get('/documentation',(req,res) => {
  res.sendFile('public/documentation.html',{root: __dirname});
});


//Secret Url
app.get('/secretUrl', (req,res) => { 
let responseText = 'Welcome to secrete URL';
let requestTime = Date.now();
responseText += '<small>Requested at: ' + req.requestTime + '<small>';
res.send(responseText);
});


app.post('/users',(req,res) => {
   Users.findOne({ username: req.body.USERNAME, userid:req.body.id})
   .then((user)=> {
      if ((user)) {
        console.log(user,'userID', user.id);
        return res.status(401).send(req.body.USERNAME + ' already exists')
      } else {
        Users
          .create({
            username: req.body.USERNAME,
            password: req.body.password,
            id:req.body.id, 
            email: req.body.email,
            birthDay: req.body.birthDay
          })
          //callback takes document created as a parameter 
          .then((user) => {res.status(201).json(user) })
           .catch((error) => {
             console.error(error);
             res.status(500).send('Error'+error);
            })
      }
    })
  .catch((error)=>{
    console.error(error);
    res.status(500).send('Error    '+ error);
  });
});

// Get all users
app.get('/users',(req,res)=> {
  Users.find()
   .then((users) => {
    res.status(201).json(users);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).send('Error:' + err);
   });
});

//Get one users by username
app.get('/users/:Username', (req,res) => {
  Users.findOne({username : req.params.Username})
  .then((user) => {
    res.json(user);
  })
  .catch((err)=> {
    console.error(err);
    res.status(500).send('Error' + err);
  });
});

//Get one users by id
app.get('/users/id/:ID', (req,res) => {
  Users.findOne({id : req.params.ID})
  .then((id) => {
    res.json(id);
  })
  .catch((err)=> {
    console.error(err);
    res.status(500).send('Error' + err);
  });
});

//Get one movie by id
app.get('/movies/:Title', (req,res) => {
  Movies.findOne({Title : req.params.Title})
  .then((title) => {
    res.json(title);
  })
  .catch((err)=> {
    console.error(err);
    res.status(500).send('Error' + err);
  });
});



//Get all movie
app.get('/movies', (req,res) => {
  Movies.find()
  .then((movies) => {
    res.json(movies);
  })
  .catch((err)=> {
    console.error(err);
    res.status(500).send('Error' + err);
  });
});


//Update USER 
app.put('/users/:Username', (req,res) => { 
  Users.findOneAndUpdate({username:req.params.Username},
    { $set:
      {
        id: req.body.id, 
        username: req.body.username,
        password: req.body.Password,
        mail: req.body.Email,
        birthDay: req.body.Birthday
      }
    },
    {new:true},
    (err,updateUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error '+ err );
      } else {
        res.json(updateUser);
      }
    });
});

//Delete User by username
app.delete('/users/:Username', (req,res)=> {
  Users.findOneAndRemove({username: req.params.Username})
    .then((user)=>{
      if(!user){
        res.status(400).send(req.params.Username + 'Username not found');
      } else {
        res.status(200).send(req.params.Username + 'was deleted');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('error' + err);
    });
});

//Delete User by id
app.delete('/users/id/:ID', (req,res)=> {
  Users.findOneAndRemove({id: req.params.ID})
    .then((id)=>{
      if(!id){
        res.status(400).send(req.params.ID + 'id not found');
      } else {
        res.status(200).send(req.params.ID + 'id was deleted');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('error' + err);
    });
});




app.listen(8080, () => console.log('listening on 8080'));   