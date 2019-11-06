import moment from "moment";
import { required, minLength, email } from "vuelidate/lib/validators";

// Custom validators

const multiple = (value) => !new RegExp(/([a-z])\1{2}/gi).exec(value);

const vowel = (value) => !!new RegExp(/[AEIOUY]/gi).exec(value);

const phoneRegex = (value) => {
	const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
	if (regex.test(value)) return true;
	return false;
};

const alphaSpaceOnly = (value) => {
	const regex = /^[a-zA-Z\s-]+$/i;
	if (regex.test(value)) return true;
	return false;
};

const isCardExpired = (value) => {
	if (moment(value, "MM/YY").isBefore(moment())) return false;
	return true;
};

const cardDateEntered = (value) => {
	if (!value) return false;
	const splitDate = value.split("/");
	if (splitDate[0].trim() === "null" || splitDate[1].trim() === "null") return false;
	return true;
};

const isValidEmail = (value) => {
	const matches = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g).exec(value);
	if (!matches) return false;
	return true;
};

const americanExpress = (value) => {
	const firstDigits = value.substr(0, 2);

	if (firstDigits === '34' || firstDigits === '37') {
		return false;
	}

	return true;
};

const contactValidations = {
	first_name: {
		minLength: minLength(2),
		alphaSpaceOnly,
		multiple,
		vowel,
		required,
	},
	last_name: {
		minLength: minLength(2),
		alphaSpaceOnly,
		multiple,
		vowel,
		required,
	},
	email: {
		email,
		required,
		isValidEmail
	},
	phone: {
		phoneRegex,
		required,
	},
	address_line1: {
		required,
		minLength: minLength(5),
	},
	city: {
		alphaSpaceOnly,
		minLength: minLength(3),
		required,
	},
	country: {
		required,
	},
	state: {
		required,
	},
	postal_code: {
		required,
		minLength: minLength(5),
	},
};

const paymentValidations = {
	zip_code: {
		required,
		minLength: minLength(5),
	},
	name_on_card: {
		minLength: minLength(2),
		multiple,
		required,
		vowel,
	},
	credit_card: {
		americanExpress,
		required,
		minLength: minLength(13),
	},
	expiry: {
		isCardExpired,
		cardDateEntered,
	},
};

const guestValidations = {
	guest_email: {
		email
	},
	guest_phone: {
		phoneRegex
	},
	guest_first_name: {
		minLength: minLength(2),
		alphaSpaceOnly,
		multiple,
		vowel,
	},
	guest_last_name: {
		minLength: minLength(2),
		alphaSpaceOnly,
		multiple,
		vowel,
	},
};

export default {
	contact: contactValidations,
	payment: paymentValidations,
	guest: guestValidations,
	postal_search: {
		required,
		minLength: minLength(5),
	},
};
