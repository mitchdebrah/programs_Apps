import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';


const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/CRUD-app-db';

app.use(express.json());

app.use('/posts', postRoutes);

mongoose.connect(MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false
})

.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

mongoose.connection.once('open', ()=> {
    console.log('connected to mongo :)')
})

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// const whitelist = ['http://localhost:3000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions))

// const songsController = require('./controllers/songs.js')
// const moviesController = require('./controllers/movies.js')

// app.use('/songs/', songsController)
// app.use('/movies/', moviesController)

app.get('/', (req, res) => {
  res.send('server up')
})

app.listen(PORT, () => {
    console.log('listening on', PORT)
  })