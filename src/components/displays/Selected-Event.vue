<template>
  <div class="selected-event-details" v-if="selectedEvent">
    <h5>{{ title }}:</h5>
    <h6 v-if="selectedEvent.draw !== 'Generic Real Estate'">{{ selectedEvent.draw }}</h6>
    <p>
      {{ selectedEvent.day_of_week }}
      {{ selectedEvent.month }}
      {{ selectedEvent.day_of_month }} -
      {{ selectedEvent.converted_time }}
    </p>
    <p>{{ selectedEvent.venue_name }}</p>
    <p>{{ selectedEvent.city }}, {{ selectedEvent.state }}</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "SelectedEvent",
  computed: {
    ...mapGetters(["selectedEvent"]),
    ...mapState({
      title: state => state.links_meta_data.title
    })
  }
};
</script>

<style scoped>
.selected-event-details {
  border-bottom: 1px solid;
  padding: 15px 0;
  text-align: left;
}

h5, h6, p {
  margin: 0;
}

h5, h6 {
  margin-bottom: 3px;
}

p {
  font-size: 14px;
}
</style>
