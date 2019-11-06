<template>
  <div>
    <!-- Contact Information -->
    <Contact-Information :v="$v"/>

    <!-- Guest Information -->
    <div class="guest-wrapper" v-if="!selectedProduct">
      <div class="guest-toggle">
        <b-form-checkbox v-model="isGuestAttending" :value="true" :unchecked-value="false">
          <p>Yes, I would like to bring a guest!</p>
        </b-form-checkbox>
      </div>
      <Guest-Information v-if="isGuestAttending" :v="$v"/>
    </div>

    <Submit :isValid="$v.$invalid"></Submit>
  </div>
</template>

<script>
// Modules
import { mapState, mapGetters } from "vuex";
import _ from "lodash";
import validators from "../../lib/validators";

// Components
import ContactInformation from "./Contact-Information";
import GuestInformation from "./Guest-Information";
import Submit from "./Reg-Split-Submit";

export default {
  name: "Registration",
  data(){
    return {
      toggleGuest: false
    }
  },
  computed: {
    ...mapGetters(["selectedProduct"]),
    ...mapState({
      first_name: state => state.registration.first_name,
      last_name: state => state.registration.last_name,
      phone: state => state.registration.phone,
      email: state => state.registration.email,
      address_line1: state => state.registration.address_line1,
      city: state => state.registration.city,
      state: state => state.registration.state,
      country: state => state.registration.country,
      postal_code: state => state.registration.postal_code,
      guest_first_name: state => state.registration.guest_first_name,
      guest_last_name: state => state.registration.guest_last_name,
      guest_email: state => state.registration.guest_email,
      guest_phone: state => state.registration.guest_phone
    }),
    isGuestAttending: {
      get() {
        return this.$store.state.registration.tags.attending_with_guest;
      },
      set(input) {
        const obj = {
          parameter: "registration.tags.attending_with_guest",
          value: input
        };
        this.$store.commit("updateState", obj);
        if (!input) {
          this.$store.commit("updateState", {
            parameter: "registration.guest_first_name",
            value: ""
          });
          this.$store.commit("updateState", {
            parameter: "registration.guest_last_name",
            value: ""
          });
          this.$store.commit("updateState", {
            parameter: "registration.guest_email",
            value: ""
          });
          this.$store.commit("updateState", {
            parameter: "registration.guest_phone",
            value: ""
          });
        }
      }
    },
    getRoute() {
      return !this.selectedProduct ? "/events" : "/product";
    },
    getStep() {
      return this.selectedProduct ? "2" : "3";
    }
  },
  validations() {
    let baseValidations = {};
    baseValidations = _.merge(baseValidations, validators.contact);

    if (this.isGuestAttending) {
      baseValidations = _.merge(baseValidations, validators.guest);
    }

    return baseValidations;
  },
  components: { ContactInformation, GuestInformation, Submit }
};
</script>

<style>
.guest-btn {
    display: block;
    width: 100%;
    border: none;
    background: none;
    margin-bottom: 25px;
}

.guest-btn:hover,
.guest-btn:focus {
  cursor: pointer;
  color: #2378bf;
}

.guest-btn svg {
    max-width: 20px;
    vertical-align: middle;
    display: inline-block;
}
</style>