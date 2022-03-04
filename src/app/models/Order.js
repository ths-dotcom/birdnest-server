const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        cus_name: {type: String}, 
        cus_slug: {type: String},
        is_member: {type: Boolean, default: false},
        tel : {type: String},
        email: {type: String},
        apartment_name: {type: String},
        apartment_slug: {type: String},
        price: {type: Number},
        order_date: {type: Date, default: Date.now},
        check_in_date: {type: Date, default: null},
        return_date: {type: Date, default: null},
        status: {type: String, default: null},
    }
);

module.exports = mongoose.model('Order', Order);
