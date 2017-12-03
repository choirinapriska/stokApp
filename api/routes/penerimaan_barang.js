var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_bpb';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	ar.get('SELECT A.ID, B.Nama, A.DateAdd, A.DateUpd from '+tabel+' as A INNER JOIN tbl_gudang as B ON A.ID_Gudang = B.ID ',res);
  
});

router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT A.ID, A.ID_Gudang, A.DateAdd, A.DateUpd from '+tabel+' as A INNER JOIN tbl_gudang as B ON A.ID_Gudang = B.ID WHERE A.ID="'+id+'"',res);
  
});

router.get('/getView/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT A.ID, B.Nama, A.DateAdd, A.DateUpd from '+tabel+' as A INNER JOIN tbl_gudang as B ON A.ID_Gudang = B.ID WHERE A.ID="'+id+'"',res);
  
});

router.post('/add', function (req,res,next) {
	var response = []; 
 	
	if (typeof req.body.ID !== 'undefined'&&
		typeof req.body.ID_Gudang !== 'undefined') {

		var ID = req.body.ID;
		var ID_Gudang = req.body.ID_Gudang;
		
 		ar.insert('INSERT INTO `'+tabel+'`(`ID`, `ID_Gudang`) VALUES ("'+ID+'","'+ID_Gudang+'")',res);
	
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
 	
	if (typeof req.body.ID !== 'undefined'&&
		typeof req.body.ID_Gudang !== 'undefined') {

		var ID = req.body.ID;
		var ID_Gudang = req.body.ID_Gudang;

 		ar.insert('UPDATE `'+tabel+'` SET `ID_Gudang`="'+ID_Gudang+'" WHERE ID="'+id+'"',res);
	
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
 	
	ar.get('DELETE FROM '+tabel+'  WHERE ID='+id,res);
	
});


module.exports = router;
