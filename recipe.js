document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
  
    if (recipeId) {
      fetchRecipeDetails(recipeId);
    }
  
    function fetchRecipeDetails(id) {
      const recipeDetailsEndpoint = `https://api.spoonacular.com/recipes/${id}/information?apiKey=aac38ef2db854c74b8b9f59ac48acbf6&number=6&query=`;
  
      fetch(recipeDetailsEndpoint)
        .then(response => response.json())
        .then(recipe => {
          displayRecipeDetails(recipe);
        })
        .catch(error => {
          console.log("Error al obtener los detalles de la receta:", error);
        });
    }
  
    function displayRecipeDetails(recipe) {
      const recipeTitle = document.getElementById('recipe-title');
      const ingredientList = document.getElementById('ingredient-list');
      const instructionsList = document.getElementById('instructions-list');
  
      recipeTitle.textContent = recipe.title;
  
      recipe.extendedIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = `${ingredient.original}`;
  
        ingredientList.appendChild(li);
      });
  
      recipe.analyzedInstructions[0].steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step.step;
  
        instructionsList.appendChild(li);
      });
    }
  });
  