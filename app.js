var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
const passport = require('passport');
const avisRoute = require("./routes/avis");
const serviceRoute = require("./routes/services");
const messageRoute = require('./routes/message')
const cors = require('cors');

var app = express();

const server2 = require('http').createServer(app);
const io2 = require('socket.io')(server2, {
  cors: {
    origin: '*',
  },
});
// Configure CORS 
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', avisRoute);
app.use('/', serviceRoute); 
app.use('/', messageRoute);



// Passport
app.use(passport.initialize())
require('./security/passport')(passport)




// Connect To db
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to db"))
.catch(err => console.log(err))
app.use('/api', indexRouter);

// Gestion des connexions Socket.IO
io2.on('connection', (socket) => {
    console.log('Un client s\'est connecté');
  
  // Rejoindre une room spécifique
  socket.on('joinRoom', ({ userId, providerId }) => {
    const roomName = `user_${userId}_provider_${providerId}`;
    socket.join(roomName);
    console.log(`Un client a rejoint la room ${roomName}`);
  });

// Gestion des messages du chat
socket.on('sendMessage', (data) => {
  console.log('Message envoyé :', data); // Ajoutez cette ligne
  const roomName = `user_${data.userId}_provider_${data.providerId}`;
  io2.to(roomName).emit('receiveMessage', data);
});


  
    socket.on('disconnect', () => {
      console.log('Un client s\'est déconnecté');
    });
  });
  
  server2.listen(3060, () => {
    console.log('Serveur React.js lancé sur le port 3060'); 
  });

module.exports = app; 
