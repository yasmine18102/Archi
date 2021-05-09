class Recipe {
        constructor(label, description, serving, level, calories, preperationTime, ingredients, category) {
        this.label = label;
        this.description = description;
        this.serving = serving;
        this.level = level;
        this.calories = calories;
        this.preperationTime = preperationTime;
        this.ingredients = ingredients;
        this.category = category;
    }
}

module.exports = {
    Recipe: Recipe
};