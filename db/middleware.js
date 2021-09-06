const fs = require('fs') 
const uniqid = require('uniqid') 
const util = require('util') 
const noteFile = require('./db.json')


const readAsync = util.promisify(fs.readFile)
const writeAsync = util.promisify(fs.writeFile)

class MiddleDb {
 
readFile(){
    return readAsync("./db/db.json", "utf8")
}

async writeFile(note){
    note.id = uniqid()
    console.log('about to write this note to db.json ', note)
    const notes = await this.getNotes()
    notes.push(note)
    console.log('notes ', notes)
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