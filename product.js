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
    min: [0, "Price must be positive"],
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
      default: 0, //this will default to 0 if not input is given.
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"], //enum allows us to provide an array and validate & approve if the value is in the area
  },
});

//instance method
//the syntax is someInstance.methods.whateverYouWant
// productSchema.methods.greet = function () {
//   console.log("Hello! Hi! Howdy!");
//   console.log(`- from ${this.name}`); //the keyword 'this' is defining the individual instance from where it's called
// };

//another instance method
productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save(); //by making this return the save, we can now await it because saving takes time
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save;
};

const Product = mongoose.model("Product", productSchema);

//using this to help us find a product so that we can use the instance method function
const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Bike Helmet" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale(); //this is awaiting the save from the toggleOnSale method
  console.log(foundProduct);
  await foundProduct.addCategory("Outdoors"); //also awaiting the save from the addCategory method
  console.log(foundProduct);
};

findProduct();

// const bike = new Product({
//   name: "Cycling Jersey",
//   price: 28.5,
//   categories: ["Cycling"],
//   size: "XS ",
// });
// bike
//   .save()
//   .then((data) => {
//     console.log("It worked!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO ERROR!");
//     console.log(err);
//   });

// Product.findOneAndUpdate(
//   { name: "Tire Pump" },
//   { price: -19.99 },
//   { new: true, runValidators: true } //runValidators makes validations PERSIST after updating something! If you do not use runValidators after something was already approved, it can be changed with values that are schema did not want.
//   //   ex here: price -19.99 went through because the original price was already approved. with runValidators, -19.99 will NOT go through!
// )
//   .then((data) => {
//     console.log("It worked!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO ERROR!");
//     console.log(err);
//   });
