//Valya

const wrapperRandomCards = document.querySelector(".random__card-items");
const button = document.querySelector(".arrow-4");
button.onclick = function () {
  // var container = document.getElementById('container');
  sideScroll(wrapperRandomCards, "right", 50, 600, 40);
};

const back = document.querySelector(".arrow-3");
back.onclick = function () {
  // var container = document.getElementById('container');
  sideScroll(wrapperRandomCards, "left", 50, 600, 40);
};

function sideScroll(element, direction, speed, distance, step) {
  scrollAmount = 0;
  const slideTimer = setInterval(function () {
    if (direction == "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}

dishTypes = [
  `Alcohol-cocktail`,
  `Biscuits and cookies`,
  `Bread`,
  `Cereals`,
  `Condiments and sauces`,
  `Drinks`,
  `Desserts`,
  `Egg`,
  `Main course`,
  `Omelet`,
  `Pancake`,
  `Preps`,
  `Preserve`,
  `Salad`,
  `Sandwiches`,
  `Soup`,
  `Starter`,
];

document.addEventListener("DOMContentLoaded", () => {
  const appId = "3a18015c";
  const appKey = "bce0ab11b6000bbc62ee88ac22680e5b";
  fetch(
    `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${Math.floor(
      Math.random() * dishTypes.length
    )}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Unfortunately, the server is not responding. Try using the search."
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const hitsRcipes = data.hits;
      console.log(hitsRcipes);

      hitsRcipes.forEach((el) => {
        const cardRandomRes = document.createElement("div");
        cardRandomRes.classList.add("random__card-item");

        //получаем каждый ингридиент отдельным пунктом

        // const addIngredients = function () {
        //   el.recipe.ingredients.forEach(elem => {
        //   const ingredient = elem.text;
        //   console.log(ingredient);
        //   //const liRandom = document.createElement('li');
        //   return `<li>${ingredient}</li>`;
        //   });
        // };

        let stringIngredient = "";
        el.recipe.ingredients.forEach((elem) => {
          const ingredient = elem.text;

          stringIngredient = stringIngredient + `<li>${ingredient}</li>`;
        });
        //console.log(string);

        cardRandomRes.innerHTML = `<div class="random__card-item">
                                    <span class="border tl"></span>
                                    <span class="border tr"></span>
                                    <span class="border bl"></span>
                                    <span class="border br"></span>
                                    <h3 class="random__card-title">${el.recipe.label}</h3>
                                    <div class="wrapper__card-item">
                                        <img src="${el.recipe.image}"
                                            alt="food_photo" class="random__card-image">
                                        <div class="random__card-body">

                                            <div class="random__card-ingridients">
                                                <ul>
                                                    ${stringIngredient}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
        wrapperRandomCards.innerHTML += cardRandomRes.innerHTML;
      });
    })
    .catch((error) => {
      wrapperRandomCards.innerHTML = `<p class="errorText">${error.message}</p>`;
    });
  // .finally(() => {
});

// async function sendApiRequest() {
//   const apiKey = "83b7647d80da451e83bc5f69025b4643";
//   const searchRecipe = document.getElementById("recipe").value;

//   let response = await fetch(
//     `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${searchRecipe}&number=1&instructionsRequired=true`
//   );

//   let data = await response.json();
//   console.log(data);
//   useApiData(data); // Вызываем функцию useApiData() для обработки данных и вывода в HTML
// }

//Dinara
const searchButton = document.querySelector(".search_parameters");
searchButton.addEventListener("click", () => {
  sendApiRequest();
});

async function sendApiRequest() {
  const loader = document.getElementById("loader");
  loader.style.display = "block"; // Показать лоадер
  try {
    const appId = "3a18015c"; //индив. данные из сайта edamam
    const appKey = "bce0ab11b6000bbc62ee88ac22680e5b"; //индив. данные из сайта edamam
    const searchRecipe = document.querySelector(".search_input");
    let searchRecipeValue = searchRecipe.value;
    loader.style.display = "block"; // Показать лоадер

    let response = await fetch(
      `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${searchRecipeValue}`
    );
    console.log(response);
    let data = await response.json();
    console.log(data);

    useApiData(data);
    searchRecipe.value = ""; // Очистить значение инпута
  } catch (error) {
    document.querySelector(".cards__container").textContent =
      "Server is not responding";
  } finally {
    loader.style.display = "none"; // Скрыть лоадер после загрузки
  }
}

function useApiData(data) {
  const cardsInner = document.querySelector(".cards__container");
  cardsInner.innerHTML = "";

  if (data.hits.length === 0) {
    document.querySelector(
      ".cards__container"
    ).innerHTML = `<p class="cards__text-recipe-not">Recipe not found</p>`;
    return;
  }

  data.hits.forEach((hit) => {
    const recipe = hit.recipe;
    const card = document.createElement("div");
    card.classList.add("cards__inner");
    card.style.backgroundImage = `url(${recipe.image})`;
    card.innerHTML = `
          <div class="cards__box d-block w-100">
            <p class="cards__title">${recipe.label}</p>
            <p>${recipe.dietLabels}</p>
            <a href="${
              recipe.url
            }" target="_blank" class="cards__url" rel="noopener noreferrer">Recipe</a>
            <div class="cards__box-time-calories">
            <div class="cards__box-calories">
            <svg class="cards__calories-img">
          <use xlink:href="assets/images/icons/sprite.svg#calories"></use>
        </svg>
            <div class="cards__calories-text">${Math.round(
              recipe.calories / recipe.yield
            )} kcal</div>
            </div>
            <div class="cards__box-time">
            <svg class="cards__time-img">
          <use xlink:href="assets/images/icons/sprite.svg#time"></use>
        </svg>
            <div class="cards__time-text">${recipe.totalTime} mins</div>
            </div>
            </div>
          </div>
        `;
    cardsInner.appendChild(card);
  });
}
