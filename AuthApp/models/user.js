const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   title : {
    type:String,
    required : true,
    maxLength : 50,
   },
   surname:{
    type:String,
    required : true,
    maxLength : 50,
   },
   email:{
    type : String,
    required:true,
    maxLength : 100,
   },
   password : {
     type : String,
     required : true,
     maxLength : 100,
   },
   role : {
    type : String ,
    enum : ['Student','Admin','Teacher'],
   }
});

module.exports = mongoose.model('AuthAppData' , userSchema);