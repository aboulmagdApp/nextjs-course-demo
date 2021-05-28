// /api/new-meetup
import { MongoClient } from 'mongodb';
async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;
        // const {title, image, address, description} = data;
        const client = await  MongoClient.connect('mongodb://aboulmagd:aqtkOcbhYbQD0biM@cluster0-shard-00-00-vjxvu.mongodb.net:27017,cluster0-shard-00-01-vjxvu.mongodb.net:27017,cluster0-shard-00-02-vjxvu.mongodb.net:27017/meetups?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await  meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: 'Meetup inserted'});
    } 
}

export default handler;