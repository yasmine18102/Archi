<template>
  <div class="container">
  <div class="col-12">
    <form class="recipe-form" @submit.prevent="submit">
      <div>
        <label for="label">Label:</label>
        <input id="label" v-model="label" class="form-control" required />
      </div>
      <div>
        <label for="category">Category:</label>
        <select id="category" class="form-control"  v-model.number="category" required>
          <option v-for="(category, index) in categoriesList" :key="index" :value="category.id">{{category.label}} </option>
        </select>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" class="form-control"  required v-model="description"></textarea>
      </div>
      <div>
        <label for="serving">serving:</label>
        <input id="serving" class="form-control"  type="number" required v-model.number="serving" />
      </div>
      <div>
        <label for="level">Level:</label>
        <select id="level" class="form-control"  v-model.number="level" required>
          <option value="1">Beginner </option>
          <option value="2">Intermediate </option>
          <option value="3">Advanced</option>
        </select>
      </div>
      <div>
        <label for="calories">Calories:</label>
        <input id="calories" class="form-control"  type="number" v-model.number="calories" required/>
      </div>
      <div>
        <label for="preperationTime">Preperation Time:</label>
        <input
          id="preperationTime"
          type="number"
          required class="form-control"
          v-model.number="preperationTime"
        />
      </div>
      <div>
        <label for="ingredients">Ingredients:</label>
        <select id="ingredients" class="form-control"  v-model="ingredients" required multiple>
            <option v-for="(ingredient, index) in ingredientsList" :key="index" :value="ingredient.id">{{ingredient.label}} </option>
        </select>
      </div>


      <input class="btn btn-success btn-lg btn-block mt-3"  type="submit" value="Ajouter la recette" />
    </form>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      label: "",
      description: "",
      serving: null,
      level: null,
      calories: null,
      preperationTime: null,
      ingredients: [],
      category: null,
      ingredientsList: [],
      categoriesList: []
    };
  },
  methods: {
    submit() {

        const recipe = {
              label : this.label,
              description : this.description,
              serving : this.serving,
              level : this.level,
              calories : this.calories,
              preperationTime : this.preperationTime,
              category : this.category,
              ingredients : Object.assign([], this.ingredients)
        };

    axios
      .post(`http://localhost:3000/api/recipes`, recipe)
      .then(response => {
        this.errors = response.data.error;
        this.$root.$refs.RecipeCard.getAllRecipes();
        this.$root.$refs.tab2.checked = true;
      })
      .catch(e => {
        this.errors.push(e);
      });

    },

    resetForm(){
      this.label= "";
      this.description = "";
      this.serving =null;
      this.level= null;
      this.calories= null;
      this.preperationTime = null;
      this.ingredients = [];
     this. category=  null;
    }
  },

  // Fetches posts when the component is created.
  created() {
          axios
      .get(`http://localhost:3000/api/categories`)
      .then(response => {
        this.categoriesList = response.data;
        this.errors = response.data.error;
      })
      .catch(e => {
        this.errors.push(e);
      });

      axios
      .get(`http://localhost:3000/api/ingredients`)
      .then(response => {
        this.ingredientsList = response.data;
        this.errors = response.data.error;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
};
</script>

<style></style>
