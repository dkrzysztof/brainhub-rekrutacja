import { FormRules } from 'App/utils/interfaces/FormRules';

export const rulesMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		date: '${label} is not a valid date!'
	}
};

export const rulesForEditProfileForm: FormRules = {
	firstnameFieldRules: [
		{
			required: true
		}
	],
	lastnameFieldRules: [
		{
			required: true
		}
	],
	emailFieldRules: [
		{ required: true },
		{
			type: 'email'
		}
	],
	dateFieldRules: [
		{
			required: true
		},
		{
			type: 'date'
		}
	]
};
