document.addEventListener('DOMContentLoaded',loadNotes);

function loadNotes() {
    var listNotes = document.getElementById("listNotes");
    listNotes.innerHTML = "";

    var notesExist = JSON.parse(localStorage.getItem("notes")) || [];

    notesExist.forEach(function (note, index) {
        var li = document.createElement("li");
        li.classList.add(assignColorImportance(note.importance));
        li.innerHTML = `
            <span class="category">${note.category}</span>
            <br>
            <span>${note.content}</span>
            <button onclick="deleteNote(${index})" class="button-delete">Borrar</button>
        `;
        listNotes.appendChild(li);
    });
}

function createNote() {

    var noteInput = document.getElementById("noteInput");
    var category = document.getElementById("categoryInput");
    var importance = document.getElementById("importanceInput");

    var contentNote = noteInput.value.trim();


    if (contentNote !== "") {

        var note= {
            category : category.value,
            importance : importance.value,
            content : contentNote
        }
        saveNote(note);
       
        noteInput.value = "";

       
        loadNotes();
    } else{
        alert ("Por favor, escribe algo en la nota");
        return;

    }
}

function assignColorImportance(importance)
{
    switch (importance)
    {
        case 'high':
            return 'high';
        case 'medium':
            return 'medium';
        case 'low':
            return 'low';
        default:
            return '';
    }
}


function saveNote(note) {
   
    var notesExist = JSON.parse(localStorage.getItem("notes")) || [];

    notesExist.push(note);

    localStorage.setItem("notes", JSON.stringify(notesExist));
}
function deleteNote(index) {
    
   
    var confirmation = confirm("¿DESEA BORRAR LA NOTA?")

    if (confirmation)
    {
        var notesExist = JSON.parse(localStorage.getItem("notes")) || [];
        notesExist.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesExist));

    }

    loadNotes();
}


