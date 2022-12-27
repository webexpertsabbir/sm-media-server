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
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const usersPostsCollection = client.db('smMedia').collection('userPosts');

        app.get('/posts', async (req, res) => {
            const query = {};
            const posts = await usersPostsCollection.find(query).toArray();
            res.send(posts);
        });
        

        app.post('/posts', async (req, res) => {
            const post = req.body;
            console.log(post);
            const result = await usersPostsCollection.insertOne(post);
            res.send(result);
        });
        

    }

    finally{

    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('sm-media server running');
})

app.listen(port, () => console.log(`Doctors portal running on ${port}`))