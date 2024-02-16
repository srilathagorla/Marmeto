document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const resultsContainer = document.querySelector('.results');

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
          <img src="${result.image}" alt="${result.title}">
          <div class="title">${result.title}</div>
        `;
            resultsContainer.appendChild(resultElement);
        });
    }

    searchInput.addEventListener('input', function(event) {
        const searchTerm = event.target.value.trim().toLowerCase();
        if (searchTerm.length === 0) {
            resultsContainer.innerHTML = '';
            return;
        }

        fetch('https://products-api-2ttf.onrender.com/api/products')
            .then(response => response.json())
            .then(data => {
                const filteredResults = data.filter(item => item.title.toLowerCase().includes(searchTerm));
                displayResults(filteredResults);
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});