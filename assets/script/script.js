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

        let stringIngredient = "";

        el.recipe.ingredients.forEach((elem) => {
          const ingredient = elem.text;

          stringIngredient =
            stringIngredient + `<li>&#10004 ${ingredient}</li>`;
        });

        cardRandomRes.innerHTML = `<div class="random__card-item">
                                    <span class="border tl"></span>
                                    <span class="border tr"></span>
                                    <span class="border bl"></span>
                                    <span class="border br"></span>
                                    <h3 class="random__card-title">${
                                      el.recipe.label
                                    }</h3>
                                    <div class="wrapper__card-item">
                                    <div class="random__image-block">
                                      <img src="${el.recipe.image}"
                                      alt="food_photo" class="random__card-image">
                                      <div class="random__box-time-calories">
                                        <div class="random__box-calories">
                                          <svg class="random__calories-img">
                                            <use xlink:href="assets/images/icons/sprite.svg#calories"></use>
                                          </svg>
                                          <div class="random__calories-text">${Math.round(
                                            el.recipe.calories / el.recipe.yield
                                          )} kcal</div>
                                        </div>
                                          <div class="random__box-time">
                                            <svg class="random__time-img">
                                              <use xlink:href="assets/images/icons/sprite.svg#time"></use>
                                            </svg>
                                            <div class="random__time-text">${
                                              el.recipe.totalTime
                                            } mins</div>
                                        </div>
                                      </div>
                                    </div>
                                        
                                        <div class="random__card-body">

                                            <div class="random__card-ingridients">
                                                <ul>
                                                    ${stringIngredient}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="${
                                      el.recipe.url
                                    }" target="_blank" class="cards__url" rel="noopener noreferrer">&#9998 Click to see the recipe</a>
                                </div>`;
        wrapperRandomCards.innerHTML += cardRandomRes.innerHTML;
      });
    })

    .catch((error) => {
      wrapperRandomCards.innerHTML = `<p class="errorText">${error.message}</p>`;
    });

  // .finally(() => {
});

//checkbox
const glutenFreeCheckbox = document.getElementById("gluten_free");
const ketoCheckbox = document.getElementById("keto");
const noOilCheckbox = document.getElementById("no_oil");
const seaFoodCheckbox = document.getElementById("seafood");

//Dinara

const searchButton = document.querySelector(".search_parameters");
const form = document.querySelector(".inputs_form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Предотвратить отправку данных формы
  sendApiRequest();
});

async function sendApiRequest() {
  try {
    const appId = "3a18015c"; // индив. данные из сайта edamam
    const appKey = "bce0ab11b6000bbc62ee88ac22680e5b"; // индив. данные из сайта edamam
    // const appIdDatabase = "d73534aa";
    // const appKeyDatabase = "daae4bb9ceeeec1ce5968446c6af50f9";
    const searchRecipe = document.querySelector(".search_input");
    let searchRecipeValue = searchRecipe.value;

    clearRecipes();

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
  }
  //  finally {
  // }
}

function clearRecipes() {
  const cardsInner = document.querySelector(".cards__container");
  cardsInner.innerHTML = "";
}

function useApiData(data) {
  const cardsInner = document.querySelector(".cards__container");

  if (data.hits.length === 0) {
    cardsInner.innerHTML = `<p class="cards__text-recipe-not">Recipe not found</p>`;
    return;
  }

  data.hits.forEach((hit) => {
    const recipe = hit.recipe;
    const card = document.createElement("div");
    card.classList.add("cards__inner");
    card.style.backgroundImage = `url(${recipe.image})`;
    card.innerHTML = `
      <div class="cards__box">
        <p class="cards__title">${recipe.label}</p>
        <p>${recipe.healthLabels[0]}, ${recipe.healthLabels[1]},
           ${recipe.healthLabels[2]}</p>
        <a href="${
          recipe.url
        }" target="_blank" class="cards__url" rel="noopener noreferrer">&#9998 Click to see the recipe</a>
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
