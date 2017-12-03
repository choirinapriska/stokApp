var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_barang';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	ar.get('SELECT A.ID,A.Nama,B.NamaKategori as Kategori,Harga, Stok,Satuan, A.DateAdd, A.DateUpd  FROM `'+tabel+'` as A INNER JOIN tbl_kategori as B ON A.ID_Kategori = B.ID ',res);
});

router.get('/getInput', function(req, res, next) {	
	ar.get('SELECT A.ID,A.Nama,Harga, Stok, Satuan  FROM `'+tabel+'` as A INNER JOIN tbl_kategori as B ON A.ID_Kategori = B.ID ',res);
});

router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;

	ar.getID('SELECT * FROM `'+tabel+'` as A INNER JOIN tbl_kategori as B ON A.ID_Kategori = B.ID WHERE A.ID="'+id+'"',res);
  
});

router.post('/add', function (req,res,next) {
	var response = []; 
 	console.log(req.body);
	if (typeof req.body.ID !== 'undefined'&&
		typeof req.body.ID_Kategori !== 'undefined'&&
		typeof req.body.Nama !== 'undefined'&&
		typeof req.body.Harga !== 'undefined'&&
		typeof req.body.Satuan !== 'undefined') {

		var ID 			= req.body.ID;
		var ID_Kategori = req.body.ID_Kategori;
		var Nama 		= req.body.Nama;
		var Alias 		= req.body.Alias;
		var Harga 		= req.body.Harga;
		var Satuan 		= req.body.Satuan;
		

 		ar.insert('INSERT INTO `'+tabel+'`(`ID`, `ID_Kategori`, `Nama`, `Alias`, `Harga`, `Satuan`)'+ 
 				'VALUES ("'+ID+'",'+ID_Kategori+',"'+Nama+'","'+Alias+'",'+Harga+',"'+Satuan+'")',res);
	
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
 	
	if (typeof req.body.ID_Kategori !== 'undefined'&&
		typeof req.body.Nama !== 'undefined'&&
		typeof req.body.Harga !== 'undefined'&&
		typeof req.body.Satuan !== 'undefined') {

		var ID_Kategori = req.body.ID_Kategori;
		var Nama 		= req.body.Nama;
		var Alias 		= req.body.Alias;
		var Harga 		= req.body.Harga;
		var Satuan 		= req.body.Satuan;

 		ar.insert('UPDATE `'+tabel+'` SET '+
 				'`ID_Kategori`='+ID_Kategori+',`Nama`="'+Nama+'",'+
 				'`Alias`="'+Alias+'",`Harga`='+Harga+',`Satuan`="'+Satuan+'"'+
 				'WHERE ID="'+id+'"',res);
	
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
 	
	ar.get('DELETE FROM '+tabel+'  WHERE ID="'+id+'"',res);
	
});


module.exports = router;
