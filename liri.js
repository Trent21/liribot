var keys =  require("././keys.js");

var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');


var getMyTweets = function() {

  var client = new Twitter(keys.twitterKeys);

  var params = {screen_name: '  tmitch21_'};
  client.get('statuses/user_timeline', params, function(error, tweets, response)  {
    if (!error) {
      for (var i=0; i<tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(' ');
        console.log(tweets[i].text);
      }
    }
  });
}


var getArtistsNames = function(artists) {
  return artists.name;
}

 var getMeSpotify = function(songName) {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
         var songs = data.tracks.items
         for(var i=0; i<songs.length; i++) {
          console.log(i);
          console.log('artist(s): ' + songs[i].artists.map(getArtistsNames));
          console.log('song name: ' + songs[i].preview_url);
          console.log('album: ' + songs[i].album.name);
          console.log('------------------------------'); 
         }
    });
}


var getMeMovie = function(movieName) {

    request('http://www.omdbapi.com/?t=' + movieName , function (error, response, body) {
     if (!error && response.statusCode == 200) {
      vaj jsonData = JSON.parse(body);

      console.log('Title: ' + jsonData.Title);
      console.log('Year: ' + jsonData.Title);
      console.log('Rated: ' + jsonData.Title);
      console.log('IMBD Rating: ' + jsonData.Title);
      console.log('Coutnry: ' + jsonData.Title);
      console.log('Language: ' + jsonData.Title);
      console.log('Pilot: ' + jsonData.Title);
      console.log('Actors: ' + jsonData.Title);
      console.log('Rotten Tomatoes Rating: ' + jsonData.Title);
      console.log('Rotten Tomatoes URL: ' + jsonData.Title);

     }
    });
}


var doWhatItSays = function() {

fs.readFile('random.text', 'utf8', function(err, data) {
  if (err) throw err;
  
  var dataArr = data.split(',');

  if (dataArr.length == 2) {
    pick(dataArr[0], dataArr[1]);
  } else if (dataArr.length == 1) {
    pick(dataArr[0]);
  }

});
}

var pick = function(caseData, functionData) {
  switch(caseData) {
    case 'my-tweets' :
    getMyTweets ();
     break;

     case 'spotify-this-song':
     getMeSpotify(functionData);
     break;
     case 'movie-this':
     getMeMovie(functionData)
     case 'do-what-it-says':
     doWhatItSays();
     break;
     default:
     console.log('LIRI does not know that');
  }
}


var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

