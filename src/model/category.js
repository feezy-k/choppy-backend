const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
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
    type: {
        type: String
    },
    categoryImage: {
        type: String,
    },
    parentId: {
        type: String
    }
},{ timestamps: true });

const Category = mongoose.model('Category', categorySchema);


function validate(category){
    const schema = {
        name: Joi.string().required(),
        slug: Joi.string(),
        type: Joi.string().allow('',null),
        categoryImage: Joi.string().allow('',null),
        parentId: Joi.string().allow('',null),
    }
    return Joi.validate(category, schema)
}


exports.Category = Category;
exports.validate = validate;
