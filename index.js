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
        const aboutCollection = client.db('smMedia').collection('about');
        const loveReactCollection = client.db('smMedia').collection('loveReact');

        app.get('/posts', async (req, res) => {
            const query = {};
            const posts = await usersPostsCollection.find(query).toArray();
            res.send(posts);
        });

        app.get('/user/admin/about', async (req, res) => {
            const query = {};
            const posts = await aboutCollection.find(query).toArray();
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


        app.put('/post/love/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const loveReact = req.body;
            const updatedDoc = {
                $set: {
                    loveReact,
                }
            }
            const result = await usersPostsCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });

        app.put('/user/admin/about/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const about = req.body;
            // const updatedDoc = {
            //     $set: {
            //         loveReact,
            //     }
            // }
            const result = await aboutCollection.replaceOne(filter, about);
            res.send(result);
        });



        // app.post('/post/love', async (req, res) => {
        //     const loveReact = req.body;
        //     // console.log(comment);
        //     const result = await loveReactCollection.insertOne(loveReact);
        //     res.send(result);
        // });


        app.post('/post/comment', async (req, res) => {
            const comment = req.body;
            // console.log(comment);
            const result = await commentCollection.insertOne(comment);
            res.send(result);
        });


        app.post('/post/loverect', async (req, res) => {
            const loveReact = req.body;
            // console.log(comment);
            const result = await loveReactCollection.insertOne(loveReact);
            res.send(result);
        });


        app.post('/posts', async (req, res) => {
            const post = req.body;
            // console.log(post);
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