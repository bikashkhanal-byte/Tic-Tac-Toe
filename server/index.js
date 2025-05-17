
import { Socket } from 'dgram';
import express from express; 
const cors = require('cors')
const crypto = require('crypto')

const app = express()
const port = 3000
const generateID = () => crypto.randomUUID();
app.use(cors());
app.use(express.json());


const path=require("path")
const http=require("http")
const {Server}=require("socket.io")
const server=http.createServer(app)
const io=new Server(server)
app.use(express.static("public"))

io.on('connections',(socket) => {
   console.log('A user connected:', socket.id);

   socket.on('move', (data) => {
     socket.broadcast.emit('move', data); // send move to the other player
   });
   
   socket.on('disconnect', () => {
     console.log('A user disconnected:', socket.id);
   });

})   



  const rooms = {
    [roomId]: {
      player1Id: null,
      player2Id: null,
      moves: []
    }
  }
  
  //room created 
console.log("Room Created Sucessfully!");


//player 2 joins toom
  app.post('/join-room', (req, res) => {

  const { roomId } = req.body; 
  if (!roomId) {
    return res.status(400).send({ message: "roomId is required" });
  }

  const room = rooms[roomId];
  if (!room) {
    return res.status(404).send({ message: "Room not found" });
  }
  
  if (!room.player1Id) {
    const player1Id = crypto.randomUUID();
    room.player1Id = player1Id;
    return res.send({
      message: "Player joined successfully.",
      roomId,
      playerId: player1Id,
      role: "player1"
    });
  }

  if (!room.player2Id) {
    const player2Id = crypto.randomUUID();
    room.player2Id = player2Id;
    return res.send({
      message: "Player joined successfully.",
      roomId,
      playerId: player2Id,
      role: "player2"
    });
  }

  return res.status(403).send({ message: "Room is full" });


});


  app.get('/moves', (req, res) =>{
  
    const rooms = rooms[roomId];

    if(!rooms)
      return res.status(403).send({message: "Room not found"}) 

    if(!playerId == player1Id &&!playerId == player2Id ){
      return res.status(403).send({message: "Invalid player"})
    }

    res.moves.push({playerId , moves})

    res.send({message:"Move Recived" , moves:rooms.moves})
  })


  app.listen(port , () =>{
    console.log(`server running on https://${port}`);
  })


