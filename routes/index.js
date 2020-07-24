var express = require("express");
var router = express();
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var User = require("../models/user");
var Order = require("../models/order");
var Product = require("../models/product");
var Owner = require("../models/owner");
var Cart = require("../models/cart");
router.use(bodyparser.json());

//to save details of new user(sign up)
router.post("/savedata", (req, res, next) => {
  const customer = new User({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,
    name: req.body.name,
    custid: req.body.custid,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    address: req.body.address,
    cart:req.body.cart
  });
  console.log(req.body.cart);
  User.find({ username: req.body.username, email: req.body.email })
    .exec()
    .then((doc) => {
      if (doc.length >= 1) {
        res.status(201).json(0);
      } else {
        customer
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json(res.status(201).json(1));
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
});

//login using username and password
router.get("/loginuser2/:uid/:pwd", function (req, res, next) {
  console.log("Username : " + req.params.uid);

  User.find({ username: req.params.uid, password: req.params.pwd })
    .exec()
    .then((doc) => {
      console.log(doc.length);
      if (doc.length == 1) {
        return res.redirect("/shop");
      } else {
        return res.redirect("/user#nouser");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//shop page => product list rendered to shop page
router.get("/shop/", function (req, res, next) {
  var mat;
  Product.find({})
    .exec()
    .then((doc) => {
      console.log("Successgful Retrival");
      mat=doc;
    })
    .catch((err) => {
      console.log(err);
    });


    User.find()
    .exec()
    .then((docu) => {
      console.log("Successgful Retrival");
      console.log(docu[0]);
      res.render("shop", {  products: mat,userstable: docu });
    })
    .catch((err) => {
      console.log(err);
    });
});


//send prodcut details to viewproduct page when view product is clicked
router.get("/viewproduct/:pid", function (req, res, next) {
  Product.find({ pid: req.params.pid })
    .exec()
    .then((doc) => {
      console.log("Successful Retrival");
      console.log(doc[0]);
      res.render("viewproduct", { prod: doc[0] });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/checkout", function (req, res, next) {
  res.render("checkout");
});

//to save orders when order is placed in checkout page
router.post("/saveorder", (req, res, next) => {
  const orderdetail = new Order({
    _id: mongoose.Types.ObjectId(),
    orderid: req.body.orderid,
    custid: req.body.custid,
    prodid: req.body.prodid,
    instruction: req.body.instruction,
    quantity: req.body.quantity,
    total: req.body.total,
  });
  orderdetail
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "sending data",
      });
    })
    .catch((error) => console.log(error));
});

//log out
router.post("/updatecart",function(req,res,next){
  User.update({username:req.body.username},{ $set: { cart: req.body.cart } })
  .exec()
  .then((doc) => {
    console.log(doc);
  })
  .catch((error) => console.log(error));
});


//product form page where new product and changes can be made
router.get("/product", function (req, res, next) {
  res.render("productform", { page: "Home", menuId: "home" });
});
//to save new product
router.post("/saveproduct", (req, res, next) => {
  const productdetail = new Product({
    _id: mongoose.Types.ObjectId(),
    pname: req.body.pname,
    pid: req.body.pid,
    price: req.body.price,
    description: req.body.description,
    cat: req.body.cat,
    img: req.body.img,
  });

  productdetail
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "sending data",
      });
    })
    .catch((error) => console.log(error));
});


//update product name
router.post("/product/updateproductname/:pid/:pname", function ( req, res,next) {
  const id = req.params.pid;
  const pname = req.params.pname;
  Product.update({ pid: id }, { $set: { pname: pname } })
    .exec()
    .then((doc) => {
      console.log(doc);
    })
    .catch((error) => console.log(error));
});

//update product price
router.post("/product/updateproductprice/:pid/:price", function(req,res,next){
  const id = req.params.pid;
  const price = req.params.price;
  Product.update({ pid: id }, { $set: { price: price } })
    .exec()
    .then((doc) => {
      console.log(doc);
    })
    .catch((error) => console.log(error));
});

//update product description
router.post("/product/updateproductdescription/:pid/:description", function (
  req,
  res,
  next
) {
  const id = req.params.pid;
  const description = req.params.description;
  Product.update({ pid: id }, { $set: { description: description } })
    .exec()
    .then((doc) => {
      console.log(doc);
    })
    .catch((error) => console.log(error));
});

//update product category
router.post("/product/updateproductcategory/:pid/:cat", function (
  req,
  res,
  next
) {
  const id = req.params.pid;
  const cat = req.params.cat;
  Product.update({ pid: id }, { $set: { cat: cat } })
    .exec()
    .then((doc) => {
      console.log(doc);
    })
    .catch((error) => console.log(error));
});

//update product image
router.post("/product/updateproductimage/:pid/:img", function (req, res, next) {
  const id = req.params.pid;
  const img = req.params.img;
  Product.update({ pid: id }, { $set: { img: img } })
    .exec()
    .then((doc) => {
      console.log(doc);
    })
    .catch((error) => console.log(error));
});
//owner
router.get('/ownerlogin/:uid/:pwd', function(req, res, next) {
  console.log("Username : "+req.params.uid);
  Owner.find({"email": req.params.uid,"password":req.params.pwd}).exec().then(
    doc=> {
      console.log(doc.length);
      if(doc.length==1){
        return res.redirect('/product');
      }
      else{
        return res.redirect('/owner#no');
      }
    }
  ).catch(err=>{
console.log(err);
  });
});




//send user details to profile page
router.get("/profile/:uid", function (req, res, next) {
  
  User.find({ username: req.params.uid })
    .exec()
    .then((doc) => {
      if (doc.length == 1) {
        res.render("profile", { user: doc[0] });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


//intermediate page for getting items from localstorage


//call thank u page on placing order
router.get("/thanku/:oid", function (req, res, next) {
  res.render("thanku", { page: req.params.oid, menuId: "home" });
});

//login signup page
router.get("/user", function (req, res, next) {
  res.render("user", { page: "Contact Us", menuId: "contact" });
});

//viewproduct page
router.get("/viewproduct", function (req, res, next) {
  res.render("viewproduct", { page: "Contact Us", menuId: "contact" });
});

router.get('/owner', function(req, res, next) {
  res.render('owner', {page:'Home', menuId:'home'});
});



// router.get("/orders/:custid", function (req, res) {
//   Order.find({ custid: req.params.custid })
//     .exec()
//     .then((doc) => {
//       console.log("Successful Order Retrival");
//       console.log(doc);
//       res.json(doc);
//       // res.render("viewproduct", { prod: doc[0] });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
//when product is added to cart
// router.get("/checkout/:pid", function (req, res, next) {
//   Product.find({ pid: req.params.pid })
//     .exec()
//     .then((doc) => {
//       console.log(doc[0]);
//       res.render("checkout", {
//         pid: doc[0].pid,
//         pname: doc[0].pname,
//         price: doc[0].price,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


module.exports = router;
