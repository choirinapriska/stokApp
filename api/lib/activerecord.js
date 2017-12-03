class ActiveRecord{
	constructor(mysql) {
	    var mysql    = require('mysql')

		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'stok'
		});

		try {
			connection.connect();
			connection.query("SET NAMES 'utf8'");
			connection.query("SET CHARACTER SET utf8");
		} catch(e) {
			console.log('Database Connetion failed:' + e);
		}

		this.con = connection;
	}

	get(query,res){
		res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
	    res.setHeader('Content-Type', 'application/json');  

		this.con.query(query, function(err, rows, fields) {
	  		if (!err){
	  			var response = [];
				response.push({'result' : 'success'});

				if (rows.length != 0) {
					var header = Object.keys(rows[0]);
					var data = new Array(rows.length);
					
					for(var i = 0; i < rows.length; i++) {
					    var cube = rows[i];
 						data[i] = new Array(header.length);

					    for(var j = 0; j < header.length; j++) {
					    	data[i][j] = cube[header[j]];
					    }
					}

					response.push({'header' : header});				
					response.push({'data' : data});	
				} else {
					response.push({'msg' : 'No Result Found'});
				}

				
		    	res.status(200).send(JSON.stringify(response));
	  		} else {
			    res.status(400).send(err);
		  	}
		});
	}


	getID(query,res){
		res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
	    res.setHeader('Content-Type', 'application/json');  

		this.con.query(query, function(err, rows, fields) {
	  		if (!err){
	  			var response = [];
				response.push({'result' : 'success'});

				if (rows.length != 0) {
					
					response.push({'data' : rows});	
				} else {
					response.push({'msg' : 'No Result Found'});
				}

				
		    	res.status(200).send(JSON.stringify(response));
	  		} else {
			    res.status(400).send(err);
		  	}
		});
	}

	insert(query,res){
		var response = [];
  		
  		res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
	    res.setHeader('Content-Type', 'application/json');  
  				console.log(query);

		this.con.query(query, 
			function(err, result) {
		  		if (!err){
 
					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}
 					
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				    res.status(400).send(err);
			  	}
			});
	}

	
}


module.exports = ActiveRecord;