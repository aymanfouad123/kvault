const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const { ObjectId } = require("mongodb");
var cors = require("cors");

dotenv.config();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "kvault";
const app = express();
const port = 3000;
app.use(bodyparser.json());
app.use(cors());

client.connect();

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
  try {
    const db = client.db(dbName);
    const collection = db.collection("passwords");

    console.log("Received delete request for ID:", req.params.id);

    // Validate ObjectId format
    if (!ObjectId.isValid(req.params.id)) {
      console.log("Invalid ObjectId format:", req.params.id);
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    console.log("Delete operation result:", result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Password not found" });
    }

    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port - http://localhost:${port}`);
  console.log(`Check records at - http://localhost:${port}/passwords`);
});
