const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
// const userAvatar = '/img/users/user.png';
const userAvatar = 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png';

mongoose.plugin(slug);

const User = new Schema(
    {
        email: {type: String, required: true, unique: true}, 
        password: {type: String, required: true},
        username: {type:String, required: true},
        tel: {type: String, required: true},
        address: {type: String, required: true},
        slug_name: { type: String, slug: 'username', unique: true},
        role: {type: Number, required: true},
        avatar: {type: String, default: userAvatar}
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('User', User);
