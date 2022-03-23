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

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

// virtual only exists in the mongoose side of things and not mongo
//this will not update the database
personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

//if we did want to update the database and be able to change something we would use as set function
// personSchema
//   .virtual("fullname")
//   .get(function () {
//     return this.name.first + " " + this.name.last;
//   })
//   .set(function (v) {
//     this.name.first = v.substr(0, v.indexOf(" ")); //indexOf returns the first index at which a given element can be found in the array or -1 if it is not present
//     this.name.last = v.substr(v.indexOf(" ") + 1); //substr() returns a portion of the string
//   });

//middleware
//runs whenever we use .save()
personSchema.pre("save", async function () {
  //pre execute BEFORE the moethod. ex; .validate .save .remove etc.
  this.first = "YO";
  this.last = "MAMA"; //first and last will execute and override the input. Doing this to illustrate that pre is working before post
  console.log("About to save!!!!");
});

//runs whenever we use .save()
personSchema.post("save", async function () {
  //will execute AFTER the method ex; .validate .save .remove etc.
  console.log("Just saved!!!!");
});

const Person = mongoose.model("Person", personSchema);
