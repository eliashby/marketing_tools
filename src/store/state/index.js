import keys from "../../config/keys.json";

export default {
	regionList: [],
	tags: {},
	eventsList: [],
	eventsError: false,
	infomercial: '',
	product_list: [],
	regSubmitted: false,
	testing: true,
	captchaTest: false,
	// registration data
	registration: {
		address_line1: "",
		selected_event: "",
		city: "",
		country: "",
		email: "",
		first_name: "",
		event_name: "",
		guest_first_name: "",
		guest_last_name: "",
		guest_email: "",
		guest_phone: "",
		last_name: "",
		lead_code: "",
		phone: "",
		postal_code: "",
		state: "",
		vendor_token: keys.vendor_token,
		vendor_key: keys.vendor_key,
		tags: {
			attending_with_guest: false,
			lp_variation: "",
			trigger: "",
		},
	},
	event_options: {
		filters: {
			nearby: {
				address: "",
				radius_miles: "80"
			},
			days_from_now: 120,
			registration_closed: 0,
			event_type: "preview",
			market_groups: undefined,
			speaker_names: '',
			event_ids: [],
		},
		vendor_token: keys.vendor_token,
		api_token: keys.vendor_key
	},
	links_meta_data: {
		title: "",
		disclaimers: {
			privacy: "",
			terms: "",
		}
	},
	order_options: {
		payment: {
			credit_card: "",
			expiry: null,
			name_on_card: "",
			zip_code: "",
			merchant_account_id: keys.merchant_account_id,
		},
		price_list_id: "",
		products: null,
		registration_id: "",
		api_token: "",
	},
};
