var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_supplier';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	ar.get('SELECT * from '+tabel,res);
  
});

router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;

	ar.getID('SELECT * from '+tabel+' WHERE ID="'+id+'"',res);
  
});

router.get('/getView/:id', function(req, res, next) {	
	var id = req.params.id;
	ar.get('SELECT * from '+tabel+' WHERE ID="'+id+'"',res);
  
});

router.post('/add', function (req,res,next) {
	var response = []; 
 	
	if (typeof req.body.ID !== 'undefined'&&
		typeof req.body.Nama !== 'undefined') {

		var ID = req.body.ID;
		var Nama = req.body.Nama;
		var Alamat = req.body.Alamat;
		var Telp = req.body.Telp;

 		ar.insert('INSERT INTO `'+tabel+'`(`ID`, `Nama`, `Alamat`, `Telp`) VALUES ("'+ID+'" ,"'+Nama+'","'+Alamat+'","'+Telp+'")',res);
	
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
 	
	if (typeof req.body.Nama !== 'undefined'&&
		typeof req.body.Alamat !== 'undefined') {

		var Nama = req.body.Nama;
		var Alamat = req.body.Alamat;
		var Telp = req.body.Telp;
		
 		ar.insert('UPDATE `'+tabel+'` SET `Nama`="'+Nama+'", Alamat="'+Alamat+'", `Telp`="'+Telp+'" WHERE ID="'+id+'"',res);
	
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
