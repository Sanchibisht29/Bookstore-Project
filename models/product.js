var mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pname:String,
    pid:String,
    price:String,
    description:String,
    cat:String,
    img:String
 },
    {
    versionKey:false
    }
);

module.exports = mongoose.model('products',productSchema);