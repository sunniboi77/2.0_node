const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Plot: {type: String, required: true},
    Type: String,
    Genre: {
      name: String,
      Description: String
    },
    director: {
      name: String,
      bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
  });

  let userSchema = mongoose.Schema({
      username : {type: String, required:true},
      password: {type: String, required: true},
      id:{type:String,required:false}, 
      email : {type: String, required: true},
      birthDay : Date,
      favmovies : [{ type: mongoose.Schema.Types.ObjectId,ref:'Movie'}],
    
  });

  let Movie = mongoose.model('Movie',movieSchema);
  let User = mongoose.model('User',userSchema);

  module.exports.Movie = Movie;
  module.exports.User = User; 

