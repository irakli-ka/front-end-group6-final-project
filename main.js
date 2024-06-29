async function fetchNews() {
    const response = await fetch('https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news');
    const newsJson = await response.json();

    const tableBody = document.getElementById('newsTableBody');
    tableBody.innerHTML = '';

    newsJson.forEach(news => {
        const row = document.createElement('tr');
        const dateCreated = new Date(news.dateCreated).toLocaleString('en-US', { month: 'long', day: 'numeric' });
        const dateUpdated = new Date(news.dateUpdated).toLocaleString('en-US', { month: 'long', day: 'numeric' });

        row.innerHTML = `
                    <td>${news.id}</td>
                    <td>${news.title}</td>
                    <td>${news.category}</td>
                    <td>${news.likes}</td>
                    <td>${dateUpdated}</td>
                    <td>${dateCreated}</td>
                    <td>
                        <button class="delete">Delete</button>
                        <button class="update">Update</button>
                    </td>
                `;
        tableBody.appendChild(row);
    });

}

function deleteNews(id) {
    fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        console.log(response.status, response.statusText);
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
}

fetchNews();

const createButton = document.querySelector('.create');
createButton.addEventListener('click', function() {
    window.location.href = 'create-page/create.html';
});

const tableBody = document.getElementById('newsTableBody');
tableBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        const row = event.target.parentElement.parentElement;
        const id = row.firstElementChild.textContent;

        row.classList.add('slideRight');
        setTimeout(() => {
            deleteNews(id);
            row.remove();
        }, 850);

    }
    if (event.target.classList.contains('update')) {
        const row = event.target.parentElement.parentElement;
        const id = row.firstElementChild.textContent;
        window.location.href = `update-page/update.html?id=${id}`;
    }
});



