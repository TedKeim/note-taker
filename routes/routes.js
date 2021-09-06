const fs = require('fs');
const path = require('path');

module.exports = app => {

    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });



        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });


        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });


        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });