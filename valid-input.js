import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};
	if(validator.isEmpty(data.sex)) {
		errors.sex = 'Sex is required';
	}
    if(validator.isEmpty(data.name)) {
		errors.name = 'Name is required';
	}
    if(validator.isEmpty(data.email)) {
		errors.email = 'Email is required';
	}
	if(!validator.isEmail(data.email)) {
		errors.email = 'Email is not valid';
	}
    if(validator.isEmpty(data.username)) {
		errors.username = 'Username is required';
	}
	if(validator.isEmpty(data.password)) {
		errors.password = 'Password is required';
	}
	if(validator.isEmpty(data.mobile)) {
		errors.mobile = 'Mobile is required';
	}
	if(!validator.isNumeric(data.mobile)) {
		errors.mobile = 'Mobile no is not valid';
	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	}
}
