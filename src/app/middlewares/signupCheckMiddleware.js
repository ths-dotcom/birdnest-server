const User = require('../models/User');
const Admin = require('../models/Admin');

function signupCheck(req, res, next) {
    if(!req.body.data) return res.status(400).json({
        success: false
    })
    Promise.all([User.findOne({email: req.body.data.email}).lean(),
        Admin.findOne({email: req.body.data.email}).lean()])
        .then(([user, admin]) => {
            if(user || admin) return res.json({
                success: false,
                message: 'Email đã được đăng kí'
            }) 
            next();
        })
        .catch(err => res.json({
            success: false,
            err
        }))
}

module.exports = signupCheck;