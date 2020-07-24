var mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    password:String,
    mobile:String,
    address:String
 },
    {
    versionKey:false
    }
);

module.exports = mongoose.model('Owner',ownerSchema);