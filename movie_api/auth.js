const jwtSecret ='your_jwt_secret'; // This has to be the same key used in the JWTStrategy
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport'); //local passport file 

let generateJWTToken = (user) => {
    return jwt.sign(user,jwtSecret, {
        subject: user.username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
7

const jwtSecret2 = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy
mongosh "mongodb+srv://runflix.khvbcgv.mongodb.net/myFirstDatabase" --apiVersion 1 --username sza