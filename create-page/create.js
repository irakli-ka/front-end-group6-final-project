function postNews() {

    var form = document.getElementById('newsForm');

    var title = form.elements['title'].value;
    var description = form.elements['description'].value;
    var category = form.elements['category'].value;
    var editorFirstName = form.elements['editorFirstName'].value;
    var editorLastName = form.elements['editorLastName'].value;

    if (!title || !description || !category || !editorFirstName || !editorLastName) {
        alert('Please fill all fields');
        return;
    }

    fetch('https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            category,
            editorFirstName,
            editorLastName
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const saveButton = document.querySelector('.save');
const cancelButton = document.querySelector('.cancel');
saveButton.addEventListener('click', postNews);
cancelButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});


