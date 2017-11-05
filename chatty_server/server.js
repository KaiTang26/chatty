// server.js

const express = require('express');

const SocketServer = require('ws').Server;

const uuid = require("uuid")


//Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', ()=> console.log(`listening on ${PORT}`));

const wss = new SocketServer({server});

let outMessage ={};

let userNumber =0;

wss.on('connection', (ws)=>{

  userNum=wss.clients.size

  wss.broadcast(JSON.stringify({type:"userNumber", userNumber: userNum }));

  console.log(userNum);


  console.log('Client connected');



  ws.on('message', _handleMessage);

  ws.on('close', ()=>{

    userNum=wss.clients.size
    wss.broadcast(JSON.stringify({type:"userNumber", userNumber: userNum }));
    console.log(userNum);
    console.log('Client disconnected')});


})

wss.broadcast=(data)=>{


  wss.clients.forEach((client)=>{
    client.send(data);
  });

}



const createPostNotification =function(message, userId){



  outMessage.type="incomingNotification";

  outMessage.id=userId;

  outMessage.content=message.content;

  console.log(outMessage);

  wss.broadcast(JSON.stringify(outMessage));
}

const createPostMessage =function(message, userId){

  outMessage.type="incomingMessage";

  outMessage.id=userId;

  outMessage.username=message.username;

  outMessage.content=message.content;

  outMessage.color=message.color;

  console.log(outMessage);

  wss.broadcast(JSON.stringify(outMessage));
}

const _handleMessage =function(incoming){

  const message = JSON.parse(incoming);

  console.log(message);

  const userId = uuid();


  if(message.type==="postNotification"){

    console.log("notify")

    createPostNotification(message, userId);

  } else{


    createPostMessage(message, userId);

  }








}










