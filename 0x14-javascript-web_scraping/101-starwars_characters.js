
javascript web scraping
0x14-javascript-web_scraping/0-readme.js


#!/usr/bin/node


const fs = require('fs');

// Import the built-in Node.js 'fs' module.


fs.readFile(process.argv[2], 'utf8', function (error, content) {

  // Use fs.readFile() to read the contents of a file specified as a command-line argument

  // 'utf8' specifies the encoding of the file being read


  if (error) {

    // If an error occurs during the file read operation, the 'error' parameter will contain an error object.

    console.error('Error reading the file:', error);


  } else {

    // If the file is read successfully, the 'content' parameter will contain the contents of the file as a string.

    console.log(content);

  }

});


0x14-javascript-web_scraping/1-writeme.js


#!/usr/bin/node


const fs = require('fs');

// Import the built-in Node.js 'fs' module.


fs.writeFile(process.argv[2], process.argv[3], 'utf8', error => {

  // Use fs.writeFile() to write data to a file specified as the third command-line argument (process.argv[2]).

  // The data to be written is taken from the fourth command-line argument (process.argv[3]).


  if (error) {

    // If an error occurs during the write operation, the 'error' parameter will contain an error object.

    console.error(error);

  }

});



0x14-javascript-web_scraping/2-statuscode.js


#!/usr/bin/node


const request = require('request');

// Import the 'request' module.


request.get(process.argv[2])

// Use the 'request' module to perform an HTTP GET request to the URL.


  .on('response', function (response) {

    // Set up an event listener for the 'response' event emitted by the HTTP request.


    console.log(`code: ${response.statusCode}`);

    // Log the HTTP status code of the response to the console.

  });



0x14-javascript-web_scraping/3-starwars_title.js


#!/usr/bin/node


// Import the 'request' module.

const request = require('request');


// Construct the URL for the specific Star Wars film

const url = 'https://swapi-api.alx-tools.com/api/films/' + process.argv[2];


// Use the 'request' module to perform an HTTP GET request to the constructed URL.

request(url, function (error, response, body) {

  // log title if successful, log error if not.

  console.log(error || JSON.parse(body).title);

});



0x14-javascript-web_scraping/4-starwars_count.js


#!/usr/bin/node


// Import the 'request' module

const request = require('request');


// Use the 'request' module to perform an HTTP GET request to the URL

request(process.argv[2], function (error, response, body) {

  // Check if there was no error during the HTTP request.

  if (!error) {

    // parse the JSON data and extract the "results" array

    const results = JSON.parse(body).results;

    // Use the 'reduce()' method to iterate through the movies in the 'results' array.

    console.log(results.reduce((count, movie) => {

      // check if there is a character with ID 18 ('/18/') in the 'characters' array.

      return movie.characters.find((character) => character.endsWith('/18/'))

        // If a character with ID 18 is found, increment the count by 1.

        ? count + 1

        // Otherwise, keep the count unchanged.

        : count;

      // The 'reduce()' method starts with an initial value of 0 ('0' at the end).

    }, 0));

  }

});



0x14-javascript-web_scraping/5-request_store.js


#!/usr/bin/node


// Import the built-in Node.js 'fs' module

const fs = require('fs');


// Import the 'request' module

const request = require('request');


// Use the 'request' module to perform an HTTP GET request to the URL

request(process.argv[2]).pipe(fs.createWriteStream(process.argv[3]));



0x14-javascript-web_scraping/6-completed_tasks.js


#!/usr/bin/node


const request = require('request');


const apiUrl = process.argv[2];


request(apiUrl, function (error, response, body) {

  if (!error && response.statusCode === 200) {

    try {

      const todos = JSON.parse(body);


      const completed = {};


      todos.forEach((todo) => {

        if (todo.completed) {

          if (completed[todo.userId] === undefined) {

            completed[todo.userId] = 1;

          } else {

            completed[todo.userId]++;

          }

        }

      });


      const output = `{${Object.entries(completed).map(([key, value]) => ` '${key}': ${value}`).join(',\n ')} }`;


      console.log(Object.keys(completed).length > 2 ? output : completed);

    } catch (parseError) {

      console.error('Error parsing JSON:', parseError);

    }

  } else {

    console.error('Error:', error);

  }

});



0x14-javascript-web_scraping/100-starwars_characters.js


#!/usr/bin/node


const request = require('request');


const movieId = process.argv[2];

const apiUrl = `https://swapi.dev/api/films/${movieId}/`;


request(apiUrl, function (error, response, body) {

  if (!error && response.statusCode === 200) {

    const movieData = JSON.parse(body);


    console.log(`Characters of "${movieData.title}":`);


    movieData.characters.forEach((characterUrl) => {

      request(characterUrl, function (charError, charResponse, charBody) {

        if (!charError && charResponse.statusCode === 200) {

          const characterData = JSON.parse(charBody);


          console.log(characterData.name);

        } else {

          console.error('Error fetching character data:', charError);

        }

      });

    });

  } else {

    console.error('Error fetching movie data:', error);

  }

});


0x14-javascript-web_scraping/101-starwars_characters.js


#!/usr/bin/node


const request = require('request');


const movieId = process.argv[2];


const apiUrl = `https://swapi.dev/api/films/${movieId}/`;


//  the 'request' module to perform an HTTP GET request to the Star Wars API URL.

request(apiUrl, function (error, response, body) {

  // Check if there was no error during the HTTP request

  if (!error && response.statusCode === 200) {

    // Parse the JSON response bod

    const movieData = JSON.parse(body);

    // create an array of promises that fetch the data for each individual character.

    const characterPromises = movieData.characters.map((characterUrl) => {

      return new Promise((resolve, reject) => {

        // Use another 'request' to fetch the data for the individual character.

        request(characterUrl, function (charError, charResponse, charBody) {

          // Check if there was no error during the HTTP request

          if (!charError && charResponse.statusCode === 200) {

            // Parse the JSON response body

            const characterData = JSON.parse(charBody);

            // Resolve the promise with the name of the character.

            resolve(characterData.name);

          } else {

            // reject the promise with the error message if  there was an error during the HTTP request

            reject(new Error(`Error fetching character data: ${charError}`));

          }

        });

      });

    });


    Promise.all(characterPromises)

      .then((characterNames) => {

        console.log(characterNames.join('\n'));

      })

      .catch((error) => {

        console.error(error.message);

      });

  } else {

    console.error('Error fetching movie data:', error);

  }

});
