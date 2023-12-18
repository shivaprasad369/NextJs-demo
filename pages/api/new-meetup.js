import { MongoClient } from "mongodb";
import { Mongoose } from "mongoose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { image, title, address, id } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://Shivaprasad:Shivu%402000@cluster0.5wetoyi.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted" });
  }
}
