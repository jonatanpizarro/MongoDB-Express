var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
	if (err) return console.log(err)
	 db = client.db("AppJuegos");
})



/* GET home page. */
router.get('/', (req, res) => {
	db.collection('juegos').find('nombre').toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {juegos: result});
  })
})


router.get('/crear', (req, res) => {
	var myobj = { nombre: "", edad: "", genero:"" };
	dbo.collection("juegos").insertOne(myobj, function((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('crear.ejs', {juegos: result});
  })
})

router.get('/eliminar', (req, res) => {
	var myquery = ;
  	dbo.collection("juegos").deleteOne(myquery, function((err, obj) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('eliminar.ejs');
  })
})

router.get('/editar', (req, res) => {
	var myquery = {  };
	var newvalues = { $set: {nombre:"" , edad: "", genero:"" } };
	dbo.collection("juegos").updateOne(myquery, newvalues,((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('editar.ejs', {juegos: result});
  })
})



module.exports = router;
