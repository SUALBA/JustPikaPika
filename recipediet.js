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

    const dietColors = {
      'vegetarian': '#6CBA59',
      'vegan': '#FF9B9D',
      'gluten-free': '#FACD55',
      'keto': '#8A55F7',
      'pescatarian': '#55DFF7',
      'paleolithic': '#FFA500',
      'primal': '#FF726F',
      'whole-30': '#8AF755',
    };

    btnVegetarian.addEventListener('click', function() {
      fetchRecipesByDiet('vegetarian', dietColors['vegetarian']);
    });

    btnVegan.addEventListener('click', function() {
      fetchRecipesByDiet('vegan', dietColors['vegan']);
    });

    btnGlutenFree.addEventListener('click', function() {
      fetchRecipesByDiet('gluten free', dietColors['gluten-free']);
    });

    btnKeto.addEventListener('click', function() {
      fetchRecipesByDiet('keto', dietColors['keto']);
    });

    btnPescatarian.addEventListener('click', function() {
      fetchRecipesByDiet('pescatarian', dietColors['pescatarian']);
    });

    btnPaleolithic.addEventListener('click', function() {
      fetchRecipesByDiet('paleolithic', dietColors['paleolithic']);
    });

    btnPrimal.addEventListener('click', function() {
      fetchRecipesByDiet('primal', dietColors['primal']);
    });

    btnWhole30.addEventListener('click', function() {
      fetchRecipesByDiet('whole 30', dietColors['whole-30']);
    });

    function fetchRecipesByDiet(dietType, backgroundColor) {
      const apiKey = 'aac38ef2db854c74b8b9f59ac48acbf6';
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=6&diet=${dietType}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const recipeIds = data.results.map(recipe => recipe.id);
          const promises = recipeIds.map(id => getRecipeInformation(id, backgroundColor));
          return Promise.all(promises);
        })
        .then(recipes => {
          recipeList.innerHTML = '';
          recipes.forEach(recipe => {
            // Crear el elemento card para mostrar los detalles de cada receta
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.backgroundColor = backgroundColor; // Aplicar el color de fondo del botón

            const image = document.createElement('img');
            image.src = recipe.image;
            card.appendChild(image);

            const title = document.createElement('h2');
            title.textContent = recipe.title;
            card.appendChild(title);

            const readyInMinutes = document.createElement('p');
            readyInMinutes.textContent = 'Ready in ' + (recipe.readyInMinutes || 'N/A') + ' minutes';
            card.appendChild(readyInMinutes);

            recipeList.appendChild(card);
          });
        })
        .catch(error => {
          console.log('Error al obtener los datos de la API:', error);
        });
    }

    function getRecipeInformation(recipeId, backgroundColor) {
      const apiKey = 'aac38ef2db854c74b8b9f59ac48acbf6';
      const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`;

      return fetch(url)
        .then(response => response.json())
        .then(data => {
          return {
            id: data.id,
            title: data.title,
            image: data.image,
            readyInMinutes: data.readyInMinutes,
            backgroundColor: backgroundColor, // Agregar el color de fondo del botón a cada receta
          };
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