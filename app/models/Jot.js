import { generateId } from "../utils/GenerateId.js"
import { jotService } from "../services/JotService.js"

export class Note {
    constructor(data) {
        this.id = generateId()
        this.amount = data.amount
        this.name = data.name
        this.updated = data.updated ? new Date(data.updated) : new Date()
        this.body = data.body
        this.report = data.report ? new Date(data.report) : new Date()
        this.color = data.color
    }

    get NoteNumber() {
        return `
        ${this.amount}`
    }

    get NoteTemplate() {
        return `
       
        <p onclick= "app.JotController.setActiveNote('${this.id}')" type="button">${this.name}</p>`
    }

    get ActiveNote() {
        return `
        <div class="col-7 bg-secondary color justify-content-center" style="border-color: ${this.color}; m-3">

        <section class="row justify-content-between">
          <p class=" fs-2 col-8">${this.name}</p>
          <p>created at: ${this.report.toLocaleString()}</p>
          <p>Updated at: ${this.updated.toLocaleString()}</p>
          <button onclick= "app.JotController.saveActiveNote()" class=" m-1 btn btn-success col-1">Save</button>
          <button type="submit" onclick="app.JotController.removeNote('${this.id}')" class=" m-1 col-1 fs-3 mdi mdi-delete bg-warning"></button>
        </section>

        <div class="mb-3">
          <label for="" class="form-label"></label>
          <textarea id="noteBody" class="form-control" name="notes" id="" rows="3">${this.body}</textarea>
        </div>
      </div>`
    }





}






