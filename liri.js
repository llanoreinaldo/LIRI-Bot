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

// Takes in two arguments.
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


// Four functions to be called and run by switch-case.

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
  client.get('statuses/user_timeline', params, function (error, data, response) {
    if (error) {
      console.log(error)
    } else if (data) {
      for (var i = 0; i < data.length; i++) {
        console.log('\nHandle:', data[i].user.screen_name .blue);
        console.log('Recent Tweet:', data[i].text .red);
        console.log('Created at:', data[i].created_at .green);
        console.log("-----------------------------------------------------------\n");
      }
    }
  });

}

function spotifySong() {

  var song = value;

  if (song === '') {
    // This block of code will read from the "random.txt" file.
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }

      // We will then print the contents of data
      //console.log(data);

      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");

      // We will then re-display the content as an array for later use.
      //console.log(dataArr);


      var params = {
        type: 'track',
        query: dataArr[1],
        limit: 1
      };

      spotify.search(params, function (err, response) {

        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("\nSong Title: ", response.tracks.items[0].name .red);
        console.log("Artist: ", response.tracks.items[0].artists[0].name .green);
        console.log("Album: ", response.tracks.items[0].album.name .grey);
        console.log("Release Date: ", response.tracks.items[0].album.release_date .yellow);
        console.log("Preview URL: ", response.tracks.items[0].preview_url.underline .blue);
        console.log("-----------------------------------------------------------\n");
      });

    });
  } else {
    var params = {
      type: 'track',
      query: value,
      limit: 1
    };

    spotify.search(params, function (err, response) {

      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("\nSong Title: ", response.tracks.items[0].name .red);
      console.log("Artist: ", response.tracks.items[0].artists[0].name .green);
      console.log("Album: ", response.tracks.items[0].album.name .grey);
      console.log("Release Date: ", response.tracks.items[0].album.release_date .yellow);
      console.log("Preview URL: ", response.tracks.items[0].preview_url.underline .blue);
      console.log("-----------------------------------------------------------\n");
    });
  }
};

function movieThis() {

  var movie = value;

  if (movie === undefined) {
    var movie = "mr nobody";

    Request("http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&type=movie&plot=full", function (error, response, body) {
      //  console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //  console.log('body:', body); // Print the HTML for the Google homepage.

      if (response.statusCode === 200 && JSON.parse(body).Title) {

        console.log("\nTitle: ", JSON.parse(body).Title .red); // Title of the movie.
        console.log("Release Year: ", JSON.parse(body).Year .green); //Year the movie came out.
        console.log('IMDB Ratings:', JSON.parse(body).Ratings[0].Value .blue); //IMDB Rating of the movie.
        console.log('Rotten Tomatoes Ratings: ', JSON.parse(body).Ratings[1].Value .red); //Rotten Tomatoes Rating of the movie.
        console.log("Country produced in: ", JSON.parse(body).Country .yellow); //Country where the movie was produced.
        console.log("Language(s): ", JSON.parse(body).Language .green); //Language of the movie.
        console.log("Plot: ", JSON.parse(body).Plot .blue); //Plot of the movie.
        console.log("Actors: ", JSON.parse(body).Actors .yellow, "\n"); //Actors in the movie.

      } else {
        console.log("Movie not found");
        console.log(response.statusCode);
      };

    });
  } else {

    Request("http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&type=movie&plot=full", function (error, response, body) {
      //  console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //  console.log('body:', body); // Print the HTML for the Google homepage.

      if (response.statusCode === 200 && JSON.parse(body).Title) {

        console.log("\nTitle: ", JSON.parse(body).Title .red); // Title of the movie.
        console.log("Release Year: ", JSON.parse(body).Year .green); //Year the movie came out.
        console.log('IMDB Ratings:', JSON.parse(body).Ratings[0].Value .blue); //IMDB Rating of the movie.
        console.log('Rotten Tomatoes Ratings: ', JSON.parse(body).Ratings[1].Value .red); //Rotten Tomatoes Rating of the movie.
        console.log("Country produced in: ", JSON.parse(body).Country .yellow); //Country where the movie was produced.
        console.log("Language(s): ", JSON.parse(body).Language .green); //Language of the movie.
        console.log("Plot: ", JSON.parse(body).Plot .blue); //Plot of the movie.
        console.log("Actors: ", JSON.parse(body).Actors .yellow, "\n"); //Actors in the movie.

      } else {
        console.log("Movie not found");
        console.log(response.statusCode);
      };

    });
  };
};

function doWhatItSays() {

  // This block of code will read from the "random.txt" file.
  // The code will store the contents of the reading inside the variable "data"
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    //console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    //console.log(dataArr);


    var params = {
      type: 'track',
      query: dataArr[1],
      limit: 1
    };

    spotify.search(params, function (err, response) {

      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("\nSong Title: ", response.tracks.items[0].name .red);
      console.log("Artist: ", response.tracks.items[0].artists[0].name .green);
      console.log("Album: ", response.tracks.items[0].album.name .grey);
      console.log("Release Date: ", response.tracks.items[0].album.release_date .yellow);
      console.log("Preview URL: ", response.tracks.items[0].preview_url.underline .blue);
      console.log("-----------------------------------------------------------\n");
    });

  });
};
