const {StatusCodes}=require('http-status-codes');
const {UserService}=require('../services');
const {ErrorResponce,SuccessResponce}=require('../utils/common')


/**
 * POST: /signup
 * req-body {email:'abc@d.com,password:'1234'}
 */
async function create(req,res){
    try {
        const user= await UserService.create({
            email:req.body.email,
            password:req.body.password
        });
        console.log("inside-controller",user)
        SuccessResponce.data=user;
        return res.status(StatusCodes.CREATED).json({SuccessResponce})
        
    } catch (error) {
        ErrorResponce.error=error;
        console.log(error)
        return res.status(error.statusCode).json({ErrorResponce});
    }
}

async function signin(req, res) {
    console.log("inside-controller just starting")
    try {
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password
        });
        console.log("inside-controller at the end")
        SuccessResponce.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponce);
    } catch(error) {
        console.log(error);
        ErrorResponce.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponce);
    }
}

module.exports={
    create,
    signin
}
