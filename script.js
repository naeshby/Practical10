let recipes = [];

// Fetch recipes from JSON
fetch('recipes.json')
  .then(response => response.json())
  .then(data => {
    recipes = data;
    displayRecipes(recipes);
  });

// Display recipes in cards
function displayRecipes(recipeList){
  const container = document.getElementById('recipe-cards');
  container.innerHTML = '';
  recipeList.forEach((recipe, index) => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100" data-index="${index}" data-bs-toggle="modal" data-bs-target="#recipeModal">
          <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
          <div class="card-body">
            <h5 class="card-title">${recipe.name}</h5>
            <p class="card-text">${recipe.category}</p>
          </div>
        </div>
      </div>
    `;
  });
  addCardClickEvents();
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    const filtered = category === 'All' ? recipes : recipes.filter(r => r.category === category);
    displayRecipes(filtered);
  });
});

// Search recipes
document.getElementById('searchInput').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = recipes.filter(r => r.name.toLowerCase().includes(searchTerm));
  displayRecipes(filtered);
});

// Recipe modal details
function addCardClickEvents(){
  document.querySelectorAll('#recipe-cards .card').forEach(card => {
    card.addEventListener('click', () => {
      const index = card.getAttribute('data-index');
      const recipe = recipes[index];
      document.getElementById('recipeModalLabel').innerText = recipe.name;
      document.getElementById('recipeImage').src = recipe.image;
      document.getElementById('recipeIngredients').innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join('');
      document.getElementById('recipeInstructions').innerText = recipe.instructions;
    });
  });
}
