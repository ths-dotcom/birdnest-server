const aparmentsRouter = require('./aparments');
const usersRouter = require('./users');
const adminsRouter = require('./admins');
const authRouter = require('./auth');

const ErrorController = require('../app/controllers/ErrorController');
const createHttpError = require('http-errors');

function route(app) {
    app.use('/api/auth-token', authRouter);
    app.use('/api/apartments', aparmentsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/admins', adminsRouter);

    // xử lí khi route không lọt vào các routes ở trên
    app.all('*', (req, res, next) => {
        // res.status(404).json({
        //     success: false,
        //     message: `Can't find ${req.originalUrl} on this server`
        // })

        let err = new Error("can't find !!!");
        err.status = 404;
        err.message = "không thấy :v";
        next(err);

        // next({
        //     status : 408,
        //     message : "không thấyyyy :v"
        // });

        // return next(createHttpError(405, 'httpError - không tìm thấy route này :))', {abc: false}));
    });


    // function 4 đối số => function chung xử lí các lỗi ở các controller
    // nhận tham số err ở đầu để biết lỗi
    app.use(ErrorController.index);
}

module.exports = route;