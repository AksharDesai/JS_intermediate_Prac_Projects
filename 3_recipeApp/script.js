let RandomMeal={}

async function getRandomMeal (){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    
    

    const responseData = await response.json()

    RandomMeal = responseData.meals[0]

   

    displayRandomMeal(RandomMeal)

}
async function getMealbyId (id){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const responseData = await response.json()

    const MealFromId = responseData.meals[0];

    return MealFromId
}

async function getMealbySearch(term){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const responsData = await response.json()

    const MealFromSearch = responsData.meals

    return MealFromSearch
}
//************** Calling Function ON Load ***************/

getRandomMeal()
document.addEventListener('DOMContentLoaded',onLoadDisplayMeal)

//************** SETTING Elements ***************/

const randomBtn = document.getElementById('randomBtn')
const randomContainer = document.getElementById('random-container')
const favourtieContainer = document.getElementById('favourite-container')
const searchTerm = document.getElementById('search-term')
const searchBtn = document.getElementById('search')
const instructionContainer = document.querySelector('.instruction-container')
const hmm= document.getElementById('hmm')
const loadAnimation = document.querySelector('.loadAnimation')


//************** Event Listeners ***************/

randomBtn.addEventListener('click',getRandomMeal)
searchBtn.addEventListener('click', async function (e){
    
    const MealsFromSearch = await getMealbySearch(searchTerm.value)
    MealsFromSearch.forEach(meal => {
           
        displayRandomMeal(meal)

    });
    
})

//************** FUNCTIONS ***************/

 async function displayRandomMeal(randomMeal){
    
    
    const mealName=randomMeal.strMeal;
    const mealID=randomMeal.idMeal;
    const mealInstructions = randomMeal.strInstructions;
    const mealImage = randomMeal.strMealThumb;

    const recipeEL = document.createElement('div')
    
    recipeEL.classList.add('random-recipe')
    recipeEL.innerHTML = `

         <div class="random-recipe-content">
                   <h4>${mealName}</h4>
                    <p id="randomInstructions">
                        ${mealInstructions}
                    </p>
                </div>
                <div class="random-recipe-image">
                    <img id="randomImage" src="${mealImage}" alt="" />
                </div>
                <div class="favourite-button">
                    <i id="fvrtBtn" class="ri-heart-2-fill"></i>
                  </div>
            </div>
    `
    
    // randomContainer.appendChild(recipeEL)
    randomContainer.insertBefore(recipeEL,randomContainer.firstChild)

    const favouriteButton = document.getElementById('fvrtBtn')


    //*********** Favourtie Button Event Listener ************/
    favouriteButton.addEventListener('click',function (e){
        addMealToFavourite(randomMeal,mealName,mealImage,mealID)
    })
        // console.log('clicked');
        // console.log(e.currentTarget.parentElement.parentElement);
        
    

}

function addMealToFavourite(meal,mealName,mealImage,mealID){
    
    // console.log(mealName);

    const recipeContainer = document.createElement('div')
    recipeContainer.setAttribute("meal-ID",mealID)
    recipeContainer.classList.add('recipe-container')

    recipeContainer.innerHTML = `<img src="${mealImage}" />
              <div class="recipe-container-bottom">
                <h4>${mealName}</h4>
              </div>
              <div
                class="favourite-recipe-cancel-button"
              >
                <i class="ri-close-large-line"></i>
              </div>`

    favourtieContainer.insertBefore(recipeContainer,favourtieContainer.firstChild)

    addMealToLocalStorage(mealID)

    const removeMealFromFavourite = document.querySelector('.favourite-recipe-cancel-button')

    removeMealFromFavourite.addEventListener('click',function(e){
        const meal = e.currentTarget.parentElement
        // console.log(meal);
        favourtieContainer.removeChild(meal)
        removeFavouriteFromLocalStorage(mealID)
    })
    const recipeContainerBottom = document.querySelector('.recipe-container-bottom')

    recipeContainerBottom.addEventListener('click',function (e){
        loadAnimation.classList.add('active')
        setTimeout(function(e){
            showInstructions(meal)
        },5000)
    })
        
}

function addMealToLocalStorage(mealID){
        let LocalStoragemealIDs = getMealsFromLocalStorage()

        if (LocalStoragemealIDs.includes(mealID)) {

            console.log("Meal Already in local storage");
            console.log(LocalStoragemealIDs);

        }else{

            console.log(LocalStoragemealIDs);
            // console.log(mealID);
            LocalStoragemealIDs.push(mealID)
            localStorage.setItem('mealIDs',JSON.stringify(LocalStoragemealIDs))
            console.log("added to local Storage");
        }

}
function getMealsFromLocalStorage() {
    const mealIDs = localStorage.getItem('mealIDs');
    return mealIDs ? JSON.parse(mealIDs) : [];
}

function removeFavouriteFromLocalStorage(mealID){
        let LocalStoragemealIDs = getMealsFromLocalStorage()

        LocalStoragemealIDs = LocalStoragemealIDs.filter((id)=> id!== mealID)

        
        localStorage.setItem('mealIDs',JSON.stringify(LocalStoragemealIDs));
}

async function onLoadDisplayMeal(){
        let LocalStoragemealIDs = getMealsFromLocalStorage()
        
       for (const id of LocalStoragemealIDs) {
           let  meal = await getMealbyId(id) 

           addMealToFavourite(meal,meal.strMeal,meal.strMealThumb,meal.idMeal)

       }
}

function showInstructions(meal){
    
    console.log(meal.strInstructions);


    loadAnimation.classList.remove('active')
    hmm.classList.add('deactivate')

    const videoURL = meal.strYoutube;
    const videoID = videoURL.split('v=')[1];
    const embedURL = `https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&controls=0`;

    instructionContainer.innerHTML = `
    <h1>${meal.strMeal}</h1>
          <div class="video-container">
            <iframe class="video-frame" src="${embedURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          
            <h2>Instructions <i class="ri-arrow-down-line"></i></h2>
            <p>${meal.strInstructions}</p>
    `;
    instructionContainer.classList.add('active')
}


