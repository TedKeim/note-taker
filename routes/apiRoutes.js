const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
const { v4: uuidv4 } = require('uuid');
const Middle = require('../db/middleware')


module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.json(data);
  });
  app.get("/api/notes/:id", (req, res) => {
    res.json(data[Number(req.params.id)]);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const deleteId = req.params.id

    Middle.deleteNote(deleteId)
    res.json("true")
  })

  app.post("/api/notes", (req, res) => {
    let note = req.body;
    let uniqueID = data.length;
    console.log(uniqueID);
    note.id = uniqueID;
    data.push(note);
    req.body.id = uuidv4();

    fs.writeFileSync("../db/db.json", JSON.stringify(data), (err) => {
      if (err) console.log(err);
    });

    res.json(data);
  });

}