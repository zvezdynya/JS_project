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

//Valya

dishTypes = [`Alcohol-cocktail`, `Biscuits and cookies`, `Bread`, `Cereals`, `Condiments and sauces`, `Drinks`, `Desserts`, `Egg`, `Main course`, `Omelet`, `Pancake`, `Preps`, `Preserve`, `Salad`, `Sandwiches`, `Soup`, `Starter`];

document.addEventListener('DOMContentLoaded', () => {
  const appId = "3a18015c";
  const appKey = "bce0ab11b6000bbc62ee88ac22680e5b";
  fetch(`https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${Math.floor(Math.random()*dishTypes.length)}`)
  .then((response) => {
    if (!response.ok) {
        throw new Error('Unfortunately, the server is not responding. Try using the search.');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const hitsRcipes = data.hits;
    console.log(hitsRcipes);
    const wrapperRandomCards = document.querySelector('.random__card-items');
    

    hitsRcipes.forEach(el => {
      const cardRandomRes = document.createElement('div');
      cardRandomRes.classList.add('random__card-item');
      
      //получаем каждый ингридиент отдельным пунктом

      // const addIngredients = function () {
      //   el.recipe.ingredients.forEach(elem => {
      //   const ingredient = elem.text;
      //   console.log(ingredient);
      //   const liRandom = document.createElement('li');
      //   return liRandom.innerHTML += ingredient;
      //   });
      // };

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
                                                    ${el.recipe.ingredients.forEach(elem => {
                                                      console.log(elem.text);
                                                      cardRandomRes.innerHTML+= `<li>${elem.text}</li>`;
                                                      })}
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
   
  // });

});