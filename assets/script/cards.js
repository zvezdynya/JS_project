//edamam
const searchButton = document.querySelector(".search");

searchButton.addEventListener("click", () => {
  sendApiRequest();
});

async function sendApiRequest() {
  const appId = "3a18015c";
  const appKey = "bce0ab11b6000bbc62ee88ac22680e5b";
  const searchRercipe = document.getElementById("recipe").value;
  let response = await fetch(
    `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${searchRercipe}`
  );
  console.log(response);
  let data = await response.json();
  console.log(data);
  useApiData(data);
}

function useApiData(data) {
  const cardsInner = document.querySelector(".cards__container");
  cardsInner.innerHTML = "";

  data.hits.forEach((hit) => {
    const recipe = hit.recipe;
    const card = document.createElement("div");
    card.classList.add("cards__inner");
    card.style.backgroundImage = `url(${recipe.image})`;
    card.innerHTML = `
          <div class="cards__box">
            <p>${recipe.label}</p>
            <p>${recipe.source}</p>
            <div class="cards__box-time-calories">
            <div class="cards__box-calories">
            <img src="assets/images/calories.svg" class="cards__calories-img">
            <div class="cards__calories-text">${Math.round(
              recipe.calories
            )}</div>
            </div>
            
            </div>
          </div>
        `;
    cardsInner.appendChild(card);
  });
}

//spoonacular
// const searchButton = document.querySelector(".search");

// searchButton.addEventListener("click", () => {
//   sendApiRequest();
// });

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

// function useApiData(data) {
//   document.getElementById("content").innerHTML = `
//       <div class="card">
//       <img src="${data.baseUri}${data.results[0].image}">
//       </div>`;
// }

/* <div class="cards__box-time">
            <img src="assets/images/time.svg" class="cards__time-img">
            <div class="cards__time-text"></div>
            </div> */
