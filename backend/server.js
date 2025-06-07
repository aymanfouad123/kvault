const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const { ObjectId } = require("mongodb");

dotenv.config();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "kvault";
const app = express();
const port = 3000;
app.use(bodyparser.json());

app.get("/passwords", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const passwords = await collection.find({}).toArray();
  res.json(passwords);
});

app.post("/passwords", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const result = await collection.insertOne(req.body);
  res.json(result);
});

app.delete("/passwords/:id", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const result = await collection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port - http://localhost:${port}`);
});
