import axios from "axios";
import keys from "../../config/keys.json";
import snippets from "../../lib/helpers/snippets";

// determine which application needs to load based on application type
function appInit(dispatch, application, settings) {
	switch (application.toLowerCase()) {
		case "upgrade": return dispatch("upgradeInit", settings);
		case "registration": return dispatch("regInit", settings);
		case "thankyou":return;
		case "confirmation": return;
	}
}

function updateTrigger(commit, tags) {
	if (tags.trigger) {
		commit('updateState', { parameter: 'registration.tags.trigger', value: tags.trigger });
	}
}

export default {
	getSrcFile: ({ commit, dispatch }, payload) => {
		return new Promise((resolve, reject) => {
			let sourceVariable = null;

			if (document.getElementById('vue-wrapper') !== null && localStorage !== null) {
				if (document.getElementById("vue-wrapper").dataset.source !== undefined) {
					sourceVariable = document.getElementById("vue-wrapper").dataset.source;
					localStorage.setItem("f_uid", sourceVariable);
				}
				if (document.getElementById("vue-wrapper").dataset.src !== undefined) {
					sourceVariable = document.getElementById("vue-wrapper").dataset.src;
					localStorage.setItem("f_uid", sourceVariable);
				}
			}

			if (sourceVariable !== null && sourceVariable !== '') {
				return axios
					.get("https://insta-settings.responsewebops.com/settings_files/" + sourceVariable + ".json")
					.then((response) => {
						const file = response.data.steps;
						const pathName = payload.slice(-1) === '/' ? payload.slice(0, -1) : payload;

						if (response.data.infomercial) {
							commit("updateState", { parameter: "infomercial", value: response.data.infomercial });
						}

						if (response.data.captchaTest) {
							commit("updateState", { parameter: "captchaTest", value: response.data.captchaTest });
						}

						const lead_code = snippets.getURLParameter("lc");
						const lp_variation = snippets.getVariation();

						commit("updateState", { parameter: "registration.lead_code", value: lead_code });
						commit("updateState", { parameter: "registration.tags.lp_variation", value: lp_variation });

						for (let i = 0; i < file.length; i++) {
							const fileSlash = file[i].pathname.slice(-1) === '/' ? file[i].pathname.slice(0, -1) : file[i].pathname;
							if (pathName === fileSlash) {
								resolve(file[i].application);
								commit("updateSettings", file[i].settings);
								appInit(dispatch, file[i].category, file[i]);
							}
						}
						reject(new Error(`Application load path - '${payload}' was not found in source file '${sourceVariable}'`));
					})
					.catch((error) => reject(new Error(`Source file: '${sourceVariable}' not found, error ${error}`)));
			}
		});
	},
	upgradeInit: ({ commit, dispatch, state }, payload) => {
		let registration = localStorage.getItem("registration") ? JSON.parse(localStorage.getItem("registration")) : false;
		
		if (payload.settings.tags.trigger) {
			updateTrigger(commit, payload.settings.tags);
		}

		// If registration is falsy, look for URL data
		if (!registration) {
			const event = snippets.getURLParameter("eid");
			registration = {
				registration_id: snippets.getURLParameter("utm_source"),
				first_name: snippets.getURLParameter("first"),
				last_name: snippets.getURLParameter("last"),
				qr_url: snippets.getURLParameter("qr"),
			};

			dispatch("searchSingleEvent", event); // get event information
		}
		// update registration with any mounted tags
		if (Object.keys(state.tags.mounted).length !== 0 && state.tags.mounted.constructor === Object) {
			dispatch("updateRegistration", { registration_id: registration.registration_id, tags: state.tags.mounted });
		}

		commit("updateState", { parameter: "registration", value: registration });
		commit("updateState", { parameter: "order_options.registration_id", value: registration.registration_id });
	},
	isTesting: ({ commit, state }) => {
		const testing = snippets.globalTesting();
		const order_api_token = testing ? keys.order_api_token.staging : keys.order_api_token.production;

		if (state.registration.tags.trigger === '') {
			const trigger = testing ? keys.trigger.staging : keys.trigger.production;
			commit("updateState", { parameter: "registration.tags.trigger", value: trigger });
		}
		
		commit("updateState", { parameter: "testing", value: testing });
		commit("updateState", { parameter: "order_options.api_token", value: order_api_token });
	},
	regInit: ({ commit, dispatch, state }, payload) => {
		commit('updateState', { parameter: 'registration.media_type_code', value: snippets.getMediaTypeCode() });

		if (payload.settings.tags.trigger) {
			updateTrigger(commit, payload.settings.tags);
		}

		if (payload.settings.event_options.filters.market_groups) {
			commit("updateState", {
				parameter: "event_options.filters.market_groups",
				value: payload.settings.event_options.filters.market_groups
			});
		} else if (snippets.getURLParameter('mg')) {
			commit("updateState", {
				parameter: "event_options.filters.market_groups",
				value: snippets.getURLParameter('mg').split('+')
			});
		}

		if (payload.settings.event_options.filters.event_ids) {
			commit("updateState", { 
				parameter: "event_options.filters.event_ids",
				value: payload.settings.event_options.filters.event_ids
			});
		} else if (snippets.getURLParameter('eid')) {
			commit("updateState", { 
				parameter: "event_options.filters.event_ids",
				value: [snippets.getURLParameter('eid')]
			});
		}

		if (state.event_options.filters.event_ids.length > 0) {
			return dispatch('searchEventList');
		} else if (state.event_options.filters.market_groups) {
			return dispatch('searchEvents', {
				days_from_now: state.event_options.filters.days_from_now,
				registration_closed: state.event_options.filters.registration_closed,
				event_type: state.event_options.filters.event_type,
				market_groups: state.event_options.filters.market_groups,
				speaker_names: state.event_options.filters.speaker_names
			});
		} else if (snippets.getAddress("postal")) {
			return dispatch('searchEvents', {
				nearby: {
					address: snippets.getAddress("postal"),
					radius_miles: state.event_options.filters.nearby.radius_miles
				},
				days_from_now: state.event_options.filters.days_from_now,
				registration_closed: state.event_options.filters.registration_closed,
				event_type: state.event_options.filters.event_type,
				speaker_names: state.event_options.filters.speaker_names
			});
		}
	},
	getRegionList: ({ commit, state }) => {
		const url = snippets.getURL(state.testing, "geo", "/country/" + state.registration.country + "/regions");
		axios
			.get(url)
			.then((response) => {
				const options = [{ value: "", text: "" }];

				for (let i = 0; i < response.data.length; i++) {
					const region = response.data[i];
					options.push({ value: region.code, text: region.name });
				}
				commit("updateState", { parameter: "regionList", value: options });
			})
			.catch((error) => {});
	},
};
