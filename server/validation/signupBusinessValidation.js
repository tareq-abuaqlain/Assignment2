const { object, string } = require('yup');

const signupBusinessValidation = object().shape({
  first_name: string().required()
    .matches(/^[A-Z]/, 'First name in business account must start with a capital letter'),
  last_name: string().required()
    .matches(/^[A-Z]/, 'Last name in business account must start with a capital letter'),
  email: string().email().required(),
  password: string().required()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .matches(/\d/, 'Password must contain at least 1 number')
    .matches(/[!@#$%^&]/, 'Password must contain at least 1 special character'),
  confirm_password: string().required(),
  phone_number: string().required(),
  birthday: string(),
  gender: string(),
  address: string().required(),
  company_name: string().required(),

});

module.exports = signupBusinessValidation;
