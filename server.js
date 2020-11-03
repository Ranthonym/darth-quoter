const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

console.log("May Node be with you");

const connectionString =
  "mongodb+srv://jedi:knightacademy@cluster0.zjj8r.mongodb.net/<dbname>?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("darth-quoter");
    const quotesCollection = db.collection("quotes");
    app.listen(3000, function () {
      console.log("listening on 3000");
    });

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      // res.send("Hello World");
      res.sendFile(`${__dirname}/index.html`);
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));
