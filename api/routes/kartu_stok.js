var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_log_barang';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	ar.get('SELECT * FROM `'+tabel+'` as A INNER JOIN tbl_barang as B ON A.ID_Barang = B.ID ',res);
  
});

router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT * FROM `'+tabel+'` as A INNER JOIN tbl_barang as B ON A.ID_Barang = B.ID WHERE A.ID="'+id+'"',res);
  
});

router.post('/add', function (req,res,next) {
	var response = []; 
 	
	if (typeof req.body.ID !== 'undefined'&&
		typeof req.body.ID_Barang !== 'undefined'&&
		typeof req.body.Keterangan !== 'undefined'&&
		typeof req.body.Stok_Masuk !== 'undefined'&&
		typeof req.body.Stok_Keluar !== 'undefined'&&
		typeof req.body.Saldo !== 'undefined') {

		var ID 			= req.body.ID;
		var ID_Barang = req.body.ID_Barang;
		var Keterangan 		= req.body.Keterangan;
		var Alias 		= req.body.Alias;
		var Stok_Masuk 		= req.body.Stok_Masuk;
		var Stok_Keluar 		= req.body.Stok_Keluar;
		var Saldo 		= req.body.Saldo;
		

 		ar.get('INSERT INTO `'+tabel+'`(`ID`, `ID_Barang`, `Keterangan`, `Alias`, `Stok_Masuk`, `Stok_Keluar`,`Saldo`)'+ 
 				'VALUES ("'+ID+'",'+ID_Barang+',"'+Keterangan+'","'+Alias+'",'+Stok_Masuk+','+Stok_Keluar+','+Saldo+')',res);
	
	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
});

router.post('/update/:id', function (req,res,next) {
	var id = req.params.id, response = [];
 	
	if (typeof req.body.ID_Barang !== 'undefined'&&
		typeof req.body.Keterangan !== 'undefined'&&
		typeof req.body.Stok_Masuk !== 'undefined'&&
		typeof req.body.Stok_Keluar !== 'undefined' && 
		typeof req.body.Saldo !== 'undefined') {

		var ID_Barang = req.body.ID_Barang;
		var Keterangan 		= req.body.Keterangan;
		var Alias 		= req.body.Alias;
		var Stok_Masuk 		= req.body.Stok_Masuk;
		var Stok_Keluar 		= req.body.Stok_Keluar;
		var Saldo 		= req.body.Saldo;

 		ar.get('UPDATE `'+tabel+'` SET '+
 				'`ID_Barang`='+ID_Barang+',`Keterangan`="'+Keterangan+'",'+
 				'`Alias`="'+Alias+'",`Stok_Masuk`='+Stok_Masuk+',`Stok_Keluar`='+Stok_Keluar+', Saldo='+Saldo+''+
 				' WHERE ID="'+id+'"',res);
	
	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
});

router.get('/delete/:id', function (req,res,next) {
	var id = req.params.id, response = [];
 	
	ar.get('DELETE FROM '+tabel+'  WHERE ID="'+id+'"',res);
	
});


module.exports = router;
