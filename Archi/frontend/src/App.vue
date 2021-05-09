<template>

  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <h1>Les apprentis gourmets!</h1>
    <div class="tabset">
  <!-- Tab 1 -->
  <input type="radio" name="tabset" ref="tab1"  id="tab1" aria-controls="qui-sommes-nous" checked>
  <label for="tab1">Qui sommes nous ?</label>
  <!-- Tab 2 -->
  <input type="radio" name="tabset" ref="tab2" id="tab2" aria-controls="les-recettes">
  <label for="tab2">Les recettes</label>
  <!-- Tab 3 -->
  <input type="radio" name="tabset" ref="tab3" id="tab3" aria-controls="poster-une-recette">
  <label for="tab3">Poster une recette</label>

  <div class="tab-panels">
    <section id="qui-sommes-nous" class="tab-panel">
      <h2>Qui sommes nous ?</h2>
      <p><strong>Overall Impression:</strong> An elegant, malty German amber lager with a clean, rich, toasty and bready malt flavor, restrained bitterness, and a dry finish that encourages another drink. The overall malt impression is soft, elegant, and complex, with a rich aftertaste that is never cloying or heavy.</p>
      <p><strong>History:</strong> As the name suggests, brewed as a stronger “March beer” in March and lagered in cold caves over the summer. Modern versions trace back to the lager developed by Spaten in 1841, contemporaneous to the development of Vienna lager. However, the Märzen name is much older than 1841; the early ones were dark brown, and in Austria the name implied a strength band (14 °P) rather than a style. The German amber lager version (in the Viennese style of the time) was first served at Oktoberfest in 1872, a tradition that lasted until 1990 when the golden Festbier was adopted as the standard festival beer.</p>
  </section>
    <section id="les-recettes" class="tab-panel">
      <h2>Les recettes</h2>
      <RecipeCard ref='RecipeCard'/>
    </section>
    <section id="poster-une-recette" class="tab-panel">
      <h2>Poster une recette</h2>
      <PostRecipe ref='PostRecipe'/>
        </section>
  </div>

  </div>

  </div>

</template>


<script>
import RecipeCard from './components/RecipeCard.vue';
import PostRecipe from './components/PostRecipe.vue';
import 'bootstrap/dist/css/bootstrap.min.css'
// import '@/assets/css/main.css'

export default {
  name: 'App',
  components: {
    RecipeCard,
    PostRecipe
  }
}
</script>

<style>
h1{
  text-align: center;
}
.tabset > input[type="radio"] {
  position: absolute;
  left: -200vw;
}

.tabset .tab-panel {
  display: none;
}

.tabset > input:first-child:checked ~ .tab-panels > .tab-panel:first-child,
.tabset > input:nth-child(3):checked ~ .tab-panels > .tab-panel:nth-child(2),
.tabset > input:nth-child(5):checked ~ .tab-panels > .tab-panel:nth-child(3),
.tabset > input:nth-child(7):checked ~ .tab-panels > .tab-panel:nth-child(4),
.tabset > input:nth-child(9):checked ~ .tab-panels > .tab-panel:nth-child(5),
.tabset > input:nth-child(11):checked ~ .tab-panels > .tab-panel:nth-child(6) {
  display: block;
}

 html {
	 height: 100%;
}
 body {
	 /* font-family: "Open Sans", sans-serif; */
	 font-family: cursive, sans-serif !important;
	 font-size: 1rem;

}

.tabset > label {
  position: relative;
  display: inline-block;
  padding: 15px 15px 25px;
  border: 1px solid transparent;
  border-bottom: 0;
  cursor: pointer;
  font-weight: 600;
}

.tabset > label::after {
  content: "";
  position: absolute;
  left: 15px;
  bottom: 10px;
  width: 22px;
  height: 4px;
  background: #8d8d8d;
}

.tabset > label:hover,
.tabset > input:focus + label {
  color: #06c;
}

.tabset > label:hover::after,
.tabset > input:focus + label::after,
.tabset > input:checked + label::after {
  background: #06c;
}

.tabset > input:checked + label {
  border-color: #ccc;
  border-bottom: 1px solid #fff;
  margin-bottom: -1px;
}

.tab-panel {
  padding: 30px;
  border-top: 1px solid #ccc;
  background: #00B0F0;
}

</style>
