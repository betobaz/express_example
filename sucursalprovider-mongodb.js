var Mongodb = require('mongodb');
var Db = Mongodb.Db;
var Connection = Mongodb.Connection;
var Server = Mongodb.Server
var BSON = Mongodb.BSON
var ObjectID = Mongodb.ObjectID;

SucursalProvider = function(host, port){
	this.db = new Db('ComRap',new Server(host, port, {auto_reconnect: true}, {}));
	this.db.open(function(){});
};

SucursalProvider.prototype.getCollection = function(callback){
	this.db.collection('sucursal', function(error, sucursal_collection){
		if( error ) callback( error );
		else callback( null, sucursal_collection);
	});
};

SucursalProvider.prototype.findAll = function( callback ){
	this.getCollection(function( error, sucursal_collection){
		if( error ) callback(error);
		else{
			sucursal_collection.find().toArray(function(error, results){
				if(error) callback(error);
				else callback(null, results);
			});
		}
	});
};

SucursalProvider.prototype.findById = function( callback ){
	this.getCollection(function(error, sucursal_collection){
		if(error) callback(error)
		else{
			sucursal_collection.find({_id: sucursal_collection.db.bson_serializer.ObjectId.createFromHexString(id)},function(error, result){
				if( error ) callback(error);
				else callback(null, result);
			});
		}
	});
};

SucursalProvider.prototype.save = function(sucursales, callback){
	this.getCollection(function(error, sucursal_collection){
		if( error ) callback( error )
		else{
			if( typeof(sucursales.length) == "undefined")
				sucursales = [sucursales];
			for(var i = 0; i < sucursales.length; i++){
				sucursal = sucursales[i];
				sucursal.created_at = new Date();				
			}

			sucursal_collection.insert(sucursales, function(){
				callback(null, sucursales);
			});
		}
	});
};
exports.SucursalProvider = SucursalProvider;
