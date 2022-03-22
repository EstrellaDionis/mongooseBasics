const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/shopApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Open!");
  })
  .catch((err) => {
    console.log("Oh No! Error!");
    console.log(err);
  });

//this is the best practice to create a schema vs index.js
//you can write it both ways but this way allows you to add more things
//to each object such as 'required'
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: false, //this will default to false if we don't declare it in product
  },
  categories: [String], //categories will be an array of STRINGS. If input is not a string, it will be made into a string
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0, //this will default to 0 if not input is given
    },
  },
});

const Product = mongoose.model("Product", productSchema);

const bike = new Product({
  name: "Bike Helmet",
  price: 29.5,
  categories: ["Cycling", "Safety"],
});
bike
  .save()
  .then((data) => {
    console.log("It worked!");
    console.log(data);
  })
  .catch((err) => {
    console.log("OH NO ERROR!");
    console.log(err);
  });