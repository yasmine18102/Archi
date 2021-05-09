const router = require("express").Router();
const Connection = require("../utils/db.config").Connection;



// Get all categories 
router.get("/api/categories", async (req, res) => {
  try {
    Connection.query(
      `SELECT * FROM category`,
      function (err, category) {
        if (err) throw err;
        if(category.length == 0){
          res.status(204).send({ error: "no result" });
        }else{
          res.status(200).send(category);
        }
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
});


// Get category by id 
router.get("/api/categories/id/:id", async (req, res) => {
  try {
    Connection.query(
      `SELECT * FROM category WHERE id =`+req.params.id,
      function (err, category) {
        if (err) throw err;
        if(category.length == 0){
          res.status(204).send({ error: "no result" });
        }else{
          res.status(200).send(category);
        }
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
});


// Update category by id 
router.put("/api/categories/id/:id", async (req, res) => {
  try {
    Connection.query(
      `UPDATE category SET label=`+req.body.label+` WHERE id=`+req.params.id,
      function (err, category) {
        if (err) throw err;
          res.status(202).send();
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
});

//Add new category
router.post("/api/categories", async (req, res) => {
  try {
    Connection.query(
      `INSERT INTO category (label) VALUES('`+req.body.label+`')`,
      function (err, category) {
        if (err) throw err;
          res.status(201).send();
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
  });

// Delete one recipie by id 
router.delete("/api/categories/id/:id", async (req, res) => {
  try {
    Connection.query(
      `DELETE FROM category WHERE id =`+req.params.id,
      function (err, category) {
        if (err) throw err;
          res.status(202).send();
      }
    );

} catch (error){
  res.status(400).send({ error: error });
}
});

module.exports = router;
