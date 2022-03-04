const { userRole } = require('../../configs/datas_roles/roles');

function userPermission(req, res, next) {
    // chưa đăng nhập
    if(!req.login) return res.json({
        success: false,
        message: 'Không được phép truy cập'
    })
    // không phải user, --không phải chính chủ 
    if(req.user.role !== userRole) {
        return res.json({
            success: false,
            message: 'Không được phép truy cập'
        })
    }
    next();
}

module.exports = userPermission;