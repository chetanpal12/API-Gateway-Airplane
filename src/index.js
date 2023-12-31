const express = require('express');
const { rateLimit } = require('express-rate-limit')
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { createProxyMiddleware } = require('http-proxy-middleware');
const role = require('./models/role');

const app = express();
const {User,Role}=require('./models')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 10, // Limit each IP to 3 requests per `window` (here, per 2 minutes)

})
app.use('/flightsService', createProxyMiddleware({ target: ServerConfig.FLIGHT_SERVICE,
	 changeOrigin: true,
	 pathRewrite: {'^/flightsService': '/',} // rewrite path
	}));  
app.use('/bookingService', createProxyMiddleware({ target: ServerConfig.FLIGHT_SERVICE,
	changeOrigin: true,
	pathRewrite: {'^/bookingService': '/',} // rewrite path
}));  
//app.use('/flightsService', createProxyMiddleware({ target: ServerConfig.BOOKING_SERVICE, changeOrigin: true }));
//app.use('/bookingService', createProxyMiddleware({ target: ServerConfig.BOOKING_SERVICE, changeOrigin: true }));
app.use(limiter)
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
