var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var dbname = "AppJuegos";





/* INDEX*/
router.get('/', (req, res) => {

  MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
  if (err) return console.log(err)
   var dbo = db.db(dbname);

     dbo.collection('juegos').find('nombre').toArray((err, result) => {
    if (err) return console.log(err)
      db.close();
      res.render('index.ejs', {juegos: result});
  })

})
 
})

///////////////////CREAR/////////////////////////////////7



router.get('/crear', (req, res) => {
    res.render('create.ejs');
  })


router.post('/crear', (req, res) => {

   MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
    if (err) return console.log(err)
      var dbo = db.db(dbname);
      var myobj = { nombre: req.body.nombre, edad: parseInt(req.body.edad), tipo:req.body.tipo };
      dbo.collection("juegos").insertOne(myobj, function(err, result)  {
      if (err) return console.log(err)
        db.close();
        res.redirect('/');
  })
})
  })



///////////////////ELIMINAR////////////////////////////////

router.get('/eliminar', (req, res) => {
    res.render('delete.ejs');
  })

router.post('/eliminar', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
    if (err) return console.log(err)
      var dbo = db.db(dbname);
      var myobj = { nombre: req.body.nombre};
      dbo.collection("juegos").deleteOne(myobj ,function(err, obj)  {
    if (err) return console.log(err)
      db.close();
      res.redirect('/');
  })
})
  })

///////////////EDITAR/////////////////////////////////



router.get('/editar', (req, res) => {
    res.render('edit.ejs');
  })
  

router.post('/editar', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
    if (err) return console.log(err)
      var dbo = db.db(dbname);
      var myquery = {nombre: req.body.nombre1 };
      var newvalues = { $set: { nombre: req.body.nombre, edad: parseInt(req.body.edad), tipo:req.body.tipo} };
      dbo.collection("juegos").updateOne(myquery, newvalues,(err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.redirect('/');
  })
})
  })



module.exports = router;
