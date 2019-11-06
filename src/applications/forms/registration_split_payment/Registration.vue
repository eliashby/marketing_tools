<template>
  <div>
    <Header :number="getStep" headerText="Your Contact Information" route="/events"></Header>
    <Selected-Event></Selected-Event>
    <Registration></Registration>
  </div>
</template>

<script>
// Modules
import { mapState, mapGetters } from "vuex";

// Components
import Header from "../../../components/displays/Header";
import SelectedEvent from "../../../components/displays/Selected-Event";
import Registration from "../../../components/form-sections/Registration";

export default {
  computed: {
    getRoute() { return !this.selectedProduct ? "/events" : "/product" },
    getStep() { return this.selectedProduct ? "2" : "3" }
  },
  components: { Registration, SelectedEvent, Header }
};
</script>
