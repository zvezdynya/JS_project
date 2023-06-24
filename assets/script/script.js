// переменные
const wrapperRandomBlock = document.querySelector(".random__wrapper");
const wrapperRandomCards = document.querySelector(".random__card-items");
const cardsBlock = document.querySelector(".cards");
const cardsInner = document.querySelector(".cards__container");
const searchButton = document.querySelector(".search_parameters");
const form = document.querySelector(".inputs_form");
const appId = "3a18015c";
const appKey = "bce0ab11b6000bbc62ee88ac22680e5b";
const loader = `<div id="loader"></div>`;
const dishTypes = [
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
]; // массив типов блюд для выбора рандомных карточек
const randomParamSearch = Math.floor(Math.random() * dishTypes.length);

// блок с функциями
//что-то прячем
function hiddenSometh(something) {
  something.style.display = "none";
}
//что-то показываем
function viewSometh(something) {
  something.style.display = "block";
}

//работа стрелок
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

// редактируем время, если оно 0mins
function redactTotalTime(el) {
  let stringTotalTime = "";
  if (el.recipe.totalTime == 0) {
    return (stringTotalTime = 35);
  } else {
    return (stringTotalTime = el.recipe.totalTime);
  }
}

// генерируем html верстку random_block
function createRandomCard(el, stringIngredient) {
  /* wrapperRandomCards.innerHTML = ''; */
  const cardRandomRes = document.createElement("div");
  cardRandomRes.classList.add("random__card-item");

  cardRandomRes.innerHTML = `<span class="border tl"></span>
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
                                          <div class="random__time-text">${redactTotalTime(
                                            el
                                          )} mins</div>
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
                                  }" target="_blank" class="cards__url" rel="noopener noreferrer">&#9998 Click to see the recipe</a>`;
  addCardToHTML(wrapperRandomCards, cardRandomRes);
}

//функция создания карточек из поиска

function useApiData(data) {
  cardsInner.innerHTML = loader;
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
            <div class="cards__time-text">${redactTotalTime(hit)} mins</div>
          </div>
        </div>
      </div>
    `;
    addCardToHTML(cardsInner, card);
  });
}

//функция запроса к апи
async function sendApiRequest(searchParam, errorContainer, event) {
  cardsInner.innerHTML = "";
  try {
    let response = await fetch(
      `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${searchParam}`
    );
    console.log(response);
    let data = await response.json();
    console.log(data);
    if (event.type == "click") {
      useApiData(data);
    } else if (event.type == "DOMContentLoaded") {
      const hitsRcipes = data.hits;
      let stringIngredient = "";
      hitsRcipes.forEach((el) => {
        el.recipe.ingredients.forEach((elem) => {
          const ingredient = elem.text;
          stringIngredient =
            stringIngredient + `<li>&#10004 ${ingredient}</li>`;
        });
        createRandomCard(el, stringIngredient);
        viewSometh(wrapperRandomBlock);
      });
    }

    //console.log(event.type);
  } catch (error) {
    document.querySelector(errorContainer).textContent =
      "Server is not responding";
  }
  // } finally {
  //   loader.style.display = "none"; // Скрыть лоадер после загрузки
  // }
}

// добавляем верстку в родительский контейнер на странице
function addCardToHTML(parentContainer, card) {
  parentContainer.appendChild(card);
}

// блок основного кода

hiddenSometh(wrapperRandomBlock);

// запрос в апи при загрузке страницы
document.addEventListener("DOMContentLoaded", (e) => {
  wrapperRandomCards.innerHTML = loader;
  console.log(e.type);
  sendApiRequest(randomParamSearch, wrapperRandomCards.innerHTML, e);
});

//Dinara
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  viewSometh(cardsBlock);
  console.log(e.type);
  const searchRecipe = document.querySelector(".search_input");
  let searchRecipeValue = searchRecipe.value;
  hiddenSometh(wrapperRandomBlock);
  sendApiRequest(searchRecipeValue, ".cards__container", e);
  searchRecipe.value = ""; // Очистить значение инпута
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Предотвратить отправку данных формы
});
