// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const colors = ['#0000ff', '#009933', '#ff0000', '#ff00ff'];  //blue green red fuschia
let numUsers = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  numUsers++;

  console.log('Client connected');

  const assignedColor = colors[numUsers%4];
  console.log(assignedColor);
  ws.send(JSON.stringify({type: "color", color: assignedColor}));

  //sending numUsers for the first time
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({type: "numUsers", numUsers: numUsers}));
  });


  ws.on('message', function incoming(message) {
    let newMessage = JSON.parse(message);
    newMessage.id = uuid.v1();

    switch(newMessage.type) {
      case 'postMessage':
        newMessage.type = 'incomingMessage';
        break;

      case 'postNotification':
        newMessage.type = 'incomingNotification';
        break;


    };

    wss.clients.forEach(function each(client) {
      console.log("Sending Message",JSON.stringify({type: "numUsers", numUsers: numUsers}));
      client.send(JSON.stringify(newMessage));
    });

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    numUsers--;

    wss.clients.forEach(function each(client) {
      console.log("Sending Message",JSON.stringify({type: "numUsers", numUsers: numUsers}));
      client.send(JSON.stringify({type: "numUsers", numUsers: numUsers}));
    });
  });
});