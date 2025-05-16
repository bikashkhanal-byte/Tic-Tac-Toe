

  const express = require('express')
  const cors = require('cors')
  const crypto = require('crypto')

  const app = express()
  const port = 3000


  app.use(cors());
  app.use(express.json());

  const rooms = {}

  //room created 
  app.post('/create-room', (req, res) => {
    const roomId = crypto.randomBytes(16).toString('hex');
    const player1Id = crypto.randomBytes(16).toString('hex');
  
    if (rooms[roomId]) {
      return res.status(400).send({ message: 'Room already exists' });
    }
    rooms[roomId] = {
      player1Id,
      player2Id: null
    };
    
    res.send({
       message: 'Room created successfully',
       roomId: roomId
      
      });
  });
  
  //player 2 joins toom

  app.post('/join-room', (req, res) => {
  
    const roomId = crypto.randomBytes(16).toString('hex');
    const player2Id = crypto.randomBytes(16).toString('hex');

    if (rooms[roomId]) {
      return res.status(400).send({ message: 'Room already exists' });
    }
  
    if(roomId.player2Id){
      return res.status(400).send({ message: 'Room already has player 2 ' });
      }

    roomId.player2Id = player2Id;
    rooms[roomId] = {
    player1Id,
      player2Id,
    };
  
    res.send({ message: 'Room created successfully' });
  });
  
  
  app.listen(port , () =>{
    console.log(`server running on https://${port}`);
  })