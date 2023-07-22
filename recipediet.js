document.addEventListener('DOMContentLoaded', function() {
    const recipeList = document.getElementById('recipe-list');
    const btnVegetarian = document.getElementById('btnVegetarian');
    const btnVegan = document.getElementById('btnVegan');
    const btnGlutenFree = document.getElementById('btnGlutenFree');
    const btnKeto = document.getElementById('btnKeto');
    const btnPescatarian = document.getElementById('btnPescatarian');
    const btnPaleolithic = document.getElementById('btnPaleolithic');
    const btnPrimal = document.getElementById('btnPrimal');
    const btnWhole30 = document.getElementById('btnWhole30');

    btnVegetarian.addEventListener('click', function() {
        fetchRecipesByDiet('vegetarian');
    });

    btnVegan.addEventListener('click', function() {
        fetchRecipesByDiet('vegan');
    });

    btnGlutenFree.addEventListener('click', function() {
        fetchRecipesByDiet('gluten free');
    });

    btnKeto.addEventListener('click', function() {
        fetchRecipesByDiet('keto');
    });

    btnPescatarian.addEventListener('click', function() {
        fetchRecipesByDiet('pescatarian');
    });

    btnPaleolithic.addEventListener('click', function() {
        fetchRecipesByDiet('paleolithic');
    });

    btnPrimal.addEventListener('click', function() {
        fetchRecipesByDiet('primal');
    });

    btnWhole30.addEventListener('click', function() {
        fetchRecipesByDiet('whole 30');
    });

    function fetchRecipesByDiet(dietType) {
        const apiKey = 'aac38ef2db854c74b8b9f59ac48acbf6'; 
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&diet=${dietType}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const recipes = data.results;
                const randomRecipes = shuffleArray(recipes).slice(0, 12);

                recipeList.innerHTML = '';

                randomRecipes.forEach(recipe => {
                    // Crear el elemento card para mostrar los detalles de cada receta
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const image = document.createElement('img');
                    image.src = recipe.image;
                    card.appendChild(image);

                    const title = document.createElement('h2');
                    title.textContent = recipe.title;
                    card.appendChild(title);

                    const readyInMinutes = document.createElement('p');
                    readyInMinutes.textContent = 'Ready in ' + recipe.readyInMinutes + ' minutes';
                    card.appendChild(readyInMinutes);
                                        
                    recipeList.appendChild(card);
                });
            })
            .catch(error => {
                console.log('Error al obtener los datos de la API:', error);
            });
    }

    // Función para mezclar un array de manera aleatoria
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
