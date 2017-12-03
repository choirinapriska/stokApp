var express = require('express');
var router = express.Router();

var ActiveRecord = require('../lib/activerecord.js');
var ar = new ActiveRecord();

var tabel = 'tbl_detail_pindah_gudang';

/* GET home page. */
router.get('/get', function(req, res, next) {	
	ar.get('SELECT * from '+tabel+' as A'+
			' INNER JOIN tbl_pindah_gudang as C ON A.ID_PindahGudang = C.ID'+
			' INNER JOIN tbl_barang as C ON A.ID_Barang = C.ID',res);
  
});

router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT * from '+tabel+' as A'+
			' INNER JOIN tbl_barang as B ON A.ID_Barang = B.ID'+
			' WHERE A.ID_PindahGudang="'+id+'"',res);
  
});

router.get('/getView/:id', function(req, res, next) {
	var id = req.params.id;

	ar.get('SELECT B.Nama as Nama_Barang, A.Qty as Jumlah,Satuan, A.Keterangan as Nama , Keterangan  from '+tabel+' as A'+
			' INNER JOIN tbl_barang as B ON A.ID_Barang = B.ID'+ 
			' WHERE A.ID_PindahGudang="'+id+'"',res);
  
});

router.post('/add', function (req,res,next) {
	var response = []; 
 	
	if (typeof req.body.ID_PindahGudang !== 'undefined'&&
		typeof req.body.ID_Barang !== 'undefined' &&
		typeof req.body.Qty !== 'undefined' && 
		typeof req.body.Keterangan !== 'undefined' 
		) {

		var ID_PindahGudang = req.body.ID_PindahGudang;
		var ID_Barang = req.body.ID_Barang;
		var Qty = req.body.Qty;
		var Keterangan = req.body.Keterangan;

		
 		ar.insert('INSERT INTO `'+tabel+'`(`ID_PindahGudang`,  `ID_Barang`,Qty,Keterangan) VALUES ("'+ID_PindahGudang+'","'+ID_Barang+'",'+Qty+',"'+Keterangan+'")',res);
	
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
 	
	if (typeof req.body.ID_PindahGudang !== 'undefined'&&
		typeof req.body.ID_Barang !== 'undefined' &&
		typeof req.body.Qty !== 'undefined' && 
		typeof req.body.Keterangan !== 'undefined'
		) {

		var ID_PindahGudang = req.body.ID_PindahGudang;
		var ID_Barang = req.body.ID_Barang;
		var Qty = req.body.Qty;
		var Keterangan = req.body.Keterangan;

 		ar.insert('UPDATE `'+tabel+'` SET `ID_PindahGudang`="'+ID_PindahGudang+'", `ID_Barang` ="'+ID_Barang+'",`Qty` ='+Qty+', Keterangan="'+Keterangan+'"  WHERE ID_PindahGudang="'+ID_PindahGudang+'" AND ID_Barang = "'+ID_Barang+'"',res);
	
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
