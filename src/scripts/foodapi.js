let element = document.createElement("div");
element.classList.add("foodList");
document.body.appendChild(element);
let foodEntries = document.querySelector(".foodList")
const stringTemplate = (input) => {
    return `
        <div>
            <h1>${input.name}</h1>
            <p>${input.category}</p>
            <p>${input.ethnicity}</p>
            <p>${input.ingredients}</p>
            <p>${input.countries}</p>
            <p>${input.energy}</p>
            <p>${input.sugars_value}</p>
            <p>${input.fat_value}</p>
        </div>
    `;
}

const render = (item) => {
    foodEntries.innerHTML += stringTemplate(item);
}

fetch("http://localhost:8088/food")
    .then(food => food.json())
    .then(parsedFood => {
        parsedFood.forEach(food => {
            
            console.log(food);

            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                     food.ingredients = `Ingredients: ${productInfo.product.ingredients_text}`
                     food.countries = `Country: ${productInfo.product.countries}`
                     food.energy = `Calories ${productInfo.product.nutriments.energy}` 
                     food.sugars_value = `Sugar: ${productInfo.product.nutriments.sugars_value}`
                     food.fat_value = `Fat: ${productInfo.product.nutriments.fat_value}`
 
                     // Add representaiton to DOM
                     console.log(food)
                     foodEntries.innerHTML += stringTemplate(food)
                })
        })
    });




// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         console.table(parsedFoods)
//     })