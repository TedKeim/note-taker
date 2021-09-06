const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
const { v4: uuidv4 } = require('uuid');


module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.json(data);
  });
  app.get("/api/notes/:id", (req, res) => {
    res.json(data[Number(req.params.id)]);
  });

  app.post("/api/notes", (req, res) => {
    let note = req.body;
    let uniqueID = data.length;
    console.log(uniqueID);
    note.id = uniqueID;
    data.push(note);
    req.body.id = uuidv4();

    app.delete("/api/notes/:id", (req, res) => {
        notes.splice(req.params.id, 1);
        updateDb();
        console.log("Deleted note with id "+req.params.id);
    });

    function updateDb() {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) throw err;
            return true;
        });
    }


    fs.writeFileSync("../db/db.json", JSON.stringify(data), (err) => {
      if (err) console.log(err);
    });

    res.json(data);
  });

}