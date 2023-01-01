// Add an event listener to the search button
document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
  // Prevent the form from being submitted and refreshing the page
  event.preventDefault();

  // Get the value of the repository search input
  const repoSearch = document.querySelector('#repo-search').value;
  // Get the selected language filter
  const languageFilter = document.querySelector('#language-filter').value;

  // Show the loading spinner
  document.querySelector('#loading-spinner').style.display = 'flex';

  // Use the GitHub API to search for repositories
  fetch(`https://api.github.com/search/repositories?q=${repoSearch}+language:${languageFilter}`)
    .then(response => response.json())
    .then(data => {
      // Hide the loading spinner
      document.querySelector('#loading-spinner').style.display = 'none';

      // Clear the card container
      document.querySelector('#card-container').innerHTML = '';

      // Add a card for each repository
      data.items.forEach((repo, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title"><a href="${repo.html_url}">${repo.full_name}</a></h5>
            <p class="card-text">${repo.description}</p>
            <p class="card-text"><strong>Language:</strong> ${repo.language}</p>
            <p class="card-text"><strong>Stars:</strong> ${repo.stargazers_count}</p>
            <p class="card-text"><strong>Forks:</strong> ${repo.forks_count}</p>
          </div>
        `;
        document.querySelector('#card-container').appendChild(card);
      });
    });
  });
