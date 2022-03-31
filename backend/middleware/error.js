const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error";

    // wrong or shorter mongodb id
    if(err.name=="CastError"){
        const message = `Request not valid / Resource not found. Invalid :${err.path}`;
        err = new ErrorHandler(message,400); 
    }
// mongoose.duplicate key error      when duplicate email is enetered

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message,400)
    }

    // wrong jwt error

    if(err.name ==="JsonWebTokenError"){
        const message = `JSON web token is invalid , please try again later.`
        err = new ErrorHandler(message,400)
    }

    //JWT expire error
    if(err.name==="TokenExpiredError"){
        const message = `JSON web token is expired, try again.`;
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        error:err.stack
    });
}