import SaladModel from "./models/salad.model.js";

const salads = [
    {name: "Caesar Salad", price: 12.99, description: "Classic Caesar Salad with Romaine lettuce, parmesan cheese, croutons, and Caesar dressing."},
    {name: "Greek Salad", price: 10.99, description: "Fresh mixed greens, tomatoes, cucumbers, red onions, feta cheese, and balsamic vinaigrette."},
    {name: "Mediterranean Salad", price: 14.99, description: "Mixed greens, tomatoes, cucumbers, red onions, feta cheese, olives, and balsamic vinaigrette."},
    {name: "Pesto Salad", price: 11.99, description: "Fresh mixed greens, tomatoes, cucumbers, red onions, and pesto sauce."},
    {name: "Vegan Salad", price: 9.99, description: "Fresh mixed greens, tomatoes, cucumbers, red onions, and a vegan dressing."},
];

SaladModel.insertMany(salads);

export default {}