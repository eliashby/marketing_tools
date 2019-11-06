<template>
  <div>
    <!-- guest full name -->
    <b-row>
      <!-- guest first -->
      <b-col sm="6">
        <block-input
          :id="'registration-guest_first_name'"
          :label="'first name'"
          :type="'text'"
          :v="v.guest_first_name"
        ></block-input>
      </b-col>

      <!-- guest last -->
      <b-col sm="6">
        <block-input
          :id="'registration-guest_last_name'"
          :label="'last name'"
          :type="'text'"
          :v="v.guest_last_name"
        ></block-input>
      </b-col>

      <!-- guest email -->
      <b-col sm="12">
        <block-input
          :id="'registration-guest_email'"
          :label="'guest email'"
          :type="'email'"
          :v="v.guest_email"
        ></block-input>
      </b-col>

      <!-- guest phone -->
      <b-col sm="12">
        <block-input
          :id="'registration-guest_phone'"
          :label="'guest phone'"
          :type="'tel'"
          :v="v.guest_phone"
          :mask="'(###) ###-####'"
        ></block-input>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BlockInput from "../form-inputs/Block-Input";

export default {
  name: "Guest-Information",
  props: ["v"],
  components: { BlockInput },
};
</script>
