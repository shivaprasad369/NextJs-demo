import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>this is react Meetups</title>
        <meta name="description" content="this is give meetup list" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_DATA,
//     },
//   };
// }
export async function getStaticProps() {
  const client = MongoClient.connect(
    "mongodb+srv://Shivaprasad:Shivu%402000@cluster0.5wetoyi.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = (await client).db();
  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find().toArray();
  (await client).close();
  return {
    props: {
      meetups: meetups.map((meet) => ({
        title: meet.title,
        image: meet.image,
        address: meet.address,
        id: meet._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
