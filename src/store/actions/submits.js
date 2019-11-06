// modules
import axios from "axios";
import snippets from "../../lib/helpers/snippets";

export default {
  submitRegistration: ({
    commit,
    state,
    dispatch
  }) => {
    return new Promise((resolve, reject) => {
      const data = state.registration;
      const infomercial = state.infomercial;
      const registrant = {};

      for (var key of Object.keys(data)) {
        if (data[key] !== '' && data[key] !== undefined && key !== 'selected_event') {
          registrant[key] = data[key];
        }
      }

      if (infomercial === true) {
        registrant.media_type_code = 'INFO';
      }

      // merge application tags with tags from settings file
      registrant.tags = Object.assign({}, data.tags, state.tags.submit);

      if (registrant.state === 'UT' && state.testing === false && state.registration.first_name.toLowerCase() !== 'response') {
        resolve(false);
      } else {
        axios({
            url: snippets.getURL(state.testing, "registration", "/new"),
            method: "POST",
            contentType: "application/json",
            data: registrant,
          })
          .then((response) => {
            const selectedProduct = state.order_options.products;

            if (response.data.errors && response.data.errors[0].message != "Duplicate Registration") {
              return reject(new Error(response.data.errors[0].message));
            }

            // set any necessary data before storing into local storage
            data.registration_id = response.data.registration_id;
            data.qr_url = response.data.qr_url;

            if (localStorage !== null) {
              localStorage.setItem("registration", JSON.stringify(data));
            }

            commit("updateState", {
              parameter: "order_options.registration_id",
              value: response.data.registration_id
            });

            if (selectedProduct && selectedProduct[0].ProductId !== "free") {
              dispatch("submitOrder").catch((response) => reject(new Error(response)));
            } else {
              window.location.href = state.redirectPaths.submit;
            }
          })
          .catch((error) => {
            reject(new Error(error.message));
          });
        }
      });
  },
  submitOrder: ({
    state,
    dispatch
  }) => {
    return new Promise((resolve, reject) => {
      axios({
          url: snippets.getURL(state.testing, "orders", "/create"),
          method: "POST",
          contentType: "application/json",
          data: {
            api_token: state.order_options.api_token,
            payment: state.order_options.payment,
            price_list_id: state.order_options.price_list_id,
            products: [{
              product_id: state.order_options.products[0].ProductId.toUpperCase(),
              quantity: state.order_options.products[0].quantity,
              price: state.order_options.products[0].Amount,
            }, ],
            registration_id: state.order_options.registration_id,
          },
        })
        .then((response) => {
          const tags = {
            paid_order: `${state.order_options.products[0].trigger}-Qty${state.order_options.products[0].quantity ||
							1}`
          };
          const updatedTags = Object.assign({}, tags, state.tags.order);

          return dispatch("updateRegistration", {
            registration_id: state.order_options.registration_id,
            tags: updatedTags,
          });
        })
        .then(() => window.location.href = state.redirectPaths.order)
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  },
  updateRegistration: ({
    state
  }, payload) => {
    return new Promise((resolve, reject) => {
      if (
				Object.keys(payload.tags).length !== 0 
				&& payload.tags.constructor === Object
				&& payload.registration_id 
				&& payload.registration_id.length > 0
			) {
        axios({
            url: snippets.getURL(state.testing, "registration", "/update"),
            method: "POST",
            contentType: "application/json",
            data: {
              vendor_token: state.registration.vendor_token,
              vendor_key: state.registration.vendor_key,
              registration_id: payload.registration_id,
              tags: payload.tags,
            },
          })
          .then((response) => {
            const errors = response.data.errors;
            resolve(response.data);
          })
          .catch((error) => {
            reject(new Error(error));
          });
      }
    });
  },
  retrieveRegistration: ({
    state
  }, payload) => {
    return new Promise((resolve, reject) => {
      if (payload.length > 0) {
        axios({
            url: snippets.getURL(state.testing, "registration", `/${payload}`),
            method: "GET",
            contentType: "application/json",
            params: {
              vendor_token: state.registration.vendor_token,
              vendor_key: state.registration.vendor_key
            }
          })
          .then((response) => {
            const errors = response.data.errors;
            if (errors) {
              reject(new Error('Could not get registration'));
            } else {
              resolve({ registration_id: response.data.registration.id, name: response.data.contact.first_name });
            }
          })
          .catch((error) => {
            reject(new Error(error));
          });
      }
    });
  }
};
