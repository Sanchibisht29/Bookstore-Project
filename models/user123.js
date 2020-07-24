var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:String,
    name:String,
    custid:String,
    email:String,
    password:String,
    mobile:String,
    address:String
 },
    {
    versionKey:false
    }
);

module.exports = mongoose.model('p',userSchema);