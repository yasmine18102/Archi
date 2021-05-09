<template>
  <div class="recipe-card-list">
    <select
      id="category"
      class="form-control"
      v-model.number="category"
      @change="filter($event)"
    >
      <option v-bind:value="-1">All</option>
      <option
        v-for="(category, index) in categoriesList"
        :key="index"
        v-bind:value="category.id"
        >{{ category.label }}
      </option>
    </select>
    <div class="row d-flex justify-content-center ">
      <div
        class="recipe-card col-sm-12 col-md-3 col-lg-3 p-0"
        v-for="(recipe, index) in recipes"
        :key="index"
      >
        <aside>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg"
            alt="Chai Oatmeal"
          />
        </aside>

        <div>
          <h2>{{ recipe.label }}</h2>
          <h5>{{ recipe.category.label }}</h5>

          <ul>
            <li>
              <span class="icon icon-users"></span
              ><span>{{ recipe.serving }}</span>
            </li>
            <li>
              <span class="icon icon-clock"></span
              ><span>{{ recipe.preperationTime }} min</span>
            </li>
            <li>
              <span class="icon icon-level"></span>
              <span v-if="recipe.level == 1">Beginner level</span>
              <span v-else-if="recipe.level == 2">Intermediate level</span>
              <span v-else-if="recipe.level == 3">Advanced level</span>
            </li>
            <li>
              <span class="icon icon-calories"></span
              ><span>{{ recipe.calories }}</span>
            </li>
          </ul>

          <p>{{ recipe.description }}</p>
          <p>
            Ingredients:
            <span>{{ recipe.ingredients }} </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      recipes: [],
      categoriesList: [],
      category: -1,
      errors: []
    };
  },

  // Fetches posts when the component is created.
  created() {
    this.$root.$refs.RecipeCard = this;
    this.getAllRecipes();
    axios
      .get(`http://localhost:3000/api/categories`)
      .then(response => {
        this.categoriesList = response.data;
        this.errors = response.data.error;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    filter(event) {
        if(event.target.value == -1){
          this.getAllRecipes()
        }else{
          this.getAllRecipesByCategory();
        }

    },
    getAllRecipes() {
      axios
        .get(`http://localhost:3000/api/recipes`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.recipes = response.data;
          this.errors = response.data.error;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    getAllRecipesByCategory() {
      axios
        .get(`http://localhost:3000/api/recipes/category/` + this.category)
        .then(response => {
          this.recipes = [];
          this.recipes = response.data;
          this.errors = response.data.error;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<style>
img {
  max-width: 100%;
  height: auto;
  vertical-align: bottom;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.recipe-card {
  background: #fff;
  margin: 4em 0.5em;
  border-radius: 5px;
}
.recipe-card aside {
  position: relative;
}
.recipe-card aside .button {
  background: #57abf2;
  display: inline-block;
  position: absolute;
  top: 80%;
  right: 3%;
  width: em(65);
  height: em(65);
  border-radius: em(65);
  line-height: em(65);
  text-align: center;
}
.recipe-card aside .button .icon {
  vertical-align: middle;
}
.recipe-card div {
  padding: 1.25em 1.5em;
}
.recipe-card div ul {
  list-style: none;
  margin: 0.5em 0 0;
  padding: 0;
}
.recipe-card div ul li {
  display: inline-block;
  margin-left: 1em;
  line-height: 1em;
}
.recipe-card div ul li:first-child {
  margin-left: 0;
}
.recipe-card div ul li .icon {
  vertical-align: bottom;
}
.recipe-card div ul li span:nth-of-type(2) {
  margin-left: 0.5em;
  font-size: 0.8em;
  font-weight: 300;
  vertical-align: middle;
  color: #838689;
}
.recipe-card div h2,
.recipe-card div h5 {
  margin: 0;
  font-weight: 300;
}
.recipe-card div h2 {
  font-size: em(28);
  color: #222;
}
.recipe-card div h5 {
  font-size: em(15);
  color: #838689;
}
.recipe-card div p {
  margin: 1.25em 0;
  font-size: em(13);
  font-weight: 400;
  color: #222;
}
.recipe-card div p span {
  font-weight: 700;
  color: #000;
}
.recipe-card div .ingredients {
  margin: 2em 0 0.5em;
}
.recipe-card .icon {
  display: inline;
  display: inline-block;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/recipe-card-icons.svg);
  background-repeat: no-repeat;
}
.recipe-card .icon-calories,
.recipe-card .icon-calories\:regular {
  background-position: 0 0;
  width: 16px;
  height: 19px;
}
.recipe-card .icon-clock,
.recipe-card .icon-clock\:regular {
  background-position: 0 -19px;
  width: 20px;
  height: 20px;
}
.recipe-card .icon-level,
.recipe-card .icon-level\:regular {
  background-position: 0 -39px;
  width: 16px;
  height: 19px;
}
.recipe-card .icon-play,
.recipe-card .icon-play\:regular {
  background-position: 0 -58px;
  width: 21px;
  height: 26px;
}
.recipe-card .icon-users,
.recipe-card .icon-users\:regular {
  background-position: 0 -84px;
  width: 18px;
  height: 18px;
}
</style>
