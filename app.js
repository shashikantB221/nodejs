const notes = require("./notes.js")
const chalk = require("chalk")
const yargs = require("yargs")

// yargs.version("1.1.0")

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv)
    {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv)
    {
        notes.removeNote(argv.title)
    }
})

//List all notes
yargs.command({
    command: "list",
    describe: "list all notes",    
    handler()
    {
        notes.getNotesList();
    }
})

//get note by title
yargs.command({
    command: "getNoteByTitle",
    describe: "get a praticular note by title",    
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },    
    handler(args)
    {
        notes.getNotesByTitle(args.title);
    }
})

yargs.parse()
