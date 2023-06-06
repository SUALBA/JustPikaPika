document.addEventListener("DOMContentLoaded", function() {
    let recipeList = document.getElementById("recipe-list");
    let searchInput = document.getElementById("search-input");
    let searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", searchRecipes);

    function searchRecipes() {
        let query = searchInput.value.trim();
        fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=aac38ef2db854c74b8b9f59ac48acbf6&number=6&query=" + query)
            .then(response => response.json())
            .then(data => {
                recipeList.innerHTML = ""; // Limpiar la lista de recetas existente

                data.results.forEach(recipe => {
                    let recipeDiv = document.createElement("div");
                    recipeDiv.classList.add("recipe");

                    let title = document.createElement("h2");
                    title.textContent = recipe.title;

                    let image = document.createElement("img");
                    image.src = recipe.image;

                    let readyInMinutes = document.createElement("p");
                    readyInMinutes.textContent = "Ready in " + recipe.readyInMinutes + " minutes";

                    recipeDiv.appendChild(title);
                    recipeDiv.appendChild(image);
                    recipeDiv.appendChild(readyInMinutes);

                    recipeList.appendChild(recipeDiv);
                });
            })
            .catch(error => {
                console.log("Error al obtener los datos de la API:", error);
            });
    }
});
