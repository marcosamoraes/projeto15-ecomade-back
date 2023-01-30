import Joi from 'joi';
import validator from './validator.js';

const updateMyAccountSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  address: {
    cep: Joi.string().required(),
    address: Joi.string().required(),
    number: Joi.string().required(),
    complement: Joi.optional(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  },
});

const validateUpdateMyAccountSchema = validator(updateMyAccountSchema);
export default validateUpdateMyAccountSchema;
