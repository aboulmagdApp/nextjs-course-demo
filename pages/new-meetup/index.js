// our-domain.com/new-meetup
import Head from 'next/head';
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";


function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        const respones = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await respones.json();
        console.log(data);
        router.push('/')
    }
    return (
        <>
            <Head>
                <title>New React Meetups</title>
                <meta
                    name="descriptioon"
                    content="add your new meetups"
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>

    );
}


export default NewMeetupPage;