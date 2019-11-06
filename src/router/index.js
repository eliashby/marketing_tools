import Vue from "vue";
import Router from "vue-router";

// inlineRegAndPaymentRoutes
import PostalFinder from "../applications/forms/inline-registration-payment/Postal-Finder";
import IRPEvents from "../applications/forms/inline-registration-payment/Events";
import IRPRegistration from "../applications/forms/inline-registration-payment/Registration";
import Registration from '../applications/forms/registration_split_payment/Registration';
import Payment from '../components/form-sections/Payment-Step.vue';
import Product from "../applications/forms/inline-registration-payment/Product";

// Bus Tour
import BusTourEvents from '../applications/forms/bus-tour/Events';

// Presuade Guest
import PresuadeGuest from '../applications/forms/presuade_guest/Registration';

import upgradeProduct from "../applications/forms/upgrade/Product";
import upgradePayment from "../applications/forms/upgrade/Payment";

// Confirmation Pages
import controlConfirmation from '../applications/confirmations/ControlConfirmation';

// Registration Split Payment Test

Vue.use(Router);

const routes = new Router({
	routes: [
		{
			path: "/",
			components: {
				irp: PostalFinder,
				upgrade: upgradeProduct,
				registrationSplitPayment: PostalFinder,
				busTour: PostalFinder,
				presuadeGuest: PostalFinder
			},
		},
		{
			path: "/events",
			components: {
				irp: IRPEvents,
				registrationSplitPayment: IRPEvents,
				busTour: BusTourEvents,
				presuadeGuest: IRPEvents,
			},
		},
		{
			path: "/registration",
			components: {
				irp: IRPRegistration,
				registrationSplitPayment: Registration,
				busTour: IRPRegistration,
				presuadeGuest: PresuadeGuest
			},
		},
		{
			path: "/product",
			components: {
				irp: Product,
				registrationSplitPayment: Product,
				busTour: Product,
				presuadeGuest: Product
			}
		},
		{
			path: "/payment",
			components: {
				upgrade: upgradePayment,
				registrationSplitPayment: Payment
			}
		},
		{
			path: "*",
			redirect: "/"
		}
	]
});

const hasQueryParams = route => (!!Object.keys(route.query).length);

routes.beforeEach((to, from, next) => {
	if (!hasQueryParams(to) && hasQueryParams(from)) {
		return next({ name: to.name, query: from.query });
	}
	return next();
});

export default routes;
