<template>
  <div id="eventsWrapper">
    <app-header number="1" headerText="Select An Event" :route="'/'"></app-header>
    <app-event-card @selectEvent="select" :eventsList="eventsList"></app-event-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Header from "../../../components/displays/Header";
import EventCard from "../../../components/displays/Bus-Tour-Events";

export default {
  name: "Events",
  computed: {
    ...mapGetters(["eventsList"])
  },
  methods: {
    ...mapActions(["selectEvent"]),
    select(data) {
      this.selectEvent(data).then(res => {
        this.$router.push(res === true ? "/product" : "/registration")
      }
      );
    }
  },
  components: {
    appHeader: Header,
    appEventCard: EventCard
  }
};
</script>

<style>
</style>
