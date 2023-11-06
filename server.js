const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'encryption_db';
let db;

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  db = client.db(dbName);
  console.log(`Connected to database ${dbName}`);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to store text
app.post('/store', (req, res) => {
  const { encryptedText, decryptedText } = req.body;
  const collection = db.collection('texts');

  collection.insertOne({ encryptedText, decryptedText }, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'An error occurred', error: err });
    } else {
      res.status(200).send({ message: 'Text stored successfully', data: result.ops });
    }
  });
});

// Route to retrieve texts
app.get('/texts', (req, res) => {
  const collection = db.collection('texts');

  collection.find({}).toArray((err, docs) => {
    if (err) {
      res.status(500).send({ message: 'An error occurred', error: err });
    } else {
      res.status(200).send({ texts: docs });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
