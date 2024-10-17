let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes(notesToRender) {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    notesToRender.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note', note.color);
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="tags">Tags: ${note.tags.join(', ')}</div>
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

document.getElementById('noteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var id = document.getElementById('noteId').value;
    var title = document.getElementById('noteTitle').value;
   var content = document.getElementById('noteContent').value;
    var tags = document.getElementById('noteTags').value.split(',').map(tag => tag.trim());
    var  color = document.getElementById('noteColor').value;

    var note = { title, content, tags, color };

    if (id) {
        notes[parseInt(id)] = note;
    } else {
        notes.push(note); 
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    document.getElementById('noteForm').reset();
    document.getElementById('noteId').value = '';
    renderNotes(notes);
});


function editNote(index) {
    const note = notes[index];
    document.getElementById('noteId').value = index;
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    document.getElementById('noteTags').value = note.tags.join(', ');
    document.getElementById('noteColor').value = note.color;
}


function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes(notes);
}


document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query)
    );
    renderNotes(filteredNotes);
});


renderNotes(notes);