class ErrorController {
    index(err, req, res, next) {
        // console.log(err);
        err.status = err.status || 500;
        
        res.status(err.status).json({
            success: false,
            message: err.message, 
            err
        })
    }
}

module.exports = new ErrorController;