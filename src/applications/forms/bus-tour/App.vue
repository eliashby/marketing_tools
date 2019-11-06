<template>
  <b-container>
    <Response-Lp-Global-Id :useButton="true">
      <router-view name="busTour"></router-view>
    </Response-Lp-Global-Id>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ResponseLpGlobalId from "../../../components/instapage-wrappers/Response-LP-Global-ID";

export default {
  name: "Registration-Split-Payment",
  components: { ResponseLpGlobalId },
  computed: mapGetters(["eventsList"]),
  methods: mapActions(["selectEvent"]),
  watch: {
    eventsList() {
      switch (this.eventsList.length) {
        case 0:
          return this.$router.push("/");
        case 1:
          this.selectEvent(this.eventsList[0]).then(res => {
            this.$router.push(res === true ? "/product" : "/registration");
          });
        default:
          return this.$router.push("/events");
      }
    }
  }
};
</script>

<style>
div.container {
  max-width: 960px;
}
</style>

