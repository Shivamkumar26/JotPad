let addNoteContainer = document.getElementById("addNoteContainer");

// Show all the notes on HomePage
function existingNotes() {
    addNoteContainer.style.display = "none"; 
    let allExistingNotes;
    let notes = localStorage.getItem("notes");

    if (notes === null) {
        allExistingNotes = [];
    } else {
        allExistingNotes = JSON.parse(notes);
    }

    let notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = ""; 
    allExistingNotes.forEach((note, index) => {
        let latestNote = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="card-text">${note.desc}</p>
                    <button class="btn btn-warning card_btns" onClick="editNote(${index})"><i class="fas fa-solid fa-pen edit_btn"> </i></button>
                    <button class="btn btn-warning card_btns" onClick="archiveNote(${index})"><i class="fas fa-solid fa-folder-plus"></i></button>
                    <button class="btn btn-warning card_btns" onClick="deleteNote(${index})"><i class="fas fa-solid fa-trash delete_btn"></i></button>
                </div>
            </div>
            `;
        notesContainer.innerHTML = notesContainer.innerHTML + latestNote;
    });
}
existingNotes();

// Making "+ Add" button on navbar working
let navAddNote = document.getElementById("navAddNote");
navAddNote.addEventListener('click', ()=> {
    existingNotes();
    let title = document.getElementById("title");
    let desc = document.getElementById("desc");
    title.value = "";
    desc.value = "";
    addNoteContainer.style.display = "block";
})

// Saving a note in local Storage  
let addNote = document.getElementById("addNote");
addNote.addEventListener('click', ()=> {
    let allExistingNotes;
    let notes = localStorage.getItem("notes");
    if (notes === null) { 
        allExistingNotes = [];
        console.log("No Notes are present");
    } else {
        allExistingNotes = JSON.parse(notes); 
    }

    let title = document.getElementById("title");
    let desc = document.getElementById("desc");
    let newNoteObj = {
        title : title.value,
        desc : desc.value
    }

    if(existingNotes.innerText === "Update") {
        let editCard = document.querySelector('.card');
        let editIndex = editCard.getAttribute("editIndex");
        allExistingNotes[editIndex] = newNoteObj;
    }
    else {
        allExistingNotes.push(newNoteObj);
    }
    localStorage.setItem("notes",JSON.stringify(allExistingNotes))
    title.value = "";
    desc.value = "";    
    existingNotes();
})

let cancelBtn = document.getElementById("cancelNote");
cancelBtn.addEventListener('click', ()=> {
    addNoteContainer.style.display = "none";
})

// Making our delete button work
function deleteNote(noteIndex) {
    let allExistingNotes = JSON.parse(localStorage.getItem("notes"));
    let deletedNotes = JSON.parse(localStorage.getItem("deletedNotes"));
    
    if (deletedNotes === null) {
        deletedNotes = [];
    }
    let deletedNote = allExistingNotes.splice(noteIndex, 1)[0];
    deletedNotes.push(deletedNote);

    localStorage.setItem("notes", JSON.stringify(allExistingNotes));
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
    existingNotes();
}
//permanent delete
function finalDelete(noteIndex) {
    let deletedNotes = JSON.parse(localStorage.getItem("deletedNotes"));
    deletedNotes.splice(noteIndex, 1)[0];

    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
    existingNotes();
}

// Making Delete Note on the Navbar Working 
function deletedNotes() {
    addNoteContainer.style.display = "none";
    let allDeletedNotes;
    let deletedNotes = localStorage.getItem("deletedNotes"); //Creating objects 

    if (deletedNotes === null) {
        allDeletedNotes = [];
        console.log("No deleted Notes are present");
    } else {
        allDeletedNotes = JSON.parse(deletedNotes);
    }

    //showing items on screen 
    let notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";
    allDeletedNotes.forEach((note, index) => {
        let latestNote = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="card-text">${note.desc}</p>
                    <button class="btn btn-warning card_btns" onClick="undoDelete(${index})"><i class="fas fa-solid fa-plus undoDelete"></i></button>
                    <button class="btn btn-warning card_btns" onClick="finalDelete(${index})"><i class="fas fa-solid fa-minus"></i></button>
                </div>
            </div>
        `;
        notesContainer.innerHTML = notesContainer.innerHTML + latestNote;
    });
}
let navDeletedNotes = document.getElementById("navDeletedNotes");
navDeletedNotes.addEventListener('click', ()=> {
    deletedNotes();
})

// Making undoDelete button work
function undoDelete(noteIndex) {
    let deletedNotes = JSON.parse(localStorage.getItem("deletedNotes"));
    let allExistingNotes = JSON.parse(localStorage.getItem("notes"));

    if (allExistingNotes === null) {
        allExistingNotes = [];
    }
    let allExistingNote = deletedNotes.splice(noteIndex, 1)[0];
    allExistingNotes.push(allExistingNote);

    localStorage.setItem("notes", JSON.stringify(allExistingNotes));
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
    existingNotes();
}

// Making edit Note button work
function editNote(noteIndex) {
    let allExistingNotes = JSON.parse(localStorage.getItem("notes"));
    addNoteContainer.style.display = 'block';
    existingNotes.innerText = "Update"

    let title = document.getElementById('title');
    let desc = document.getElementById('desc');

    title.value = allExistingNotes[noteIndex].title;
    desc.value = allExistingNotes[noteIndex].desc;

    let editCard = document.querySelector('.card');
    editCard.setAttribute("editIndex", `${noteIndex}`);
}

// Search/Sort Functionality
let search = document.getElementById("search");
search.addEventListener('input', ()=> {
    let inputSearch = search.value.toLowerCase();
    let allCardSearch = document.getElementsByClassName("card");

    Array.from(allCardSearch).forEach((ele) => {
        let cardSearch = ele.getElementsByTagName('p')[0].innerText;

        if(cardSearch.toLowerCase().includes(inputSearch)) {
            ele.style.display = 'block';
        } else {
            ele.style.display = 'none';
        }
    })
})

// Button Archive Note on Navbar
function archivedNote() {
    addNoteContainer.style.display = "none";
    let allArchivedNote;
    let archivedNotes = localStorage.getItem("archivedNotes");

    if (archivedNotes === null) {
        allArchivedNote = [];
    } else {
        allArchivedNote = JSON.parse(archivedNotes); 
    }

    let notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";
    allArchivedNote.forEach((note, index) => {
        let latestNote = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="card-text">${note.desc}</p>
                    <button class="btn btn-warning card_btns" onClick="undoArchive(${index})"><i class="fas fa-solid fa-download undoArchive"></i></button>
                </div>
            </div>
        `;
        notesContainer.innerHTML = notesContainer.innerHTML + latestNote;
    });
}
let navArchivedNotes = document.getElementById("navArchivedNotes");
navArchivedNotes.addEventListener('click', ()=> {
    archivedNote(); 
})

// Archive Note inside a note
function archiveNote(noteIndex) {
    let allExistingNotes = JSON.parse(localStorage.getItem("notes"));
    let archivedNotes = JSON.parse(localStorage.getItem("archivedNotes"));
    
    if (archivedNotes === null) {
        archivedNotes = [];
    }
    let archivedNote = allExistingNotes.splice(noteIndex, 1)[0];
    archivedNotes.push(archivedNote);

    localStorage.setItem("notes", JSON.stringify(allExistingNotes));
    localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
    existingNotes();
}

// Unarchive a Note
function undoArchive(noteIndex) {
    let archivedNotes = JSON.parse(localStorage.getItem("archivedNotes"));
    let allExistingNotes = JSON.parse(localStorage.getItem("notes"));

    if (allExistingNotes === null) {
        allExistingNotes = [];
    }
    let allExistingNote = archivedNotes.splice(noteIndex, 1)[0];
    allExistingNotes.push(allExistingNote);

    localStorage.setItem("notes", JSON.stringify(allExistingNotes));
    localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
    existingNotes();
}