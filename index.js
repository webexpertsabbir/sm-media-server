const express = require('express');

const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// sm-media
// kM1ofT4qJAIAIJBu


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sabbir.0dgpj5g.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/', async (req, res) => {
    res.send('sm-media server running');
})

app.listen(port, () => console.log(`Doctors portal running on ${port}`))