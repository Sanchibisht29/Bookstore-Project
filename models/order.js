var mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    orderid: String,
    custid: String,
    prodid: [{pid: String, pname: String, price: String, qty: String}],
    instruction: String,
    quantity: String,
    total: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("orders", orderSchema);
