<template>
  <div>
    <!-- Reg Form -->
    <div class="registration-inputs mb-4">
      <!-- full name -->
      <b-row>
        <!-- first -->
        <b-col sm="6">
          <block-input
            :type="'text'"
            :id="'registration-first_name'"
            :label="'first name'"
            :v="v.first_name"
          ></block-input>
        </b-col>
        <!-- last -->
        <b-col sm="6">
          <block-input
            :type="'text'"
            :id="'registration-last_name'"
            :label="'last name'"
            :v="v.last_name"
          ></block-input>
        </b-col>
      </b-row>

      <!-- phone -->
      <b-row>
        <b-col>
          <block-input
            :id="'registration-phone'"
            :type="'tel'"
            :label="'phone'"
            :v="v.phone"
            :mask="'(###) ###-####'"
          ></block-input>
        </b-col>
      </b-row>

      <!-- email -->
      <b-row>
        <b-col>
          <block-input :type="'email'" :id="'registration-email'" :label="'email'" :v="v.email"></block-input>
        </b-col>
      </b-row>

      <!-- address_line1 -->
      <b-row>
        <b-col>
          <block-input
            :id="'registration-address_line1'"
            :type="'text'"
            :label="'address'"
            :v="v.address_line1"
          ></block-input>
        </b-col>
      </b-row>

      <!-- city, state, postal_code -->
      <b-row>
        <!-- city -->
        <b-col sm="4">
          <block-input :type="'text'" :id="'registration-city'" :label="'city'" :v="v.city"></block-input>
        </b-col>

        <!-- state -->
        <b-col sm="4">
          <block-input
            :v="v.state"
            :type="'select'"
            :id="'registration-state'"
            :label="'state'"
            :options="regionList"
          ></block-input>
        </b-col>

        <!-- postal_code -->
        <b-col sm="4">
          <block-input
            :id="'registration-postal_code'"
            :type="'text'"
            :label="'postal code'"
            :v="v.postal_code"
          ></block-input>
        </b-col>
      </b-row>

      <!-- country -->
      <b-row>
        <b-col>
          <block-input
            :id="'registration-country'"
            :type="'select'"
            :label="'country'"
            :v="v.country"
            :options="countryList"
          ></block-input>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BlockInput from "../form-inputs/Block-Input";

export default {
  name: "Contact-Information",
  props: ["v"],
  data() {
    return {
      countryList: [
        { value: null, text: "" },
        { value: "USA", text: "United States" },
        { value: "CAN", text: "Canada" },
        { value: "MEX", text: "Mexico" }
      ]
    };
  },
  computed: {
    ...mapState({
      regionList: state => state.regionList
    })
  },
  components: { BlockInput }
};
</script>
