var mysql = require('mysql');


connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "recipes"
});


module.exports = {
    Connection: connection
  };