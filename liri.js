//Reads and sets any environment variables with the dotenv package
require("dotenv").config();

//Requires and imports keys information in keys.js file
var keysINeed = require("./keys.js");

//Acceses keys from key.js file and assigns them to variables.
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Core node package for reading and writing files
var fs = require("fs");

// This block of code will read from the "movies.txt" file.
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

});

