const { adminRole } = require('../../configs/datas_roles/roles');

function adminPermission(req, res, next) {
    // chưa đăng nhập
    if(!req.login) return res.json({
        success: false,
        message: 'Không được phép truy cập'
    })
    // không phải admin, --không phải chính chủ(cần nghĩ thêm)
    if(req.user.role !== adminRole) return res.json({
        success: false,
        message: 'Không được phép truy cập'
    })
    next();
}

module.exports = adminPermission;