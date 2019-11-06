<template>
  <div id="app">
    <component v-if="loadThis" :is="loadThis"></component>
  </div>
</template>

<script>
import components from "./applications";
import { mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {
      loadThis: null,
    };
  },
  methods: {
    ...mapActions(["getSrcFile", "isTesting"]),
    loadPath(path) {
      this.getSrcFile(path)
          .then((response) => {
            this.loadThis = response;
          })
          .catch((message) => {
            
          });
    }
  },
  mounted() {
    this.$router.push("/");
    this.isTesting();
    this.loadPath(document.location.pathname);
  },
  components
};
</script>

<style>
#app {
  padding-bottom: 100px;
}
</style>
