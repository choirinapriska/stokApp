var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_pindah_gudang';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	ar.get('SELECT A.ID, ID_Gudang_Asal as Gudang_Asal, ID_GudangKirim as Gudang_Kirim,DateAdd, DateUpd from '+tabel+' as A  ',res);
  
});

router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT * from '+tabel+' as A  WHERE A.ID="'+id+'"',res);
  
});

router.get('/getView/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT * from '+tabel+' as A  WHERE A.ID="'+id+'"',res);
  
});

router.post('/add', function (req,res,next) {
	var response = []; 
 	
	if (typeof req.body.ID !== 'undefined'&&
		typeof req.body.ID_Gudang_Asal !== 'undefined'&&
		typeof req.body.ID_GudangKirim !== 'undefined') {

		var ID = req.body.ID;
		var ID_Gudang_Asal = req.body.ID_Gudang_Asal;
		var ID_GudangKirim = req.body.ID_GudangKirim;
		
 		ar.insert('INSERT INTO `'+tabel+'`(`ID`, `ID_Gudang_Asal`, `ID_GudangKirim`) VALUES ("'+ID+'","'+ID_Gudang_Asal+'","'+ID_GudangKirim+'")',res);
	
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
		typeof req.body.ID_Gudang_Asal !== 'undefined'&&
		typeof req.body.ID_GudangKirim !== 'undefined') {

		var ID = req.body.ID;
		var ID_Gudang_Asal = req.body.ID_Gudang_Asal;
		var ID_GudangKirim = req.body.ID_GudangKirim;

 		ar.insert('UPDATE `'+tabel+'` SET `ID_Gudang_Asal`="'+ID_Gudang_Asal+'", `ID_GudangKirim` = "'+ID_GudangKirim+'" WHERE ID="'+id+'"',res);
	
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
