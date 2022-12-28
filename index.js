const express = require('express');

const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    try {
        const usersPostsCollection = client.db('smMedia').collection('userPosts');
        const commentCollection = client.db('smMedia').collection('postComment');

        app.get('/posts', async (req, res) => {
            const query = {};
            const posts = await usersPostsCollection.find(query).toArray();
            res.send(posts);
        });

        app.get('/posts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const singelPost = await usersPostsCollection.findOne(query);
            res.send(singelPost)
        });


      
        app.get('/post/comment/:commentId', async (req, res) => {
            const commentId = req.params.commentId;
            const query = { commentId }
            const comment = await commentCollection.find(query).toArray();
            res.send(comment);
        });



        app.post('/post/comment', async (req, res) => {
            const comment = req.body;
            console.log(comment);
            const result = await commentCollection.insertOne(comment);
            res.send(result);
        });



        app.post('/posts', async (req, res) => {
            const post = req.body;
            console.log(post);
            const result = await usersPostsCollection.insertOne(post);
            res.send(result);
        });


    }

    finally {

    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('sm-media server running');
})

app.listen(port, () => console.log(`Doctors portal running on ${port}`))