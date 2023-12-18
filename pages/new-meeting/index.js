import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";

export default function NewMeetup() {
  const router = useRouter();
  async function addMettingHandler(enteredMeetupData) {
    console.log(JSON.stringify(enteredMeetupData));
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push("/");
    console.log(data);
  }
  return (
    <>
      <Head>
        <title>this is react Meetups</title>
        <meta name="description" content="this is give meetup list" />
      </Head>
      <NewMeetupForm onAddMeetup={addMettingHandler} />;
    </>
  );
}
