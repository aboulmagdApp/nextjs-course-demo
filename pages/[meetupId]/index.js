import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name="descriptioon"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                title={props.meetupData.title}
                image={props.meetupData.image}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb://aboulmagd:aqtkOcbhYbQD0biM@cluster0-shard-00-00-vjxvu.mongodb.net:27017,cluster0-shard-00-01-vjxvu.mongodb.net:27017,cluster0-shard-00-02-vjxvu.mongodb.net:27017/meetups?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();
    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb://aboulmagd:aqtkOcbhYbQD0biM@cluster0-shard-00-00-vjxvu.mongodb.net:27017,cluster0-shard-00-01-vjxvu.mongodb.net:27017,cluster0-shard-00-02-vjxvu.mongodb.net:27017/meetups?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
    client.close();
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}
export default MeetupDetails;