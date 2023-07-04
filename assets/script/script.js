// переменные
const wrapperRandomBlock = document.querySelector(".random__wrapper");
const wrapperRandomCards = document.querySelector(".random__card-items");
const cardsBlock = document.querySelector(".cards");
const cardsInner = document.querySelector(".cards__container");
const searchButton = document.querySelector(".search-form__wrapper-button");
const form = document.querySelector(".search-form");
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
  //  finally {
  //   hiddenSometh(loaderhtml);
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

//событие клик для поиска рецептов
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  viewSometh(cardsBlock);
  console.log(e.type);
  const searchRecipe = document.querySelector(".search-form__wrapper-area");
  let searchRecipeValue = searchRecipe.value;
  hiddenSometh(wrapperRandomBlock);
  sendApiRequest(searchRecipeValue, ".cards__container", e);
  searchRecipe.value = ""; // Очистить значение инпута
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Предотвратить отправку данных формы
});

/* const fruitList = [
  {
      name: 'orange',
      energy: '197 kJ (47 kcal)',
      vitamin1: 'Thiamine (B1)	8% DV, 0.087 mg',
      vitamin2: 'Riboflavin (B2)	3% DV, 0.04 mg',
      vitamin3: 'Vitamin C	64% DV, 53.2 mg',
      url: 'https://media.gettyimages.com/id/182463420/photo/tangerine-duo-with-leafs.jpg?s=612x612&w=0&k=20&c=d3JZRAqgqZ5RWyN4ryFteCnmFNbeD9e3TNJkS2IC0vU='
  }, 
  {
      name: 'pomegranate',
      energy: '346 kJ (83 kcal)',
      vitamin1: 'Folate (B9)	10% DV, 38 mg',
      vitamin2: 'Vitamin C	12% DV, 10.2 mg',
      vitamin3: 'Vitamin K	16% DV, 16.4 mg',
      url: 'https://media.gettyimages.com/id/185218827/photo/piece-of-pomegranate.jpg?s=612x612&w=0&k=20&c=9Q2YmTPHKOOE1sbDxl3SBegKtmzanSAlZEXtXNmn0As='
  },
  {
      name: 'banana',
      energy: '371 kJ (89 kcal)',
      vitamin1: 'Pantothenic acid (B5)	7% DV, 0.334 mg',
      vitamin2: 'Vitamin B6 31% DV, 0.4 mg',
      vitamin3: 'Vitamin C	10% DV, 8.7 mg',
      url: 'https://media.gettyimages.com/id/173242750/photo/banana-bunch.jpg?s=612x612&w=0&k=20&c=MAc8AXVz5KxwWeEmh75WwH6j_HouRczBFAhulLAtRUU='
  },
  {
      name: 'blueberry',
      energy: '240 kJ (57 kcal)',
      vitamin1: 'Vitamin C	12% DV, 9.7 mg',
      vitamin2: 'Vitamin E	4% DV, 0.57 mg',
      vitamin3: 'Vitamin K 18% DV, 19.3 mg',
      url: 'https://media.gettyimages.com/id/1071798454/photo/fresh-juicy-blueberries.jpg?s=612x612&w=0&k=20&c=-YbrKFpmRCc5v6euTg5LwI0mOfa2JZpiMMVwPG8L-Zo='
  },
  {
      name: 'mango',
      energy: '250 kJ (60 kcal)',
      vitamin1: 'Vitamin B6	9% DV, 0.119 mg',
      vitamin2: 'Folate (B9)	11% DV, 43 mg',
      vitamin3: 'Vitamin C 44% DV, 36.4 mg',
      url: 'https://media.gettyimages.com/id/168370138/photo/mango.jpg?s=612x612&w=0&k=20&c=ENq2BrUV8dNH2rth_ZYBBtS9RWDwCbI25SfulxirmnQ='
  },
]; */
/* 
const blockfruit = document.getElementById('block__fruit');
const blocksalad = document.getElementById('block__salad');
let fruitSaladStr = blocksalad.textContent;

window.addEventListener("load", (event) => { 
  let randomFruit = fruitList[Math.floor(Math.random() * fruitList.length)];
  function makeCapitalLetters (capital) {
    return `${capital.toUpperCase()}`;
}
const capital = makeCapitalLetters(randomFruit.name);
let fruitListStr = "";
  fruitListStr = `
    <h2>Excellent dessert</h2> 
    <img src="${randomFruit.url}" class = "block__picture" alt="Fruit">
    <h3>${capital}</h3>
    <p>${randomFruit.energy}</p>
    <ul>
      <li>${randomFruit.vitamin1}</li>
      <li>${randomFruit.vitamin2}</li>
      <li>${randomFruit.vitamin3}</li>
    </ul>
  `;  
  blockfruit.innerHTML = fruitListStr;
  fruitList.forEach(function(fruitSalad) {
    fruitSaladStr = fruitSaladStr + fruitSalad.name + ", ";
    let fruitSaladRecipe = fruitSaladStr;
    fruitSaladRecipe = `<p>Make a fruit salad of ${fruitSaladRecipe} drizzle the honey lime dressing on top of it.</p>`
    blocksalad.innerHTML = fruitSaladRecipe;
  });
}); */

//переменные для попапа
const jokePopup = document.getElementById('popup');
const jokeBtn = document.getElementById('joke');
const popupClose = document.querySelector('.popup__close');
const jokeText = document.querySelector('.popup__text');
const divBody = document.getElementById('body');

//функция запроса шутки с апи
async function jokeApiReq () {
  try {
      const apiKey = '39355f2c938446e9a0ac53c6bfcb3782';
      let response = await fetch(`https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`);
      console.log(response);
      let joke = await response.json();
      jokeText.textContent = joke.text;
  }
  catch (error) {
      jokeText.textContent = `Server is not responding: ${error.message}`;
  }
}
//прослушка на кнопку и на закрытие попапа
jokeBtn.addEventListener('click', event => {        
  event.preventDefault();
  jokeApiReq ();
  divBody.style.overflow = 'hidden';    //убираем 2й скролл
  jokePopup.classList.add('open');
})
popupClose.addEventListener('click', event => {
  event.preventDefault();
  divBody.style.overflow = '';
  jokePopup.classList.remove('open');
})