const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
       type: Number,
       required: true
    },
     description: {
         type: String,
         required: true,
         trim: true
     },
     offer: { type: Number },
     productPictures: [
         { img: { type: String } }
     ],
     reviews: [
         {
             userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
             review: String
         }
     ],
     category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     updatedAt: Date,
},{ timestamps: true });

const Product = mongoose.model('Product', productSchema);


function validate(product){
    const schema = {
        name: Joi.string().required(),
        slug: Joi.string(),
        price: Joi.required(),
        quantity: Joi.required(),
        description: Joi.string().required(),
        offer: Joi.number(),
        productPictures: Joi.string(),
        reviews: Joi.string().allow('',null),
        category: Joi.string().allow('',null),
        createdBy: Joi.string().allow('',null),
        updatedAt: Joi.date()
    }
    return Joi.validate(product, schema)
}


exports.Product = Product;
exports.validate = validate;