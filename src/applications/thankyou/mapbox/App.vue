<template>
  <b-row class="thankyou-mapbox">
      <b-col cols="12" md="6" id="thankyou-wrap" v-if="registration.event">
        <h2>Thank You {{ registration.first_name }} for Registering</h2>
        <img
          class="thnk-icon"
          src="https://s3-us-west-2.amazonaws.com/educationcentercontent/web-dev/web-icons/thanks-icon.svg"
          alt="calendar"
          width="40"
          height="40"
        >
        <div id="thankyou-body">
          <div class="container_thank">
            <ul class="address-list">
              <li>
                <h5>Date:</h5>
                <!-- <p>{{ registration.event.month }} {{ registration.event.day_of_month }} @ {{ registration.event.converted_time }}</p> -->
                <p>{{ registration.event.converted_date }} @ {{ registration.event.converted_time }}</p>
              </li>
              <li>
                <h5>Event Location:</h5>
                <p>{{ registration.event.venue_name }}</p>
              </li>
              <li>
                <h5>Address:</h5>
                <p>{{ registration.event.street_address1 }}</p>
                <p>{{ registration.event.city }}, {{ registration.event.state }} {{ registration.event.zip }}</p>
              </li>
            </ul>
          </div>
        </div>
      </b-col>
      <b-col cols="12" md="6" id="mapbox-map-wrap" class="thankyou-map">
        <div id="mapbox"></div>
      </b-col>
  </b-row>
</template>

<script>
import mapboxgl from "mapbox-gl";
import snippets from "../../../lib/helpers/snippets";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      addressOne: "",
      addressTwo: "",
      date: "",
      name: "",
      venue: ""
    };
  },
  computed: {
    ...mapState({ registration: state => state.registration })
  },
  watch: {
    registration() {
      if (this.registration.event) {
        return this.setMap(
          this.registration.event.latitude,
          this.registration.event.longitude
        );
      }
    }
  },
  methods: {
    setMap(lat, long) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicmVzcG9uc2Utd2ViZGV2IiwiYSI6ImNqbWI1bHprNzBnamMzeG01Ymw1NmFpeHUifQ.1Gp-p2cpOEtKj1Kya1H5TA";
      var map = new mapboxgl.Map({
        container: "mapbox",
        center: [long, lat],
        zoom: 12,
        style: "mapbox://styles/mapbox/streets-v10"
      });

      new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
    }
  }
};
</script>


<style>
.thankyou-mapbox {
  background-color: #ddd;
}
#thankyou-wrap {
  min-height: 400px;
  text-align: center;
}

.address-list {
  list-style: none;
  padding: 0;
}

#thankyou-wrap p {
  margin-bottom: 10px;
}

#mapbox-map-wrap {
  min-height: 350px;
  padding: 0;
}

#mapbox-map-wrap #mapbox,
#mapbox-map-wrap #mapbox .mapboxgl-canvas-container {
  height: 100%;
}

.mapboxgl-canvas {
  height: inherit !important;
  left: 0;
  width: 100%;
}

.mapboxgl-control-container {
  display: none;
}
</style>

