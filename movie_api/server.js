const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs')
const path = require('path');

const accessLogStream= fs.createWriteStream(path.join(__dirname,'log.txt'),{flags:'a'})


let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};

let requestTime = (req,res,next) => {
    req.requestTime= Date.now();
    next();
};

let topMovies = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    year: '2001'
  },
  {
    title: 'Lord of the Rings',
    year: '2003'
  },
  {
    title: 'Inception',
    year: '2010'
  },
  {
    title: 'Gatsby',
    year: '2013'
  },
  {
    title: 'Dango',
    year: '2012'
  },{
    title: 'Fight club',
    year: '1999'
  },
  {
    title: 'Mad Max',
    year: '2015'
  },
  {
    title: 'Mask',
    year: '1994'
  },
  {
    title: 'Seven',
    year: '1995'
  },
  {
    title: 'Interstellar',
    year: '2014'
  }
];

//GET requests 
app.use(morgan('combined', {stream:accessLogStream}));
app.use(myLogger);
app.use(requestTime);
app.use(express.static('public'));


app.get('/',(req,res) => {
    let responseText = 'Welcome to Movies App';
    responseText += '<small>Requested at: ' + req.requestTime + '<small>';
    res.send(responseText);
});


app.get('/secretUrl', (req,res) => { 
    let responseText = 'Welcome to secrete URL';
    responseText += '<small>Requested at: ' + req.requestTime + '<small>';
    res.send(responseText);
});

/*
app.get('/documentation',(req,res) => {
    res.sendFile('public/documentation.html',{root: __dirname});
});
*/

app.get('/movies',(req,res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


//listen for request 
app.listen(9000,() => {
    console.log('app listens on port 9000');
});
