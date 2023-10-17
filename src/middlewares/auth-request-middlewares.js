const { StatusCodes } = require('http-status-codes');

const { ErrorResponce } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { UserService } = require('../services');

function validateAuthRequest(req, res, next) {
    if(!req.body.email) {
        console.log("inside auth")
        console.log(ErrorResponce)
        ErrorResponce.message = 'Something went wrong while authenticating user';
        console.log( ErrorResponce.message)
        ErrorResponce.error = new AppError(['Email not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponce);
    }
    if(!req.body.password) {
        ErrorResponce.message = 'Something went wrong while authenticating user';
        ErrorResponce.error = new AppError(['password not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponce);
    }
    next();
}

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response) {
            req.user = response; // setting the user id in the req object
            next();
        }
    } catch(error) {
        return res
                .status(error.statusCode)
                .json(error);
    }

}

module.exports = {
    validateAuthRequest,
    checkAuth
}