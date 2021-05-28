// our-domain.com/
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'first one title',
//     image: 'https://img.theculturetrip.com/450x/smart/wp-content/uploads/2020/10/rkm48m-e1603870286120.jpg',
//     address: 'some address 5',
//     description: 'the description'
//   },
//   {
//     id: 'm2',
//     title: 'secound one title',
//     image: 'https://i2.wp.com/www.agoda.com/wp-content/uploads/2019/06/shutterstock_721552321-1024x683.jpg',
//     address: 'some address 7',
//     description: 'the description two'
//   }
// ]
function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta 
          name="descriptioon" 
          content="browse a huge list of highly active" 
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
    );
}

export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect('mongodb://aboulmagd:aqtkOcbhYbQD0biM@cluster0-shard-00-00-vjxvu.mongodb.net:27017,cluster0-shard-00-01-vjxvu.mongodb.net:27017,cluster0-shard-00-02-vjxvu.mongodb.net:27017/meetups?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1,
  };
}

export default HomePage;