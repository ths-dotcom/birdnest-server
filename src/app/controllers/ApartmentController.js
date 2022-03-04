const Apartment = require('../models/Apartment');
const Apartment_type = require('../models/Apartment_type');
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const Order = require('../models/Order');

class ApartmentController {
    // [GET] /api/apartments
    showAll(req, res, next) {
        Apartment.find({}, {name:1, price:1, slug:1, images:1}).lean()
            .then(apartments => {
                res.json({
                    success: true,
                    apartments
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] /api/apartments/all-count
    allCount(req, res, next) {
        Apartment.find({}).count()
            .then(count => {
                res.json({
                    success: true,
                    count
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] /api/apartments/:slugName
    detail(req, res, next) {
        Apartment.findOne({slug: req.params.slugName}, {detail: 0}).lean()
            .then(apartment => {
                if(!apartment) return res.json({
                    success: false,
                    message: 'Phòng không tồn tại'
                })
                res.json({
                    success: true,
                    apartment
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] api/apartments/types
    types(req, res, next) {
        Apartment_type.find({}).lean()
            .then(apartment_types => {
                res.json({
                    success: true,
                    apartment_types
                })
            })
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // [GET] api/apartments/types/:slugName
    typeDetail(req, res, next) {
        Apartment_type.findOne({slug: req.params.slugName}).lean()
            .then(apartment_type => {
                if(!apartment_type) return res.json({
                    success: false,
                    message: 'Loại phòng không tồn tại'
                })
                res.json({
                    success: true,
                    apartment_type
                })
            })
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // [GET] api/apartments/types/:slugName
    apartmentsOfType(req, res, next) {
        Apartment.find({type_slug: req.params.slugName}, {name:1, price:1, slug:1, images:1}).lean()
            .then(apartments => {
                if(!apartments.length) return res.json({
                    success: false,
                    message: 'Loại phòng không tồn tại'
                })
                res.json({
                    success: true,
                    apartments
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] /api/apartments/:slugName/related-products/:slugType
    relatedProducts(req, res, next) {
        Apartment.find({slug: {$ne : req.params.slugName}, type_slug: req.params.slugType}, {name:1, price:1, slug:1, images:1}).lean()
            .then(apartments => {
                if(!apartments.length) return res.json({
                    success: false,
                    message: 'Không thấy sản phẩm tương tự'
                })
                res.json({
                    success: true,
                    apartments
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] /api/apartments/:slugName/get-feedbacks
    getFeedbacks(req, res, next) {
        Feedback.find({apartment_slug: req.params.slugName}).lean()
            .then(feedbacks => {
                res.json({
                    success: true,
                    feedbacks
                })
            })
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // [POST] /api/apartments/:slugName/add-feedback
    addFeedback(req, res, next) {
        if(req.login) {
            User.findOne({slug_name: req.user.slug}).lean()
                .then(user => {
                    const feedback = new Feedback({
                        apartment_slug: req.params.slugName, 
                        cus_slug: user.slug_name, 
                        cus_name: user.username, 
                        cus_avatar: user.avatar,
                        comment: req.body.data.comment
                    });
                    return feedback;
                })
                .then(feedback => {
                    feedback.save()
                        .then(() => {
                            res.json({
                                success: true,
                                message: 'Đã lưu phản hồi'
                            })
                        })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        err
                    })
                })
        }
        else res.json({
            success: false,
            message: 'Chưa đăng nhập'
        })
    }

    // [POST] /api/apartments/:slugName/save-order
    saveOrder(req, res, next) {
        if(req.login) {
            Promise.all([Apartment.findOne({slug: req.params.slugName}).lean(), 
                User.findOne({slug_name: req.user.slug}).lean()])
                .then(([apartment, user]) => {
                    const order = new Order({
                        cus_name: user.username, 
                        cus_slug: user.slug_name,
                        is_member: true,
                        tel : user.tel,
                        email: user.email,
                        apartment_name: apartment.name,
                        apartment_slug: apartment.slug,
                        price: apartment.price,
                    });
                    return order;
                })
                .then(order =>{
                    order.save()
                        .then(() => {
                            res.json({
                                success: true,
                                message: 'Đặt phòng thành công'
                            })
                        })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        err
                    })
                });
        }
        else {
            Apartment.findOne({slug: req.params.slugName}).lean()
                .then(apartment => {
                    const order = new Order({
                        cus_name: req.body.data.name, 
                        tel : req.body.data.tel,
                        email: req.body.data.email,
                        apartment_name: apartment.name,
                        apartment_slug: apartment.slug,
                        price: apartment.price,
                    });
                    order.save()
                        .then(() => {
                            res.json({
                                success: true,
                                message: 'Đặt phòng thành công'
                            })
                        })
                        .catch(err => res.status(500).json({
                            success: false,
                            err
                        }))
                })
                .catch(err => res.status(500).json({
                    success: false,
                    err
                }))
        }
    }

    // [GET] /api/apartments/sort/:value
    showAllSort(req, res, next) {
        Apartment.find({}).sort({price: req.params.value}).lean()
            .then(apartments => {
                res.json({
                    success: true,
                    apartments
                })
            })
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // [GET] /api/apartments/:slugName/check-order
    checkOrder(req, res, next) {
        Order.find({apartment_slug: req.params.slugName, status: 'confirmed'}).sort({order_date: 'desc'}).lean()
            .then(apartments => {
                if(!apartments.length) return res.json({
                    success: true,
                    available: true
                })
                let apartment = apartments[0];
                if(apartment.return_date) return res.json({
                    success: true,
                    available: true
                })
                res.json({
                    success: true,
                    available: false
                })
            })
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // // [POST] /api/apartments/add-new
    // addApartment(req, res, next) {
    //     const newApartment = new Apartment(req.body.data);
    //     newApartment.save()
    //         .then(() => {
    //             res.json({
    //                 success: true,
    //                 message: 'Thêm phòng mới thành công'
    //             })
    //         })
    //         .catch(err => res.status(500).json({
    //             success: false,
    //             err
    //         }))
    // }

    // [POST] /api/apartments/edit

    // [POST] /api/apartments/search
    search(req, res, next) {
        let searchName = req.body.data.search.trim();
        Apartment.find({name: {'$regex': searchName, '$options' : 'i'}}, 
            {name:1, price:1, slug:1, images:1}).lean()
            .then(apartments => {
                if(!apartments.length) return res.json({
                    success: false,
                    message: 'không tìm thấy'
                })
                res.json({
                    success: true,
                    apartments
                })
            })
            .catch(err => res.json({
                success: false,
                err
            }))
    }
}

module.exports = new ApartmentController;