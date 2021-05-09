const express = require('express');
const cors = require('cors')
const app = express();

const recipe_router = require('./controller/recipe.controller');
const category_router = require('./controller/category.controller');
const ingredient_router = require('./controller/ingredient.controller');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('',recipe_router);
app.use('',category_router);
app.use('',ingredient_router);

app.listen(3000);