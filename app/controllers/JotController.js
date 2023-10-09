import { AppState } from "../AppState.js"
import { Note } from "../models/Jot.js"
import { jotService } from "../services/JotService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"



function _drawActiveNotes() {
    const activeNote = AppState.activeNote
    let content = activeNote?.ActiveNote
    setHTML('activeNote', content)
}

function _drawNotes() {
    const notes = AppState.notes
    let content = ''
    notes.forEach(note => content += note.NoteTemplate)
    setHTML("amount", `Notes: ${notes.length}`)
    setHTML('notes', content)
}



export class JotController {
    constructor() {
        console.log('Jot Controller loaded')
        _drawNotes()
        AppState.on('notes', _drawNotes)
        AppState.on('activeNote', _drawActiveNotes)

    }


    createNote(event) {
        try {
            // debugger
            event.preventDefault()

            const form = event.target



            const noteData = getFormData(form)

            console.log('creating Note', noteData);

            jotService.createNote(noteData)

            form.reset()

        } catch (error) {
            Pop.error(error.message)
        }
    }

    setActiveNote(noteId) {
        jotService.setActiveNote(noteId)
    }

    saveActiveNote() {
        console.log('saving active note')
        let noteContents = document.getElementById('noteBody')
        jotService.saveActiveNote(noteContents)
        console.log(noteContents)
    }



    async removeNote(noteId) {

        const wantsToDelete = await Pop.confirm("Are you sure you want to delete this note?")

        if (!wantsToDelete) {
            return
        }

        console.log('delete note');
        jotService.removeNote(noteId)
        location.reload();
        _drawNotes()
    }
}