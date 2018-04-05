var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
	  var dbo = db.db("AppJuegos");
	  var myquery = { nombre: 'CoD' };
	  dbo.collection("juegos").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
	    console.log(obj);
	    db.close();
  });
});