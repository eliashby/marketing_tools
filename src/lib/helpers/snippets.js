import axios from "axios";

// Grab and parse URL for any specified parameters
function getURLParameter(urlParam) {
	const decodeURI = decodeURIComponent(window.location.search.substring(1));
	const uriVariables = decodeURI.split("&");

	for (let i = 0; i < uriVariables.length; i++) {
		const uriVariableName = uriVariables[i].split("=");
		if (uriVariableName[0].toLowerCase() === urlParam && uriVariableName[1] !== undefined) {
			return uriVariableName[1];
		}
	}
	return undefined;
}

// Grab the address for distance filtering
function getAddress() {
	const state = getURLParameter("state");
	const postal = getURLParameter("postal");
	let city = getURLParameter("city");

	if (postal !== undefined && postal) {
		return postal;
	} else if (city !== undefined && city && state !== undefined && state) {
		city = city.split("+").join(" ");
		return `${city}, ${state}`;
	}
	// must return empty string if postal or city isn't defined
	// otherwise an error will occur in event search success callback
	return "";
}

// Use host and href variables to determine if global_testing should be set to true or false
function globalTesting() {
	const testingParam = getURLParameter("testing");
	const host = document.location.hostname;
	const href = document.location.href;
	if (testingParam === "false") {
		return false;
	} else if (
		testingParam === "true" ||
		host === "review.evg.int" ||
		host === "127.0.0.1" ||
		host === "localhost" ||
		host === "page-preview.instapage.com" ||
		href.indexOf("pagedemo.co") > -1
	) {
		// eslint-disable-next-line no-console 
		console.warn("Form Is On Test Mode!!!");
		return true;
	}
	return false;
}

// Determine if staging or production api endpoints should be used
function getURL(isTesting, service, path) {
	if (isTesting) {
		switch (service) {
			case "priceList":
				return "https://staging-services.idbcore.com/crmtools/price_list" + path;
			case "orders":
				return "https://staging-orders.responsemg.com/orders" + path;
			case "registration":
				return "https://staging-leadsapi.idbcore.com/registration" + path;
			case "geo":
				return "https://staging-geo.idbcore.com" + path;
			case "registration":
				return "staging-leadsapi.idbcore.com/registration/" + path;
			default:
				return "https://staging-leadsapi.idbcore.com/event" + path;
		}
	} else {
		switch (service) {
			case "priceList":
				return "https://services.idbcore.com/crmtools/price_list" + path;
			case "orders":
				return "https://orders.responsemg.com/orders" + path;
			case "registration":
				return "https://leadsapi.idbcore.com/registration" + path;
			case "geo":
				return "https://geo.idbcore.com" + path;
			case "registration":
					return "leadsapi.idbcore.com/registration/" + path;
			default:
				return "https://leadsapi.idbcore.com/event" + path;
		}
	}
}

// Get the Instapage variation character
// If no variation exists or is undefined, default to using the url hostname + pathname
function getVariation() {
	const cookieDecode = decodeURIComponent(document.cookie).split(";");
	for (var i = 0; i < cookieDecode.length; i++) {
		if (cookieDecode[i].includes("instapage-variant")) {
			return (
				document.location.hostname + document.location.pathname + " VARIATION = " + cookieDecode[i].split("=")[1].trim()
			);
		}
	}
	return document.location.hostname + document.location.pathname;
}

function getMediaTypeCode() {
	const mediaTypeCode = getURLParameter('media');
	const mediaTypes = [
		'INFO',
		'IHO',
		'DM',
		'OB'
	]
	if (mediaTypeCode !== undefined) {
		if (mediaTypes.includes(mediaTypeCode.toUpperCase())) {
			return mediaTypeCode.toUpperCase();
		}
	}
	return 'IHO';
}

export default {
	getURLParameter,
	getAddress,
	globalTesting,
	getURL,
	getVariation,
	getMediaTypeCode
};
