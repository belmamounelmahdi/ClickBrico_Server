const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const URI = 'mongodb+srv://belmamounelmahdi:belmamounelmahdi2023@brico.lzoytr2.mongodb.net/message?retryWrites=true&w=majority';
const MOBILE_URI = 'mongodb+srv://belmamounelmahdi:belmamounelmahdi2023@brico.lzoytr2.mongodb.net/auth_jobber?retryWrites=true&w=majority';
const express = require('express');
const router = express.Router();

const mobileDB = mongoose.createConnection(MOBILE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const message = mongoose.model('message', messageSchema);

module.exports = message;

const JobberModel = new mongoose.Schema({
    name: "string",
    service: "string",
    email: {
        type: 'string',
        trim: true,
        unique: true
    },
    password: "string",
    role: "string"
}, {
    timestamps: true
})
const jobbers = mobileDB.model('jobbers', JobberModel)

const msg = new MongoClient(URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

async function connectToDatabase() {
    try {
        await msg.connect();
        console.log('Connected to the message!');
    } catch (err) {
        console.log('Failed to connect to the database:', err);
    }
}

async function insertMessage(message) {
    const client = await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('message');
    const messages = db.collection('message');
  
    // Récupérer l'ID du destinataire à partir de l'email
    const recipient = await jobbers.findOne({ email: message.recipient });
    if (!recipient) {
      throw new Error('Recipient not found');
    }
  
    // Ajouter l'ID du destinataire à l'objet de message
    message.recipientId = recipient._id;
  
    // Insérer le message dans la base de données
    await messages.insertOne(message);
    console.log('Message inserted into the database!');
  
    // Fermer la connexion
    client.close();
  }

// Appel de la fonction connectToDatabase() pour se connecter à la base de données
connectToDatabase();

// Définir une route POST pour insérer un message dans la base de données
router.post('/send-message', async (req, res) => {
    try {
        const { sender, recipient, body } = req.body;
        const db = msg.db('message');
        const jobbersCollection = mobileDB.collection('jobbers');
        const provider = await jobbersCollection.findOne({ email: recipient });
        if (!provider) {
            throw new Error('Invalid recipient');
        }
        const newMessage = new message({
            sender,
            recipient: provider._id,
            body
        });
        await newMessage.save();
        console.log('Message inserted into the database!');
        res.status(200).json({ message: 'Message inserted into the database!' });
    } catch (err) {
        console.error('Failed to insert message into the database:', err);
        res.status(500).json({ error: 'Failed to insert message into the database' });
    }
});



module.exports = router;






































// const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
// const URI = 'mongodb+srv://belmamounelmahdi:belmamounelmahdi2023@brico.lzoytr2.mongodb.net/message?retryWrites=true&w=majority';
// const express = require('express');
// const router = express.Router();

// const mobileDB = mongoose.createConnection(process.env.MOBILE_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });


// const JobberModel = new mongoose.Schema({
//     name: "string",
//     service: "string",
//     email: {
//         type: 'string',
//         trim: true,
//         unique: true
//     },
//     password: "string",
//     role: "string"
// }, {
//     timestamps: true
// })
// const jobbers = mobileDB.model('jobbers', JobberModel)

// const msg = new MongoClient(URI, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
// });

// async function connectToDatabase() {
//     try {
//     await msg.connect();
//     console.log('Connected to the message!');
//     } catch (err) {
//     console.log('Failed to connect to the database:', err);
//     }
// }


// async function insertMessage(message) {
//     const db = msg.db('message');
//     const messages = db.collection('message');
    
//     // Récupérer l'ID du destinataire à partir de l'email
//     const recipient = await jobbers.collection('jobbers').findOne({ email: message.recipient });
//     if (!recipient) {
//         throw new Error('Recipient not found');
//     }
    
//     // Ajouter l'ID du destinataire à l'objet de message
//     message.recipientId = recipient._id;
    
//     // Insérer le message dans la base de données
//     await messages.insertOne(message);
//     console.log('Message inserted into the database!');
// }


//   // Appel de la fonction connectToDatabase() pour se connecter à la base de données
// connectToDatabase();



// // Définir une route POST pour insérer un message dans la base de données
// router.post('/send-message', async (req, res) => {
//     try {
//         const { sender, recipient, message } = req.body;
//       // Rechercher le destinataire dans la base de données
//         const db = msg.db('message');
//         const jobbers = jobbers.collection('jobbers');
//         const provider = await jobbers.findOne({ username: recipient });
//       // Vérifier que le prestataire a été trouvé
//         if (!provider) {
//         throw new Error('Invalid recipient');
//         }
//       // Insérer le message dans la base de données avec le destinataire spécifié
//         const messages = db.collection('message');
//         await messages.insertOne({ sender, recipient: provider._id, message });
//         console.log('Message inserted into the database!');
//         res.status(200).json({ message: 'Message inserted into the database!' });
//     } catch (err) {
//         console.error('Failed to insert message into the database:', err);
//         res.status(500).json({ error: 'Failed to insert message into the database' });
//     }
// });


// // Définir une route POST pour insérer un message dans la base de données
// // router.post('/send-message', async (req, res) => {
// //     try {
// //         const { user, tel, message } = req.body;
// //       // Appeler la fonction insertMessage() avec les paramètres de la requête
// //         await insertMessage({ sender: req.body.user, recipient: req.body.tel, message: req.body.message });
// //         res.status(200).json({ message: 'Message inserted into the database!' });
// //     } catch (err) {
// //         console.error('Failed to insert message into the database:', err);
// //         res.status(500).json({ error: 'Failed to insert message into the database' });
// //     }
// // });

// module.exports = router;
