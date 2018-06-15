require("dotenv").config();
var request = require('request');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var userInput = process.argv[3];


switch (command) {
        case `my-tweets`:
        myTweets();
        break;

// how to integrate if no song input??
        case `spotify-this-song`:
        spotifyThisSong(userInput);
        break;

        case `movie-this`:
        movieLookup(userInput);
        break;

        case `do-what-it-says`:
        //read file first
        // form of string --> convert to array
        // split + grab name of song
        // pass name of song to song function
        //add to .txt file
        break;

    default:
        break;
}

function myTweets() {
    var params = {
        screen_name: '@LeandraReid'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (var i = 0; i <= 19; i++) {
                console.log("Tweet number " + [i] + " : " + tweets[i].text);
                console.log("This was tweeted on: " + tweets[i].created_at);
            };
        };
    });
};



//spotify sample function
function spotifyThisSong(userInput){

    if (!userInput){
        noSongInput();
    } else {
    //if else statement for missing input (give song the sign by ace of base)
    spotify
        .search({
            type: 'track',
            query: userInput
        })
        .then(function (response) {
            var songs = response.tracks.items;
            console.log("You chose the song " + songs[0].name);
            console.log("This song is by artist " + songs[0].artists[0].name);
            console.log("This song is from the album " + songs[0].album.name);
            console.log("You can play the song here:" + songs[0].external_urls.spotify);
        })
        .catch(function (err) {
            console.log(err);
        });
    };
};


function noSongInput(){
    spotify
        .search({
            type: 'track',
            query: 'the sign ace of base'
        })
        .then(function (response) {
            var songs = response.tracks.items;
            console.log("You didn't choose the song but I'm show it to you anyways : " + songs[0].name);
            console.log("This song is by artist " + songs[0].artists[0].name);
            console.log("This song is from the album " + songs[0].album.name);
            console.log("You can play the song here: " + songs[0].external_urls.spotify);
        })
        .catch(function (err) {
            console.log(err);
        });
};



function movieLookup(userInput) {
    //request sample function

    request('http://www.omdbapi.com/?t=' + userInput + '&apikey=trilogy', function (error, response, body) {
        var movie = JSON.parse(body);
        console.log(movie);
        console.log("You have chosen the movie : " + movie.Title);
        console.log("It was released on : " + movie.Released);
        console.log("IMDB gives it a rating of : " + movie.Ratings[0].Value);
        console.log("Rotten Tomatoes gives it a rating of : " + movie.Ratings[1].Value);
        console.log("It was produced in : " + movie.Country);
        console.log("It was made in : " + movie.Language);
        console.log("A brief plot summary : " + movie.Plot);
        console.log("It stars : " + movie.Actors);
    });
};



