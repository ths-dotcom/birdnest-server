const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const { aparment_detail } = require('../../configs/datas_roles/apartmentDetail');

mongoose.plugin(slug);

const Apartment = new Schema(
    {
        name: {type: String}, 
        area: {type: String},
        number_of_cus: {type:String},
        price: {type: Number},
        description: {type: String},
        slug: { type: String, slug: 'name', unique: true },
        ultilities_img : {type: String},
        images: {type: Array},
        type_slug: {type: String},
        detail: {type: String, default: aparment_detail},
        deleted: {type: String, default: false}
    },
    { timestamps: true },
);

module.exports = mongoose.model('Apartment', Apartment);
