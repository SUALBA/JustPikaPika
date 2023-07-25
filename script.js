document.addEventListener('DOMContentLoaded', function() {
  const ingredientesEspecificos = {
   'pasta': ['Spaghetti', 'Fettuccine', 'Lasagna', 'Ravioli', 'Tortellini', 'Macaroni', 'Cannelloni', 'Penne', 'Farfalle', 'Gnocchi'],
  'carne': ['Chicken', 'Beef', 'Pork', 'Turkey', 'Lamb', 'Veal', 'Cold Cuts', 'Ham', 'Sausage', 'Chorizo', 'Meat'],
  'pescado': ['Salmon', 'Trout', 'Tuna', 'Cod', 'Snapper', 'Sole', 'Hake', 'Dorado', 'Turbot', 'Sardine', 'Fish'],
  'verduras': ['Lettuce', 'Tomato', 'Cucumber', 'Carrot', 'Pepper', 'Asparagus', 'Spinach', 'Zucchini', 'Onion', 'Broccoli'],
  'frutas': ['Apple', 'Banana', 'Orange', 'Strawberry', 'Pineapple', 'Grape', 'Kiwi', 'Mango', 'Watermelon', 'Melon']
};


//logica para el cuadro de entrada a RecipeDiet
  const loginLink = document.getElementById('login-link');
  const loginModal = document.getElementById('login-modal');
  const passwordInput = document.getElementById('password-input');
  const loginBtn = document.getElementById('login-btn');

  loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'block';
  });

  loginBtn.addEventListener('click', function() {
    const password = passwordInput.value;
    // Para poder simular la validacion añado una contraseña  correcta q sera ("1234")
    if (password === '1234') {
      alert('Inicio de sesión exitoso');
      // Redireccionar a la página de "recipediet.html" o realizar cualquier acción deseada
      window.location.href = 'recipediet.html';
    } else {
      alert('"Invalid password, please try again.');
    }
  });
 //lógica si declina entrar
 // Obtenemos una referencia al botón "Go out"
const goOutBtn = document.getElementById("go-out-btn");
// Agregamos el evento de clic al botón "Go out"
goOutBtn.addEventListener("click", () => {
  // Obtenemos una referencia al cuadro de conversación (modal)
  const loginModal = document.getElementById("login-modal");
  // Ocultamos el cuadro de conversación (modal)
  loginModal.style.display = "none";
});



//logica para obtener las listas de alimentos
  const ingredientList = document.getElementById('ingredient-list');
  const listaAmpliada = document.getElementById('lista-ampliada');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const recipeList = document.getElementById('receta-list');

  ingredientList.addEventListener('click', function(event) {
    const ingredient = event.target;
    if (ingredient.classList.contains('ingredientes')) {
      const familia = ingredient.dataset.familia;
      mostrarIngredientesEspecificos(familia);
    }
  });

  listaAmpliada.addEventListener('click', function(event) {
    const ingredient = event.target;
    if (ingredient.tagName === 'LI') {
      ingredient.classList.toggle('checked');
      const ingredientName = ingredient.textContent;
      searchInput.value = ingredientName; // Establecer solo un ingrediente en el campo de búsqueda
    }
  });

  searchButton.addEventListener('click', function() {
    searchRecipes();
  });

  function mostrarIngredientesEspecificos(familia) {
    listaAmpliada.innerHTML = '';

    if (ingredientesEspecificos.hasOwnProperty(familia)) {
      const ingredientes = ingredientesEspecificos[familia];
      const ul = document.createElement('ul');
      ul.classList.add('lista-ampliada');

      ingredientes.forEach(ingrediente => {
        const li = document.createElement('li');
        li.textContent = ingrediente;
        ul.appendChild(li);
      });

      listaAmpliada.appendChild(ul);
    }
  }

  function searchRecipes() {
    const query = searchInput.value.trim();
    if (query !== '') {
      const normalizedQuery = normalizeString(query); // Normalizar la cadena de búsqueda

      fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=aac38ef2db854c74b8b9f59ac48acbf6&number=6&query=" + normalizedQuery)
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

            let readyInMinutes = document.createElement('p');
            readyInMinutes.textContent = 'Ready in ' + (recipe.readyInMinutes || 'N/A') + ' minutes';

                    
            recipeDiv.appendChild(title);
            recipeDiv.appendChild(image);
            recipeDiv.appendChild(readyInMinutes);

            // Agregar enlace para abrir la página de detalles
            recipeDiv.addEventListener('click', function() {
              window.location.href = `recipe.html?id=${recipe.id}`;
            });

            recipeList.appendChild(recipeDiv);
          });
        })
        .catch(error => {
          console.log("Error al obtener los datos de la API:", error);
        });
    }
  }

  function normalizeString(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Eliminar los caracteres acentuados
  }
});

//añado dia y hora en mi receta favorita para saber de q dia es la receta

const dateDisplay = document.getElementById('dateDisplay');


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// obtener la fecha actualizada
const currentDate = new Date();

// dia de la semana, dia, mes y año
const dayOfWeek = daysOfWeek[currentDate.getDay()];
const day = currentDate.getDate();
const month = months[currentDate.getMonth()];
const year = currentDate.getFullYear();

// Formato de presentacion
const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;

// Display para velo en la pagina
dateDisplay.textContent = formattedDate;



//aqui añado la suscripcion al newsletter:
function subscribe() {
  const emailInput = document.getElementById('newsletter1');
  const successMessage = document.getElementById('successMessage');

  // Verifico si el campo de correo electrónico está vacío antes de mostrar el mensaje de éxito
  if (emailInput.value.trim() !== '') {
    // Aquí se agrega la lógica para enviar la solicitud de suscripción
    // no hay llamada al servidor para manejar la suscripción.

    // Estoy simulando una solicitud de suscripción 
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000); // Ocultare el mensaje después de 5 segundos (5000 ms)

    // Muestro el mensaje de éxito
    successMessage.style.display = 'block';

    // Limpio el campo de email después de la suscripción
    emailInput.value = '';
  }
}
//añado mensaje para About y Faqs
function showPopup() {
  alert("For any questions, please email us at contactjustpikapika@gmail.com");
}
//añado mensajes para Features
function FeaturePopup() {
  alert("Easy to use: Find delicious recipes with just a few clicks.Wide variety of recipes: Explore a diverse selection of recipes for all tastes. Save your favorites: Mark the recipes you love and access them easily. Share with friends: Share your favorite recipes on social media.");
}



//apiKey=aac38ef2db854c74b8b9f59ac48acbf6&number=6&query="