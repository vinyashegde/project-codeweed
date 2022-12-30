document.querySelector('form').addEventListener('submit', async event => {
  event.preventDefault();
  document.getElementById('github-repositories').innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>';
  const dataResponse = await fetch(`https://api.github.com/search/repositories?q=${document.getElementById('search').value}`, {headers: {'Authorization': 'Bearer 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'}});
  const data = await dataResponse.json();
  let html = '';
  for (const repository of data.items) {
    const contributorsResponse = await fetch(repository.contributors_url, {headers: {'Authorization': 'Bearer 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'}});
    const contributors = await contributorsResponse.json();
    html += `
      <div class="col-md-4">
        <div class="card">
          <a href="${repository.html_url}"><h3>${repository.name}</h3></a>
          <p>Username: ${repository.owner.login}</p>
          <p><i class="fas fa-star"></i> ${repository.stargazers_count}</p>
          <p><i class="fas fa-code-branch"></i> ${repository.forks_count}</p>
          <p><i class="fas fa-user-friends"></i> ${contributors.length}</p>
        </div>
      </div>
    `;
  }
  document.getElementById('github-repositories').innerHTML = `<div class="row">${html}</div>`;
});
