const proxy = require('http-proxy-middleware');
module.exports = function(app){
	app.use(proxy('/Api',{
		target:'http://www.cndesign.com',
		host:'www.cndesign.com',
		changeOrigin:true
	}));

	app.use(proxy('/API',{
		target:'http://www.cndesign.com',
		host:'www.cndesign.com',
		changeOrigin:true
	}));

	app.use(proxy('/ddd',{
		target:'http://10.2.157.108:8080',
		host:'10.2.157.108:8080',
		changeOrigin:true
	}));
}