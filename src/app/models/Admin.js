const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const adminAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeS24vd1aWp0qdNhA52CCnyn-lgQca9fA9ygJphKmvDyB3L3PdL7AbybKNb8jGcAzvLnU&usqp=CAU';

mongoose.plugin(slug);

const Admin = new Schema(
    {
        email: {type: String, required: true, unique: true}, 
        password: {type: String, required: true},
        username: {type:String, required: true},
        tel: {type: String, required: true},
        address: {type: String, required: true},
        slug_name: { type: String, slug: 'username', unique: true},
        role: {type: Number, required: true},
        avatar: {type: String, default: adminAvatar}
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('Admin', Admin);
