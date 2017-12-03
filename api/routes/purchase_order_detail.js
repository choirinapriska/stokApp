var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_detail_po';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	ar.get('SELECT * from '+tabel+' as A'+
			' INNER JOIN tbl_po as B ON A.ID_PO = B.ID '+
			' INNER JOIN tbl_barang as C ON A.ID_Barang = C.ID',res);
  
});

router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT * from '+tabel+' as A'+
			' INNER JOIN tbl_po as B ON A.ID_PO = B.ID '+
			' INNER JOIN tbl_barang as C ON A.ID_Barang = C.ID'+ 
			'WHERE A.ID='+id,res);
  
});

router.get('/getPO/:id', function(req, res, next) {
	var id = req.params.id;

	ar.getID('SELECT * from '+tabel+' as A'+
			' INNER JOIN tbl_barang as C ON A.ID_Barang = C.ID'+ 
			' WHERE A.ID_PO="'+id+'"',res);
  
});

router.post('/add', function (req,res,next) {
	var response = []; 
 	
	if (typeof req.body.ID_PO !== 'undefined'&&
		typeof req.body.ID_Barang !== 'undefined'&&
		typeof req.body.Qty !== 'undefined' ) {

		var ID_PO = req.body.ID_PO;
		var ID_Barang = req.body.ID_Barang;
		var Qty = req.body.Qty;
		var UOM = req.body.UOM;
		var Disc = req.body.Disc;
		var Total = req.body.Total;

		
 		ar.insert('INSERT INTO `'+tabel+'`(`ID_PO`, `ID_Barang`, `Qty`,UOM,Disc, `Total`) VALUES ("'+ID_PO+'","'+ID_Barang+'",'+Qty+',"'+UOM+'",'+Disc+','+Total+')',res);
	
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
 	
		
	if (typeof req.body.ID_PO !== 'undefined'&&
		typeof req.body.ID_Barang !== 'undefined'&&
		typeof req.body.Qty !== 'undefined'  ) {

		var ID_PO = req.body.ID_PO;
		var ID_Barang = req.body.ID_Barang;
		var Qty = req.body.Qty;
		var UOM = req.body.UOM;
		var Disc = req.body.Disc;
		var Total = req.body.Total;

 		ar.insert('UPDATE `'+tabel+'` SET `ID_PO`="'+ID_PO+'", `ID_Barang` ="'+ID_Barang+'",`Qty` ='+Qty+',`Total` ='+Total+', UOM="'+UOM+'", Disc='+Disc+'  WHERE ID_PO="'+ID_PO+'" AND ID_Barang = "'+ID_Barang+'"',res);
	
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
