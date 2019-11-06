<template>
  <div>
    <div id="image-bases">
      <img id="ticket_base" ref="ticketBase" :src="ticketUrl" alt="ticket">
      <canvas ref="canvas" id="ticket-canvas" width="500" height="890"></canvas>
    </div>
    <b-row class="ticket-download">
      <b-col cols="12" md="4" class="qr-wrapper text-center">
        <div class="qr-border">
          <img class="qr-image" ref="qrCode" :src="qrSrc" alt="qr-code">
        </div>
      </b-col>
      <b-col cols="12" md="8">
        <div>
          <h5>{{ registration.selected_event.draw }}</h5>
          <b-row>
            <b-col cols="12" md="6" class="ticket-group">
              <p class="label">name</p>
              <p class="text">{{ registration.first_name }} {{ registration.last_name }}</p>
            </b-col>
            <b-col cols="12" md="6" class="ticket-group">
              <p class="label">ticket type</p>
              <p class="text">E-Ticket</p>
            </b-col>
          </b-row>
        </div>
        <b-row>
          <b-col cols="12" md="6" class="ticket-group">
            <p class="label">date</p>
            <p class="text">{{ eventDate }}</p>
            <p class="text">{{ registration.selected_event.converted_time }}</p>
            <a class="link" target="_blank" :href="calendarSrc">Add to Calendar</a>
          </b-col>
          <b-col cols="12" md="6" class="ticket-group">
            <p class="label">venue</p>
            <p class="text">{{ registration.selected_event.venue_name }}</p>
            <a class="link" target="_blank" :href="mapSrc">View Map</a>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!--
    <div class="download-wrapper">
      <a
        class="text-center"
        href="#"
        id="ticket_download"
        ref="qrDownload"
        target="_self"
        download="tickets.png"
      >
        <p class="link">download ticket</p>
        <img
          src="https://s3-us-west-2.amazonaws.com/response-web/images/Dev_Marketing_Library/ticket_download_thumb.jpg"
          alt="download ticket icon"
        >
      </a>
    </div>
    -->
  </div>
</template>

<script>
import axios from "axios";
import snippets from "../../../lib/helpers/snippets";
import moment from "moment";
import { mapActions, mapState } from "vuex";
import QRCode from "qrcode";

export default {
  data() {
    return {
      ticketUrl: "",
      qrSrc: "",
      calendarSrc: "",
      mapSrc: ""
    };
  },
  computed: {
    ...mapState({ registration: state => state.registration }),
    eventDate() {
      return moment(this.registration.selected_event.start_date).format("dddd, MMM. DD");
    }
  },
  watch: {
    registration() {
      QRCode.toDataURL(this.registration.qr_url)
        .then(url => {
          this.qrSrc = url;
          this.getImage();
        })
        .catch(err => {});
      this.mapSrc = this.registration.selected_event.map_link;
      this.calendarSrc = `https://api.getstiki.com/v1/ical/response/lp?event=${this.registration.selected_event.id}`;
    }
  },
  methods: {
    getImage() {
      axios
        .get("https://sc-search.responsewebops.com/api/ticket_wireframe")
        .then(res => {
          this.ticketUrl = res.data;
          this.generateTicket();
        })
        .catch(error => {});
    },
    generateTicket(data) {
      const ticketBase = this.$refs.ticketBase;
      const qrDownload = this.$refs.qrDownload;
      const qrCode = this.$refs.qrCode;

      const event_data = this.registration.selected_event;
      const ticketHeader = event_data.draw;
      const ticketType = "E-Ticket";
      const ticketDate = `Time: ${moment(event_data.start_date).format("dddd, MMMM DD, YYYY @ h:mma")}`;
      const ticketReservation = `${this.registration.first_name} ${this.registration.last_name}`;
      const ticketVenue = event_data.venue_name;
      const ticketVenueAddress = event_data.street_address1;
      const ticketVenueState = `${event_data.city}, ${event_data.state} ${event_data.zip}`;

      setTimeout(() => {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(ticketBase, 0, 0, 500, 890);
        ctx.drawImage(qrCode, 100, 650, 300, 200);

        // Ticket Header
        ctx.font = "36px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(ticketHeader, 55, 150);

        // Ticket Date
        ctx.font = "18px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(ticketDate, 55, 180);

        // TIcket Type
        ctx.font = "18px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(ticketType, 55, 250);

        // Ticket Reservation
        ctx.font = "18px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(ticketReservation, 55, 320);

        ctx.font = "18px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(ticketVenue, 55, 385);

        ctx.font = "18px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(ticketVenueAddress, 55, 425);

        ctx.font = "18px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(ticketVenueState, 55, 445);

        const imgLink = qrDownload;

        canvas.toBlob(function(blob) {
          imgLink.href = URL.createObjectURL(blob);
        }, "image/png");
      }, 1000);
    }
  }
};
</script>


<style scoped>
#image-bases {
  display: none;
}
.ticket-download {
  border: 1px solid #707070;
  margin: 5px;
  margin-bottom: 25px;
  padding: 15px 0;
  text-align: left;
}

.ticket-download p {
  margin-bottom: 5px;
  padding: 0;
}

.qr-wrapper {
  align-items: center;
  display: flex;
}

.qr-border {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  border: none;
  margin: 0 auto;
  height: 90%;
}

.qr-image {
  height: 200px;
  width: 200px;
}

.ticket-group {
  margin-top: 20px;
}

.label {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: #7c7c7c;
}

.text {
  text-transform: capitalize;
  font-size: 18px;
}

.link {
  color: #f5245b;
  display: inline-block;
}

.download-wrapper {
  position: relative;
  display: block;
  margin: 0 auto;
  width: 125px;
}

.download-wrapper p {
  position: absolute;
  width: 100%;
}

.download-wrapper img {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .qr-border {
    border-right: 1px solid;
  }
}
</style>
