import MeetupDetails from "@/components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const { default: MeetupItem } = require("@/components/meetups/MeetupItem");
const { useRouter } = require("next/router");

export default function MeetItem(props) {
  const router = useRouter();
  //router.query.meetupid;
  return (
    <>
      <Head>
        <title>this is react Meetups</title>
        <meta name="description" content="this is give meetup list" />
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        id={props.meetupData.id}
        address={props.meetupData.address}
      />
    </>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Shivaprasad:Shivu%402000@cluster0.5wetoyi.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollections = db.collection("meetups");

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: true,
    paths: meetups.map((data) => ({
      params: { meetupid: data._id.toString() },
    })),
    // paths: [
    //   {
    //     params: {
    //       meetupid: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupid: "m2",
    //     },
    //   },
    // ],
  };
}
export async function getStaticProps(context) {
  const paramId = context.params.meetupid;
  const client = MongoClient.connect(
    "mongodb+srv://Shivaprasad:Shivu%402000@cluster0.5wetoyi.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = (await client).db();

  const meetupsCollections = db.collection("meetups");

  const meetups = await meetupsCollections.findOne({
    _id: new ObjectId(paramId),
  });

  console.log(meetups);

  (await client).close();

  console.log(paramId);
  return {
    props: {
      meetupData: {
        image: meetups.image,
        title: meetups.title,
        address: meetups.address,
        id: meetups._id.toString(),
      },
    },
  };
}
