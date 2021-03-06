const mongoose = require('mongoose');
const Joi = require('joi');

const customersSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 30
  },
  phone: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 30
  }
});

const Customer = mongoose.model('Customer', customersSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(30).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(30).required()
  };
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
