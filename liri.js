//Reads and sets any environment variables with the dotenv package
var dotenv = require("dotenv").config();

//Requires and imports keys information in keys.js file
var keys = require("./keys.js");

//Requires key npm packages
var Spotify = require('node-spotify-api'); //Access to node-spotify-api package
var Request = require('request'); //Access to request package
var Twitter = require('twitter'); //Access to twitter package
var Inqurier = require('inquirer'); //Access to Inquirer package
var Colors = require('colors'); //Access to colors package to change font colors
var fs = require("fs"); // Core node package for reading and writing files

//Acceses keys from key.js file and assigns them to variables.
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Take two arguments.
// The first will be the action (i.e. "my-tweets", "spotify-this-song", etc.)
// The second will be the string value (i.e. "<song name here>").
var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotifySong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}


function myTweets() {
  var name = "projectcodeexp" //twitter handle

  //access to Twitter npm package
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var params = {
    screen_name: name,
    count: 20
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });

}



function spotifySong() {

  // This block of code will read from the "random.txt" file.
  // The code will store the contents of the reading inside the variable "data"
  fs.readFile("random.txt", "utf8", function (error, data) {

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


    var params = {
      type: 'artist OR album OR track',
      query: data,
      limit: 1
    };

    spotify.search(params, function (err, callback) {

      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log(data);
    });

  });
};