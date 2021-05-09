const router = require("express").Router();
const Connection = require("../utils/db.config").Connection;

// Get all recipies
router.get("/api/recipes", async (req, res) => {

  try {
      Connection.query(
        `SELECT
            r.id,
            r.label,
            r.description,
            r.serving,
            r.level,
            r.calories,
            r.preperationTime,
            c.label AS category,
            ri.ingredients AS ingredients
        FROM
            recipe r,
            category c
            JOIN  (  
              SELECT ri.recipeId AS id, GROUP_CONCAT(i.label) AS ingredients
              FROM   recipe_ingredients ri
              JOIN   ingredient AS i ON i.id = ri.ingredientId
              GROUP  BY ri.recipeId
              ) ri USING (id)
        WHERE
            r.categoryId = c.id`,
        function (err, recipes) {
          if (err) throw err;
          if(recipes.length == 0){
            res.status(204).send({ error: "no result" });
          }else{
            res.status(200).send(recipes);
          }
        }
      );
  } catch (error){
    res.status(400).send({ error: error });
  }
});

// Get recipe by id
router.get("/api/recipes/id/:id", async (req, res) => {
  try {

      Connection.query(
        `SELECT
            r.id,
            r.label,
            r.description,
            r.serving,
            r.level,
            r.calories,
            r.preperationTime,
            c.label AS category,
            ri.ingredients AS ingredients
        FROM
            recipe r,
            category c
            JOIN  (  
              SELECT ri.recipeId AS id, GROUP_CONCAT(i.label) AS ingredients
              FROM   recipe_ingredients ri
              JOIN   ingredient AS i ON i.id = ri.ingredientId
              GROUP  BY ri.recipeId
              ) ri USING (id)
        WHERE
            r.categoryId = c.id
            AND r.id =`+req.params.id,
        function (err, recipe) {
          if (err) throw err;
          if(recipe.length == 0){
            res.status(404).send({ error: "not found" });
          }else{
            res.status(200).send(recipe);
          }
        }
      );

  } catch (error){
    res.status(400).send({ error: error });
  }

});

// Update recipe by id
router.put("/api/recipes/id/:id", async (req, res) => {
  try {

    Connection.query(
      `  UPDATE recipe SET
        label = "`+req.body.label+`",
        description  ="`+req.body.description+`",
        serving =`+req.body.serving+`,
        level =`+req.body.level+`,
        calories = `+req.body.calories+`,
        preperationTime = `+req.body.preperationTime+`,
        categoryId = `+req.body.category+`
        WHERE
        id = `+req.params.id,
      function (err, recipe) {
        if (err) throw err;
        if(req.body.ingredients.length > 0){

          Connection.query(
            `DELETE FROM recipe_ingredients WHERE recipeId = `+req.params.id,
            function (err, result) {
              if (err) throw err;
            }
          );
          req.body.ingredients.forEach(ingredient => {
            Connection.query(
              `INSERT INTO recipe_ingredients(recipeId, ingredientId) VALUES (`+recipe.insertId+`,`+ingredient+`)`,
              function (err, result) {
                if (err) throw err;
              }
            );
          });
        }
        res.status(201).send();
        
      }
    );
  
  } catch (error){
  res.status(400).send({ error: error });
  }
  
});

//Add new recipe
router.post("/api/recipes", async (req, res) => {
try {

  Connection.query(
    `  INSERT INTO recipe(
      label,
      description,
      serving,
      level,
      calories,
      preperationTime,
      categoryId
  )
  VALUES(
    "`+req.body.label+`",
    "`+req.body.description+`",
    `+req.body.serving+`,
    `+req.body.level+`,
    `+req.body.calories+`,
    `+req.body.preperationTime+`,
    `+req.body.category+`

  )`,
    function (err, recipe) {
      if (err) throw err;
      if(req.body.ingredients.length > 0){
        req.body.ingredients.forEach(ingredient => {
          Connection.query(
            `INSERT INTO recipe_ingredients(recipeId, ingredientId) VALUES (`+recipe.insertId+`,`+ingredient+`)`,
            function (err, result) {
              if (err) throw err;
            }
          );
        });
      }
      res.status(201).send();
      
    }
  );

} catch (error){
res.status(400).send({ error: error });
}


});

// Delete one recipie by id  
router.delete("/api/recipes/id/:id", async (req, res) => {
  try {

    Connection.query(
      `DELETE FROM recipe WHERE id =`+req.params.id,
      function (err, recipe) {
        if (err) throw err;
          res.status(202).send();
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
});

// Get recipes by category id
router.get("/api/recipes/category/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    Connection.query(
      `SELECT
            r.id,
            r.label,
            r.description,
            r.serving,
            r.level,
            r.calories,
            r.preperationTime,
            c.label AS category,
            ri.ingredients AS ingredients,
            r.categoryId
        FROM
            recipe r,
            category c
        JOIN(
            SELECT ri.recipeId AS id,
                GROUP_CONCAT(i.label) AS ingredients
            FROM
                recipe_ingredients ri
            JOIN ingredient AS i
            ON
                i.id = ri.ingredientId
            GROUP BY
                ri.recipeId
        ) ri USING(id)
        WHERE
            r.categoryId = `+req.params.id,
      function (err, recipe) {
        if (err) throw err;
        if(recipe.length == 0){
          res.status(404).send({ error: "not found" });
        }else{
          res.status(200).send(recipe);
        }
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
});

module.exports = router;
