document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');
// URLSearchParams: lo utilizamos para obtener el parámetro "id" de la URL. 
//La variable urlParams crea un objeto que representa los parámetros de la URL actual. 
//Luego, se llama a urlParams.get('id') para obtener el valor del parámetro "id" si está presente en la URL
  if (recipeId) {
    fetchRecipeDetails(recipeId);
  }
//si encuentro la id en la URL (estamos en la pagina con la receta ID) se llama a la funcion pasando"id" de argumentoy nos devuelve los detalles de la receta de la API
  function fetchRecipeDetails(id) {
    const recipeDetailsEndpoint = `https://api.spoonacular.com/recipes/${id}/information?apiKey=aac38ef2db854c74b8b9f59ac48acbf6&number=6&query=`;
//obtener detalles de la receta.  traces del enpoind se realiza una solicitud fetch a la API, aasi se obtiene la respuesta y la convierte a formato JSON.
    fetch(recipeDetailsEndpoint)
      .then(response => response.json())
      .then(recipe => {
        displayRecipeDetails(recipe);
      })
      .catch(error => {
        console.log("Error al obtener los detalles de la receta:", error);
      });
  }
//una vez tengo los datos se llama a esta funcion q recibe un objeto de receta y muestra los detalles en la pagina (ingresientes e instrucciones)
  function displayRecipeDetails(recipe) {
    const recipeTitle = document.getElementById('recipe-title');
    const ingredientList = document.getElementById('ingredient-list');
    const instructionsList = document.getElementById('instructions-list');

    recipeTitle.textContent = recipe.title;
//luego  recorre los datos recibidos y crea elementos de lista (<li>) para cada ingrediente e instrucción, que se agregan a las listas correspondientes.
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

    const favoriteButton = document.createElement('button');
    favoriteButton.innerHTML = '<img src="images/corePink.png" class="heart-icon">';
    favoriteButton.addEventListener('click', function() {
      addToFavorites(recipe);
    });

    document.body.appendChild(favoriteButton);
  }
//La función addToFavorites se encarga de guardar la receta actual en la lista de recetas favoritas.
  function addToFavorites(recipe) {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const parsedFavorites = favoriteRecipes ? JSON.parse(favoriteRecipes) : [];

    parsedFavorites.push(recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(parsedFavorites));
//Utilizo localStorage para almacenar los datos localmente en el navegador. 
//Los detalles de la receta se agregan a un array de recetas favoritas que se guarda en el localStorage. 
//Después de agregar la receta a la lista de favoritos, la página se redirige a 'favorite.html'.
    window.location.href = 'favorite.html';
  }
});
