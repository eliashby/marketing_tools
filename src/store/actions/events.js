// modules
import axios from "axios";
import moment from "moment";
import products from "../../config/products";
import snippets from "../../lib/helpers/snippets";
import keys from "../../config/keys.json";

// format event start date and time
// values can be reformatted when displayed
function setEventDate(event) {
	const splitStartDate = moment(event.start_date).format("dddd MMMM D @ h:mma ").split("@");
	const converted_date = splitStartDate[0].trim().split(" ");

	event.day_of_week = converted_date[0]; // e.g. Monday
	event.month = converted_date[1]; // e.g. January
	event.day_of_month = converted_date[2]; // e.g. 12
	event.converted_time = splitStartDate[1].trim(); // e.g. 5:00pm

	return event;
}

export default {
	searchEvents: ({ commit, state }, payload) => {
		const eventPayload = {
			filters: payload,
			vendor_token: keys.vendor_token,
			api_token: keys.vendor_key
		}

		axios({
			url: snippets.getURL(state.testing, "events", "/search"),
			method: "POST",
			contentType: "application/json",
			data: eventPayload,
		})
			.then((response) => {
				const eventsReturned = response.data.events;

				if (eventsReturned && eventsReturned.length) {
					const events = eventsReturned.map((event) => setEventDate(event));
					return commit("updateState", { parameter: "eventsList", value: events });
				}
				return commit("updateState", { parameter: "eventsList", value: [] });
			})
			.catch((error) => {
				// console.log(error);
			});
	},
	searchEventList: ({ commit, state }, payload) => {
		const eventIdList = state.event_options.filters.event_ids;
		let events = [];
		
		for (let i = 0; i < eventIdList.length; i++) {
			axios({
				url: snippets.getURL(state.testing, "events", "/get"),
				method: "GET",
				contentType: "application/json",
				params: {
					id: eventIdList[i],
					vendor_token: keys.vendor_token,
					vendor_key: keys.vendor_key
				},
			})
				.then((res) => {
					if (res.data.errors) {
						return ;
					}

					if (res.data.closed !== true) {
						setEventDate(res.data);
						events.push(res.data);
					}
				})
				.catch((error) => {});
		}

		commit("updateState", { parameter: "eventsList", value: events });
	},
	searchSingleEvent: ({ commit, state }, payload) => {
		axios({
			url: snippets.getURL(state.testing, "events", "/get"),
			method: "GET",
			contentType: "application/json",
			params: {
				id: payload,
				vendor_token: keys.vendor_token,
				vendor_key: keys.vendor_key
			},
		})
			.then((res) => {
				if (res.data.errors) {
					return ;
				}

				const event = setEventDate(res.data);

				return commit("updateState", { parameter: "registration.selected_event", value: event });
			})
			.catch((error) => {});
	},
	selectEvent: ({ commit, dispatch, state }, payload) => {
		return new Promise((resolve) => {
			const country = payload.country.toLowerCase() === "canada" ? "CAN" : payload.country;

			// clear any selected products from previously selected events
			commit("updateState", { parameter: "order_options.price_list_id", value: null });
			commit("updateState", { parameter: "order_options.products", value: null });
			commit("updateState", { parameter: "product_list", value: [] });

			// update registration with selected event information
			commit("updateState", { parameter: "registration.selected_event", value: payload });
			commit("updateState", { parameter: "registration.event_name", value: payload.tour_code });
			commit("updateState", { parameter: "registration.country", value: country });
			commit("updateState", { parameter: "registration.state", value: payload.state });

			// get regions that correspond with selected event's country
			dispatch("getRegionList");

			if (state.products && state.products.length > 0) {
				for (let i = 0; i < state.products.length; i++) {
					if (state.products[i].event_id.includes(payload.id)) {
						commit("updateState", { parameter: "product_list", value: state.products[i].product_list });
						commit("updateState", { parameter: "order_options.price_list_id", value: state.products[i].price_list_id });
						return resolve(true);
					}
				}
			} else {
				for (let i = 0; i < products.length; i++) {
					if (products[i].event_id.includes(payload.id)) {
						commit("updateState", { parameter: "product_list", value: products[i].product_list });
						commit("updateState", { parameter: "order_options.price_list_id", value: products[i].price_list_id });
						return resolve(true);
					}
				}
			}
			
			return resolve(false);
		});
	},
};
