var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_pr';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	ar.get('SELECT A.ID as ID,B.Nama as Departemen, A.Total_Price, A.DateAdd, A.DateUpd from '+tabel+' as A INNER JOIN tbl_departemen as B ON A.ID_Departement = B.ID ',res);
  
});


router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT A.ID as ID,B.Nama as Departemen, A.Total_Price, A.ID_Departement from '+tabel+' as A INNER JOIN tbl_departemen as B ON A.ID_Departement = B.ID WHERE A.ID="'+id+'"',res);
  
});

router.post('/add', function (req,res,next) {
	var response = []; 
 	
	if (typeof req.body.ID !== 'undefined'&&
		typeof req.body.ID_Departement !== 'undefined'&&
		typeof req.body.Total !== 'undefined') {

		var ID = req.body.ID;
		var ID_Departement = req.body.ID_Departement;
		var Total = req.body.Total;

		
 		ar.insert('INSERT INTO `'+tabel+'`(`ID`, `ID_Departement`, `Total_Price`) VALUES ("'+ID+'","'+ID_Departement+'",'+Total+')',res);
	
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
		typeof req.body.ID_Departement !== 'undefined'&&
		typeof req.body.Total !== 'undefined') {

		var ID = req.body.ID;
		var ID_Departement = req.body.ID_Departement;
		var Total = req.body.Total;

 		ar.insert('UPDATE `'+tabel+'` SET `ID_Departement`="'+ID_Departement+'", `Total_Price` =  '+Total+' WHERE ID="'+id+'"',res);
	
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
