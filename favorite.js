document.addEventListener('DOMContentLoaded', function() {
  const favoritesContainer = document.getElementById('favorites-container');
  const deleteAllButton = document.getElementById('delete-all-button');

  // Obtener las recetas favoritas desde el almacenamiento local
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  //Si hay recetas guardadas, las convierte desde su representación JSON a un array utilizando(si no ,sera array vacio)
  const parsedFavorites = favoriteRecipes ? JSON.parse(favoriteRecipes) : [];

  // Crear las tarjetas interactivas para cada receta favorita
  // recorremos el array de favoritas y crea una tarjeta para la receta
  parsedFavorites.forEach(recipe => {
    const card = createCard(recipe);
    favoritesContainer.appendChild(card);   //agregamos cada tarjeta creada al contenedor
  });

  // Asignar el controlador de eventos al botón de eliminar todas las recetas favoritas
  deleteAllButton.addEventListener('click', removeFavoritesConfirmation);

//esta funcion recibe una recceta como argumento y crea una tarjeta para esa receta
  function createCard(recipe) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = recipe.id; // Asignar el ID de la receta utilizando el atributo "dataset"

    // Asignar los detalles de la receta al atributo "title"
    card.title = `Health Score: ${recipe.healthScore}\nDiets: ${recipe.diets.join(', ')}`;
//cada tarjeta contiene imagen titulo y boton eliminar
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="card-content">
        <h3>${recipe.title}</h3>
        <p>${recipe.healthScore}</p>
        <button class="remove-button">delete</button>
        <button class="remove-definitely-button" style="display: none;">delete finally</button>
      </div>
    `;
  


    // Agregar controladores de eventos a los botones
    const removeButton = card.querySelector('.remove-button');
    const removeDefinitelyButton = card.querySelector('.remove-definitely-button');
    removeButton.addEventListener('click', function(event) {
      removeFavoriteConfirmation(event, recipe.id);
    });
    removeDefinitelyButton.addEventListener('click', function(event) {
      removeFavoriteDefinitely(event, recipe.id);
    });

    return card;
  }

    /*  pendiente de aplicar adaptada en una futura pagina, aqui la anulo porque da una imagen desordenada
    makeInteractive(card);
  // Función para hacer las tarjetas interactivas y arrastrables  (aun esta pendiente de adaptar)
  function makeInteractive(element) {
    let isDragging = false;
    let initialX, initialY;
    let offsetX = 0, offsetY = 0;

    element.addEventListener('mousedown', startDrag);
    element.addEventListener('mousemove', drag);
    element.addEventListener('mouseup', endDrag);

    element.addEventListener('touchstart', startDrag);
    element.addEventListener('touchmove', drag);
    element.addEventListener('touchend', endDrag);

    function startDrag(e) {
      if (e.type === 'mousedown') {
        initialX = e.clientX;
        initialY = e.clientY;
      } else if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
      }

      isDragging = true;
      offsetX = element.offsetLeft;
      offsetY = element.offsetTop;
    }

    function drag(e) {
      if (!isDragging) return;

      e.preventDefault();

      let currentX, currentY;
      if (e.type === 'mousemove') {
        currentX = e.clientX;
        currentY = e.clientY;
      } else if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
      }

      const deltaX = currentX - initialX;
      const deltaY = currentY - initialY;

      element.style.left = `${offsetX + deltaX}px`;
      element.style.top = `${offsetY + deltaY}px`;
    }

    function endDrag() {
      isDragging = false;
    }
  }
*/
  // Función para mostrar una confirmación antes de eliminar la receta favorita
  function removeFavoriteConfirmation(event, recipeId) {
    event.stopPropagation(); // Detener la propagación del evento para evitar que se active el evento de eliminar la receta completa

    const confirmDelete = confirm('Are you sure to want to delete this recipe?');

    if (confirmDelete) {
      const cardContent = event.target.closest('.card-content');
      const removeButton = cardContent.querySelector('.remove-button');
      const removeDefinitelyButton = cardContent.querySelector('.remove-definitely-button');

      removeButton.style.display = 'none';
      removeDefinitelyButton.style.display = 'block';
    }
  }
   // Función para mostrar una confirmación antes de eliminar todas las recetas favoritas
  function removeFavoritesConfirmation() {
    const confirmDelete = confirm('Are you sure to want to delete this recipes?');

    if (confirmDelete) {
      favoritesContainer.innerHTML = ''; // Eliminar todas las tarjetas de recetas favoritas
      localStorage.removeItem('favoriteRecipes'); // Eliminar las recetas del almacenamiento local
    }
  }

  // Función para eliminar definitivamente una receta favorita
  function removeFavoriteDefinitely(event, recipeId) {
    event.stopPropagation(); // Detener la propagación del evento para evitar que se active el evento de la tarjeta completa

    // Eliminar la receta del almacenamiento local
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const parsedFavorites = favoriteRecipes ? JSON.parse(favoriteRecipes) : [];
    const updatedFavorites = parsedFavorites.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));

    // Eliminar la tarjeta de la receta de la vista
    const card = event.target.closest('.card');
    card.remove();
  }
});

