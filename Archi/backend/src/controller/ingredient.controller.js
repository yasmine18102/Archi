const router = require("express").Router();
const Connection = require("../utils/db.config").Connection;



// Get all categories 
router.get("/api/ingredients", async (req, res) => {
  try {
    Connection.query(
      `SELECT * FROM ingredient`,
      function (err, ingredient) {
        if (err) throw err;
        if(ingredient.length == 0){
          res.status(204).send({ error: "no result" });
        }else{
          res.status(200).send(ingredient);
        }
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
});


// Get ingredient by id 
router.get("/api/ingredients/id/:id", async (req, res) => {
  try {
    Connection.query(
      `SELECT * FROM ingredient WHERE id =`+req.params.id,
      function (err, ingredient) {
        if (err) throw err;
        if(ingredient.length == 0){
          res.status(204).send({ error: "no result" });
        }else{
          res.status(200).send(ingredient);
        }
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
});


// Update ingredient by id 
router.put("/api/ingredients/id/:id", async (req, res) => {
  try {
    Connection.query(
      `UPDATE ingredient SET label=`+req.body.label+` WHERE id=`+req.params.id,
      function (err, ingredient) {
        if (err) throw err;
        if(ingredient.length == 0){
          res.status(204).send({ error: "not found" });
        }else{
          res.status(202).send();
        }
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
});

//Add new ingredient
router.post("/api/ingredients", async (req, res) => {
  try {
    Connection.query(
      `INSERT INTO ingredient (label) VALUES('`+req.body.label+`')`,
      function (err, ingredient) {
        if (err) throw err;
          res.status(201).send();
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
  });

// Delete one recipie by id 
router.delete("/api/ingredients/id/:id", async (req, res) => {
  try {
    Connection.query(
      `DELETE FROM ingredient WHERE id =`+req.params.id,
      function (err, ingredient) {
        if (err) throw err;
        if(ingredient.length == 0){
          res.status(204).send({ error: "no result" });
        }else{
          res.status(202).send();
        }
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
});

module.exports = router;
