const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/movieApp", {
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

//this is just defining a schema on the javascript side of things
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

// the name 'Movie' in the argument is important because that is the collection name and it must be singular and first letter capitalized
const Movie = mongoose.model("Movie", movieSchema);

//this is still not creating anything in the actual databse
const amadeus = new Movie({
  title: "Amadeus",
  year: 1986,
  score: 9.2,
  rating: "R",
});
