/*eslint-disable*/
let arrRes = [];

// Greeting from script load
console.log("hello from devtools html page load");

// Listens for responses and fires for each one
chrome.devtools.network.onRequestFinished.addListener((request) => {
  console.log('Reqest: ', request);
  // Create object to send to server
  let data = {};
  // Sends a GET request to retrieve IP address information
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://freegeoip.net/json/' + request.serverIPAddress);
  xhr.send(null);
  
  // Invokes function when a response is returned
  xhr.onreadystatechange = function () {
    let DONE = 4; // readyState 4 means the request is done.
    let OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        // Create object with all of the properties of the response object
        let data = Object.assign({}, JSON.parse(xhr.responseText));
        // Add 'url' property
        data.url = request.request.url;
        // Check for 'referer' property
        let referer = request.request.headers.find(elem => {
          return elem.name === 'referer';
        });
        // If it's not undefined, then add it to 'data'
        if (referer) data.referer = referer.value;
        // Push to array to send to server
        arrRes.push(data);
        console.log(data); // 'This is the returned text.'
      } else console.log('Error: ' + xhr.status); // An error occurred during the request.
    }
  }
});

// Function which will send to the server the array of latitude and longitudes after 5 seconds
setTimeout(() => {
  // Create POST request with data sent to server in body
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:3000/recieve');
  xhr.setRequestHeader("Content-Type", 'application/json');
  console.log('POST request has been set', {arrRes});
  xhr.send(JSON.stringify({data: arrRes}));
}, 15000);