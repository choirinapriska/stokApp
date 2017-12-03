var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_kategori';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	 
	ar.get('SELECT * from '+tabel,res);
});

router.get('/get/:id', function(req, res, next) {
 
	var id = req.params.id;

	ar.get('SELECT * from '+tabel+' WHERE ID='+id,res);
});

router.post('/add', function (req,res,next) {

	var response = []; 
	var NameKategori = Object.values(req.body);
	
	if (NameKategori !== undefined) {
		NameKategori = NameKategori[0];
		
 		ar.insert('INSERT INTO `'+tabel+'`(`NamaKategori`) VALUES ("'+NameKategori+'")',res);
	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});

		res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
	    res.setHeader('Content-Type', 'application/json');  
	    
    	res.status(200).send(JSON.stringify(response));
	}
});

router.post('/update/:id', function (req,res,next) {
	
	var id = req.params.id, response = [];
	var NameKategori = Object.values(req.body);
 	
	if (NameKategori !== undefined) {
		NameKategori = NameKategori[0];

 		ar.insert('UPDATE `'+tabel+'` SET `NamaKategori`="'+NameKategori+'" WHERE ID='+id,res);	
	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});

		res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
	    res.setHeader('Content-Type', 'application/json');  
	    
    	res.status(200).send(JSON.stringify(response));
	}
});

router.get('/delete/:id', function (req,res,next) {
	
	var id = req.params.id, response = [];
 	console.log('DELETE FROM '+tabel+'  WHERE ID='+id);
	ar.insert('DELETE FROM '+tabel+'  WHERE ID='+id,res);
	
	
});


module.exports = router;
