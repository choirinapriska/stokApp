// Basic Setup

var express  = require('express');
var http     = require('http');
var bodyParser = require('body-parser')


 
// Setup express
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.set('port', process.env.PORT || 5000);

// --- Route --
app.use('/barang', require('./routes/barang'));
app.use('/dapur', require('./routes/dapur'));
app.use('/departemen', require('./routes/departemen'));
app.use('/gudang', require('./routes/gudang'));
app.use('/kartu_stok', require('./routes/kartu_stok'));
app.use('/kategori', require('./routes/kategori'));
app.use('/pemakaian_barang', require('./routes/pemakaian_barang'));
app.use('/pemakaian_barang_detail', require('./routes/pemakaian_barang_detail'));
app.use('/penerimaan_barang', require('./routes/penerimaan_barang'));
app.use('/penerimaan_barang_detail', require('./routes/penerimaan_barang_detail'));
app.use('/permintaan', require('./routes/permintaan'));
app.use('/permintaan_detail', require('./routes/permintaan_detail'));
app.use('/pindah_gudang', require('./routes/pindah_gudang'));
app.use('/pindah_gudang_detail', require('./routes/pindah_gudang_detail'));
app.use('/purchase_order', require('./routes/purchase_order'));
app.use('/purchase_order_detail', require('./routes/purchase_order_detail'));
app.use('/supplier', require('./routes/supplier'));


http.createServer(function ( req, res, next ) {
    var headers = {};

    
    // // set header to handle the CORS
    // headers['Access-Control-Allow-Origin'] = 'http://localhost:'+app.get('port');
    // headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With';
    // headers['Access-Contrl-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS';
    // headers["Access-Control-Max-Age"] = '86400';
    res.writeHead(200, headers);

    if ( req.method === 'OPTIONS' ) {
        console.log('OPTIONS SUCCESS');
        res.end();
    }
    else {
        //other requests
    }
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});
