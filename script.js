const notesEl = document.querySelector(".notes")
const addBtn = document.querySelector(".add-btn")

addBtn.addEventListener("click", addNote)

let notes = JSON.parse(localStorage.getItem("notes")) || []

function loadNotes() {
  notes.forEach(note => {
    createNoteEl(note.id, note.content)
  })
}

function createNoteEl(noteId, content) {
  const noteEl = document.createElement("p")
  noteEl.classList.add("note")
  noteEl.setAttribute("data-note-id", noteId)

  noteEl.innerHTML += `
    <textarea oninput="editNote('${noteId}')" placeholder="Enter a note...">${content || ""}</textarea>
    <button class="delete" onclick="deleteNote('${noteId}')"><i class="bi bi-trash"></i></button>
  `

  notesEl.appendChild(noteEl)

  const textarea = document.querySelector(`[data-note-id="${noteId}"] textarea`)
  if (content) {
    adjustTextareaHeight(textarea)
  } else {
    textarea.focus()
  }
}

function addNote() {
  const noteId = Date.now().toString(36) + Math.random().toString(36).substr(2);

  createNoteEl(noteId)

  notes.push({ id: noteId, content: "" })
}

function deleteNote(noteId) {
  notes = notes.filter(note => note.id !== noteId)
  saveNotes()

  const note = document.querySelector(`[data-note-id="${noteId}"]`)
  note.remove()
}

function editNote(noteId) {
  const noteToEdit = notes.find(note => note.id === noteId)

  const textarea = document.querySelector(`[data-note-id="${noteId}"] textarea`)
  const content = textarea.value
  adjustTextareaHeight(textarea)

  noteToEdit.content = content

  saveNotes()
}

function saveNotes() {
  const notesToSave = notes.filter(note => note.content !== "")
  localStorage.setItem("notes", JSON.stringify(notesToSave))
}

function adjustTextareaHeight (textarea) {
  textarea.style.height = 'auto'
  textarea.style.height = (textarea.scrollHeight) + 'px'
}





window.addEventListener("load", (event) => {
  if (notes.length > 0) loadNotes()
  else addNote()
});
