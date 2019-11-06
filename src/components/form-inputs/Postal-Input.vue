<template>
  <div id="eventsWrapper">
    <h4>find an event near you</h4>
    <div
      class="block-input-wrapper"
      role="group"
      :class="{ invalid: $v.address.$error, valid: !$v.$error && $v.$dirty }"
    >
      <label class="block-input" for="event-options-filters-address">Postal Code</label>
      <b-form-input
        class="block-input"
        id="event-options-filters-address"
        type="text"
        v-model="address"
        v-model.trim="$v.address.$model"
      />
    </div>
    <p class="error" v-if="!$v.address.required && $v.address.$error">Postal Code is required</p>
    <!--<p class="error" v-if="eventsEmpty">Could not find any events</p>-->
    <button
      @click.prevent="zipSearch"
      :disabled="$v.address.$error === true"
      :class="{'disabled': $v.$invalid || $v.address.$model.length === 0}"
    >Find Events!</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import validators from "../../lib/validators";

export default {
  name: "Postal-Input",
  data() {
    return {
      address: '',
      eventsEmpty: false
    }
  },
  computed: {
    ...mapGetters(['eventsList'])
  },
  methods: {
    ...mapActions(['searchEvents']),
    zipSearch() {
      this.$store.state.event_options.filters.nearby.address = this.address;
      this.searchEvents({
        nearby: {
					address: this.address,
					radius_miles: this.$store.state.event_options.filters.nearby.radius_miles
				},
				days_from_now: this.$store.state.event_options.filters.days_from_now,
				registration_closed: this.$store.state.event_options.filters.registration_closed,
				event_type: this.$store.state.event_options.filters.event_type,
				speaker_names: this.$store.state.event_options.filters.speaker_names
      });
      if (this.eventsList.length === 0) {
        this.eventsEmpty = true;
      } else {
        this.eventsEmpty = false;
      }
    }
  },
  validations: { address: validators.postal_search }
};
</script>

<style scoped>
#eventsWrapper h4 {
  font-weight: 300;
  margin-bottom: 15px;
  text-align: center;
  text-transform: capitalize;
}

#eventsWrapper button {
  border: none;
  background-color: #4caf50;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 1rem;
  height: 40px;
  margin: 15px 0;
  width: 100%;
}

#eventsWrapper .disabled {
  background-color: rgba(37, 37, 37, 0.8);
  color: #aaa;
  pointer-events: none;
}

.form-control:focus {
  box-shadow: none;
}

.block-input-wrapper {
  border: 1px solid;
  padding: 5px;
  margin: 10px 0;
  text-align: left;
}
.block-input-wrapper label {
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
}

.block-input-wrapper label,
.block-input {
  border: none;
  margin: 0;
  padding: 0 10px;
}

.block-input {
  background-color: #fff;
  box-shadow: none;
  height: 30px;
}

.valid {
  border: 1px solid #048804 !important;
}
.invalid {
  border: 1px solid #f00 !important;
}

.error {
  color: #f00;
  font-weight: 200;
  text-align: center;
}
</style>
