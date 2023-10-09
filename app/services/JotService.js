import { AppState } from "../AppState.js"
import { Note } from "../models/Jot.js";
import { saveState } from "../utils/Store.js";




function _saveNotes() {
    saveState('notes', AppState.notes)
}



class JotService {


    createNote(noteData) {
        const newNote = new Note(noteData)
        console.log('new note', newNote);
        AppState.notes.push(newNote)
        AppState.notes = AppState.notes
        AppState.emit('notes')
        _saveNotes()
    }


    setActiveNote(noteId) {
        const activeNote = AppState.notes.find(noteFile => noteFile.id == noteId)
        console.log(activeNote)
        AppState.activeNote = activeNote
    }



    saveActiveNote(noteContents) {
        let activeNote = AppState.activeNote
        // @ts-ignore
        activeNote.body = noteContents
        activeNote.updated = new Date()
        console.log(activeNote.updated)
        _saveNotes()
        AppState.emit('activeNote')
    }


    removeNote(noteId) {
        const notes = AppState.notes
        const noteIndex = notes.findIndex(note => note.id == noteId)

        if (noteIndex == -1) {
            throw new Error(`Could not find note ${noteId}`)
        }
        notes.splice(noteIndex, 1)
        _saveNotes()

        AppState.emit('notes')
    }
}

export const jotService = new JotService