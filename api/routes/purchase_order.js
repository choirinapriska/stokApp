var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_po';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	ar.get('SELECT A.ID, B.Nama, Term, DateAdd, DateUpd from '+tabel+' as A INNER JOIN tbl_supplier as B ON A.ID_Supplier = B.ID ',res);
  
});

router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT A.ID, B.Nama,A.ID_Supplier, Term from '+tabel+' as A INNER JOIN tbl_supplier as B ON A.ID_Supplier = B.ID WHERE A.ID="'+id+'"',res);
  
});

router.post('/add', function (req,res,next) {
	var response = []; 
 	
	if (typeof req.body.ID !== 'undefined'&&
		typeof req.body.ID_Supplier !== 'undefined'&&
		typeof req.body.Term !== 'undefined' ) {

		var ID = req.body.ID;
		var ID_Supplier = req.body.ID_Supplier;
		var Term = req.body.Term;
		
 		ar.insert('INSERT INTO `'+tabel+'`(`ID`, `ID_Supplier`, `Term`) VALUES ("'+ID+'","'+ID_Supplier+'","'+Term+'")',res);
	
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
 	
	if (typeof req.body.ID_Supplier !== 'undefined'&&
		typeof req.body.Term !== 'undefined' ) {

		var ID_Supplier = req.body.ID_Supplier;
		var Term = req.body.Term;
		
 
 		ar.insert('UPDATE `'+tabel+'` SET `ID_Supplier`="'+ID_Supplier+'", `Term` =  '+Term+' WHERE ID="'+id+'"',res);
	
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
