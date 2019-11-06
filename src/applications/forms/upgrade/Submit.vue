<template>
  <div>
    <p class="error" v-if="displayError">{{ errorText }}</p>
    <button @click.prevent="submit" :class="{ 'disabled': isValid }">{{ buttonText }}</button>
    <div class="disclaimer-wrapper">
      <p class="disclaimer-text">
        By clicking the "Submit" button above, you are agreeing to our
        <a
          :href="termsAndConditions"
          target="_blank"
        >Terms and Conditions</a> and
        <a :href="privacyPolicy" target="_blank">Privacy Policy</a>, and authorize us to email, call, leave recorded messages and/or send recurring texts (msg
        &amp; data rates may apply) about our events and services using automated technology. You also understand that
        you are not required to give your consent as a condition of purchasing from us. To manage your contact preferences,
        please refer to our
        <a
          :href="privacyPolicy"
          target="_blank"
        >Privacy Policy</a>.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import validators from "../../../lib/validators";

export default {
  name: "Submit",
  props: ["isValid"],
  data() {
    return {
      disableButton: false,
      buttonText: "Submit",
      displayError: false,
      errorText: ""
    };
  },
  methods: {
    ...mapActions(["submitOrder"]),
    submit() {
      this.submitAction();

      this.submitOrder().catch(error => {
        console.log(error);
        this.catchAction(error);
      });
    },
    submitAction() {
      this.disableButton = true;
      this.buttonText = "Processing, please wait...";
      this.displayError = false;
    },
    catchAction(error) {
      this.errorText = 'Something has gone wrong. Please try again';
      this.displayError = true;
      this.disableButton = false;
      this.buttonText = "Submit";
    }
  },
  computed: {
    ...mapState({ registration: state => state.registration }),
    ...mapGetters([
      "privacyPolicy",
      "termsAndConditions",
      "selectedProduct"
    ])
  }
};
</script>

<style scoped>
button {
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

.disclaimer-text {
  font-size: 12px;
  margin: 0 auto;
  line-height: 14px;
  width: 90%;
}

.error {
  color: #f00;
  font-weight: 400;
  text-align: center;
}

.disabled {
  background-color: rgba(37, 37, 37, 0.8);
  color: #aaa;
  pointer-events: none;
}
</style>
