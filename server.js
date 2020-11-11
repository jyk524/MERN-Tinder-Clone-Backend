import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'

// App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:1234asdf@cluster0.5ee4w.mongodb.net/tinderdb?retryWrites=true&w=majority'

// Middlewares

// DB Config
mongoose.connect(connection_url, {
    // Used to make the connection to mongoose better
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

// API Endpoints
app.get('/', (req,res) => res.status(200).send('Hello World'));
app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('tinder/cards', (req, res) => {
    Cards.find(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// Listener
app.listen(port, () => console.log(`listening on local host ${port}`))