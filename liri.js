//Reads and sets any environment variables with the dotenv package
require("dotenv").config();

//Requires and imports keys information in keys.js file
var keysINeed = require("./keys.js");

//Acceses keys from key.js file and assigns them to variables.
var spotify = new Spotify(keys.spotify);
  var client = new Twitter(keys.twitter);