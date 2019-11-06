<template>
  <b-container>
    <Response-Lp-Global-Id :useButton="true">
      <div v-if="!finished" class="loading-header">
        <h3>
          Please Wait
          <br />Confirming Your Registration
        </h3>
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="congrats-title" v-if="finished">
        <h3>Congratulations {{firstName}}!<br />You are all set.</h3>
      </div>
    </Response-Lp-Global-Id>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';
import ResponseLpGlobalId from '../../components/instapage-wrappers/Response-LP-Global-ID';
import snippets from '../../lib/helpers/snippets';

export default {
  name: 'Control-Confirmation',
  data() {
    return {
      finished: false,
      firstName: ''
    };
  },
  methods: {
    ...mapActions(['updateRegistration', 'retrieveRegistration'])
  },
  mounted() {
    setTimeout(() => {
      if (snippets.getURLParameter('rid') !== undefined) {
        this.retrieveRegistration(snippets.getURLParameter('rid'))
          .then(regResponse => {
            this.firstName = regResponse.name;
            this.updateRegistration({
              registration_id: regResponse.registration_id,
              tags: this.$store.state.tags.mounted
            });
          })
          .catch(err => {});
      }
      this.finished = true;
    }, 2000);
  },
  components: { ResponseLpGlobalId }
};
</script>

<style>
div.container {
  max-width: 960px;
}

.congrats-title {
  text-align: center;
}

.loading-header h3,
.loading-header div {
  display: inline-block;
}

.loading-header {
  text-align: center;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 32px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #000;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>

