function updateNews(id) {

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

    fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${id}`, {
        method: 'PUT',
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

async function fetchNewsById(id) {
    const response = await fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${id}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const newsItem = await response.json();

    document.getElementById('title').value = newsItem.title;
    document.getElementById('description').value = newsItem.description;
    document.getElementById('category').value = newsItem.category;
    document.getElementById('editorFirstName').value = newsItem.editorFirstName;
    document.getElementById('editorLastName').value = newsItem.editorLastName;

}


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (!id) {
    window.location.href = '../index.html';
}

fetchNewsById(id);

const saveButton = document.querySelector('.save');
const cancelButton = document.querySelector('.cancel');
saveButton.addEventListener('click', () => updateNews(id));
cancelButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});


