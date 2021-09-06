const fs = require('fs') 
const { v4: uuidv4 } = require('uuid');
const util = require('util') 
const noteFile = require('./db.json')


const readAsync = util.promisify(fs.readFile)
const writeAsync = util.promisify(fs.writeFile)

class MiddleDb {
 
readFile(){
    return readAsync("./db/db.json", "utf8")
}

async writeFile(note){
    note.id = uniqueID()
    const notes = await this.getNotes()
    data.push(note);
    req.body.id = uuidv4();
    return fs.writeFileSync("db/db.json", JSON.stringify(notes)), err => {
        if (err) throw err;
    }
}
 
 getNotes(){
     return this.readFile() 
     .then(notes => {
         let notesARR = []
         notesARR = notesARR.concat(JSON.parse(notes))
         return notesARR
     })
 }

 deleteNote(deleteId){

    return this.getNotes()
    .then(notes => {
        notes.filter(note => note.id !== deleteId)
    }).then(filteredNotes => {this.writeFile(filteredNotes)})
}

}

module.exports = new MiddleDb()