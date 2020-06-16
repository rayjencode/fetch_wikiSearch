const loading = document.querySelector('.loading');
const searchForm = document.querySelector('#searchForm');
const output = document.querySelector('.output');
const search = document.querySelector('#search');
const feedback = document.querySelector('.feedback');

const base = 'https://en.wikipedia.org/w/api.php';
const url = '?action=query&format=json&origin=*&list=search&srsearch=';

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let value = search.value;

    if (value === '') {
        showFeedback('Input search required');
    } else {
        ajaxWiki(value);
    }
});

function showFeedback(text) {
    feedback.classList.add('showItem');
    feedback.textContent = text;

    setTimeout(() => {
        feedback.classList.remove('showItem');
        feedback.textContent = '';
    }, 3000);
}

function ajaxWiki(search) {
    output.innerHTML = '';
    loading.classList.add('showItem');

    const wikiURL = `${base}${url}${search}`;

    fetch(wikiURL)
        .then((data) => data.json())
        .then((data) => displayData(data))
        .catch((e) => console.log(e));
}

function displayData(data) {
    loading.classList.remove('showItem');
    const { search: results } = data.query;

    let info = '';

    results.forEach((result) => {
        const pageID = 'http://en.wikipedia.org/?curid=';

        info += `

      <div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
      <div class="card card-body">
        <h1 class="card-title blueText">${result.title}</h1>
        <p>${result.snippet}</p>
        <a href="${pageID}${result.pageid}" target="_blank" class="my-2 text-capitalize">read
          more...</a>

      </div>

    </div>

      `;
    });

    output.innerHTML = info;
}
