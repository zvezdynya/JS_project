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
  document.getElementById("content").innerHTML = `
  <div class="card">
            <img src="${data.hits[0].recipe.image}">
  </div>`;
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
