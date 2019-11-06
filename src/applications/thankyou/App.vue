<template>
  <b-container>
    <ResponseLpGlobalId>
      <TicketDownload />
      <!-- <MapBox/> -->
    </ResponseLpGlobalId>
  </b-container>
</template>

<script>
import ResponseLpGlobalId from "../../components/instapage-wrappers/Response-LP-Global-ID";
import MapBox from "./mapbox/App";
import TicketDownload from "./ticket-download/App";

export default {
  mounted() {
    const LS = JSON.parse(localStorage.getItem("registration"));
    if (LS) {
      this.$store.commit("updateState", {
        parameter: "registration",
        value: LS
      });
    }
  },
  components: { MapBox, ResponseLpGlobalId, TicketDownload }
};
</script>

<style>
</style>
