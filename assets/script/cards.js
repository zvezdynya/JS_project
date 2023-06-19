//edamam

const searchButton = document.querySelector(".search"); //нужно будет заменить кнопку

searchButton.addEventListener("click", () => {
  sendApiRequest();
});

async function sendApiRequest() {
  const loader = document.getElementById("loader");
  loader.style.display = "block"; // Показать лоадер

  try {
    const appId = "3a18015c"; //индив. данные из сайта edamam
    const appKey = "bce0ab11b6000bbc62ee88ac22680e5b"; //индив. данные из сайта edamam
    const searchRecipe = document.getElementById("recipe").value; //нужно будет заменить
    loader.style.display = "block"; // Показать лоадер

    let response = await fetch(
      `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${searchRecipe}`
    );
    console.log(response);
    let data = await response.json();
    console.log(data);
    useApiData(data);
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
    document.querySelector(".cards__container").textContent =
      "Recipe not found";
    return;
  }

  data.hits.forEach((hit) => {
    const recipe = hit.recipe;
    const card = document.createElement("div");
    card.classList.add("cards__inner", "swiper-slide");
    card.style.backgroundImage = `url(${recipe.image})`;
    card.innerHTML = `
          <div class="cards__box">
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

//слайдер:
new Swiper(".cards__slider", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
