const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Apartment_type = new Schema(
    {
        name: {type: String, unique: true}, 
        price: {type: String},
        description: {type: String},
        slug: { type: String, slug: 'name', unique: true },
        image: {type: String},
    },
    { timestamps: true },
);

module.exports = mongoose.model('Apartment_type', Apartment_type);
