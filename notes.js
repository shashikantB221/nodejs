const fs = require("fs")
const chalk = require("chalk")

const getNotesByTitle = function (title)
{
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if (note)
    {
        console.log(chalk.cyanBright(note.title, " : ", note.body));
    }
    else
    {
        console.log(chalk.red("Note not found!"));
    }
}

const addNote = function (title, body)
{
    const notes = loadNotes()

    const newNote = {
        title: title,
        body: body
    }
    const isDuplicate = isDuplicateNote(newNote);
    if (isDuplicate)
    {
        console.log(chalk.red("Note title already exists!"));
        return;
    }
    else
    {
        notes.push(newNote)
        saveNotes(notes)
        console.log(chalk.greenBright("Note added!"))
    }
}

const isDuplicateNote = function (notes)
{
    const allNotesData = loadNotes();
    if (allNotesData.find(note => note.title === notes.title))
    {
        return true;
    }
    return false;
}

const loadNotes = function ()
{
    try
    {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e)
    {
        console.log(chalk.red('Error loading notes:', e));
        return [];
    }
};

const saveNotes = function (notes)
{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const removeNote = function (title)
{
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title);
    if (filteredNotes.length === notes.length)
    {
        console.log(chalk.red("Note not found!"));
    }
    else
    {
        saveNotes(filteredNotes);
        console.log(chalk.greenBright("Note removed!"));
    }
}

const getNotesList = function ()
{
    const notes = loadNotes();
    if (notes.length > 0)
    {
        console.table(notes.map(note => ({ Title: note.title, Body: note.body })));
    }
    else
    {
        console.log(chalk.blueBright("No notes found!"));
    }

}

module.exports = {
    addNote: addNote,
    getNotesByTitle: getNotesByTitle,
    removeNote: removeNote,
    getNotesList: getNotesList
}