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
  },
});

const Product = mongoose.model("Product", productSchema);

const bike = new Product({ name: "Mountain Bike", price: 999 });
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
