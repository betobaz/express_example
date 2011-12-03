
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , stylus = require('stylus');

var SucursalProvider = require('./sucursalprovider-memory').SucursalProvider;

var app = module.exports = express.createServer();

// Configuration

function compile(str, path){
  return stylus(str)
    //.import(__dirname + '/public/stylesheets/cruz-azul')
    .set('filename', path)
    .set('warn', true)
    .set('compress', true);
};

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public', compile: compile }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

var sucursalProvider = new SucursalProvider();

app.get('/cruz-azul', function(req, res){
	res.render('cruz-azul', {
		title: 'Cruz Azul'
	});
});

app.get('/sucursal', function(req, res){
	sucursalProvider.findAll(function(error, docs){








		res.render('sucursal/index',{
			title: 'Sucursales',
			sucursales: docs
		});	

	});
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
