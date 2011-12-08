var sucursalCounter = 1;
SucursalProvider = function(){};
SucursalProvider.prototype.dummyData = [];

SucursalProvider.prototype.findAll = function(callback){
	callback(null, this.dummyData);
};

SucursalProvider.prototype.findById = function(id, callback){
	var result = null;
	for(var i = 0; i < this.dummyData.length; i++){
		if(this.dummyData[i]._id == id){
			retult = this.dummyData[i];
			break;
		}
	}
	callback(null, result);
};

SucursalProvider.prototype.save = function(sucursales, callback){
	var sucursal = null;

	if(typeof(sucursales.length) == "undefined")
		sucursales = [sucursales];

	for(var i = 0; i < sucursales.length; i++){
		sucursal = sucursales[i];
		sucursal._id = sucursalCounter++;
		sucursal.created_at = new Date();

		
		this.dummyData[this.dummyData.length] = sucursal;
	}
	
	callback(null, sucursales);	
};

new SucursalProvider().save([
	{numero: 1, direccion: 'Calle real'},
	{numero: 2, direccion: 'Censos'},
	{numero: 3, direccion: 'Ciudad mendoza'},
	{numero: 4, direccion: 'Ixtazoquitlan'},
	{numero: 5, direccion: 'Cordoba'}
], function(error, sucursales){});

exports.SucursalProvider = SucursalProvider;


