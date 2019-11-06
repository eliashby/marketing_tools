// Vue Modules
import Vue from "vue";
import Vuelidate from "vuelidate";
import VueMask from "v-mask";
import BootstrapVue from "bootstrap-vue";

// Styling Modules
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "mapbox-gl/dist/mapbox-gl.css";

// V-Icon
import arrowLeft from "vue-icon";
import chevronRight from "vue-icon";
import lock from "vue-icon";
import plus from 'vue-icon';

// Routes & Store
import router from "./router";
import store from "./store";

// Vue Application
import VueApplication from "./App";

// Icons
Vue.use(arrowLeft, "v-icon");
Vue.use(chevronRight, "v-icon");
Vue.use(lock, "v-icon");
Vue.use(plus, 'v-icon');

// Vue Plugins
Vue.use(VueMask);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);

if (document.getElementById("vue-application") !== null) {
	new Vue({
		el: "#vue-application",
		store,
		router,
		components: { VueApplication },
		template: "<VueApplication />",
	});
}
