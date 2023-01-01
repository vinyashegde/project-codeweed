let isDarkMode = false;

document.addEventListener('DOMContentLoaded', () => {
  

  document.querySelector('#toggle-mode').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.querySelector('body').style.backgroundColor = '#222222';
      document.querySelector('body').style.color = '#ffffff';
      document.querySelector('#toggle-mode').classList.remove('btn-light');
      document.querySelector('#toggle-mode').classList.add('btn-dark');
    } else {
      document.querySelector('body').style.backgroundColor = '#ffffff';
      document.querySelector('body').style.color = '#222222';
      document.querySelector('#toggle-mode').classList.remove('btn-dark');
      document.querySelector('#toggle-mode').classList.add('btn-light');
    }
  });
});


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
