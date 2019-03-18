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
            render(food)
        })
    });




// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         console.table(parsedFoods)
//     })