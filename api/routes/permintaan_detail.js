var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_detail_pr';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	ar.get('SELECT * from '+tabel+' as A'+
			' INNER JOIN tbl_pr as B ON A.ID_PR = B.ID '+
			' INNER JOIN tbl_barang as C ON A.ID_Barang = C.ID',res);
  
});

router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT * from '+tabel+' as A'+
			' INNER JOIN tbl_pr as B ON A.ID_PR = B.ID '+
			' INNER JOIN tbl_barang as C ON A.ID_Barang = C.ID'+ 
			'WHERE A.ID='+id,res);
  
});

router.get('/getPR/:id', function(req, res, next) {
	var id = req.params.id;

	ar.getID('SELECT A.ID_PR as ID,A.ID_Barang, B.Nama, Qty, Total from '+tabel+' as A'+
			' INNER JOIN tbl_barang as B ON A.ID_Barang = B.ID'+ 
			' WHERE A.ID_PR="'+id+'"',res);
  
});

router.post('/add', function (req,res,next) {
	var response = []; 
 	
	if (typeof req.body.ID_PR !== 'undefined'&&
		typeof req.body.ID_Barang !== 'undefined'&&
		typeof req.body.Qty !== 'undefined' &&
		typeof req.body.Total !== 'undefined') {

		var ID_PR = req.body.ID_PR;
		var ID_Barang = req.body.ID_Barang;
		var Qty = req.body.Qty;
		var Total = req.body.Total;

		
 		ar.insert('INSERT INTO `'+tabel+'`(`ID_PR`, `ID_Barang`, `Qty`, `Total`) VALUES ("'+ID_PR+'","'+ID_Barang+'",'+Qty+','+Total+')',res);
	
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
 	
	if (typeof req.body.ID_PR !== 'undefined'&&
		typeof req.body.ID_Barang !== 'undefined'&&
		typeof req.body.Qty !== 'undefined' &&
		typeof req.body.Total !== 'undefined') {

		var ID_PR = req.body.ID_PR;
		var ID_Barang = req.body.ID_Barang;
		var Qty = req.body.Qty;
		var Total = req.body.Total;

 		ar.insert('UPDATE `'+tabel+'` SET `ID_PR`="'+ID_PR+'", `ID_Barang` ="'+ID_Barang+'",`Qty` ='+Qty+',`Total` ='+Total+'  WHERE ID_PR="'+ID_PR+'" AND ID_Barang = "'+ID_Barang+'"',res);
	
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
