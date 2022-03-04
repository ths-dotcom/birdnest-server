const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = new Schema(
    {
        apartment_slug: {type: String, required: true}, 
        cus_slug: {type: String, required: true}, 
        cus_name: {type: String, required: true}, 
        cus_avatar: {type: String, required: true},
        comment: {type: String, required: true},
        // point: {type: String, required: true}, 
        
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('Feedback', Feedback);
