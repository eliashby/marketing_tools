<template>
  <div>
    <p class="error" v-if="displayError">{{ errorText }}</p>

    <button id="reg-submit" @click.prevent="submit" :class="{ 'disabled': isValid }" :disabled="isDisabled">{{ getButtonText() }}</button>
    
    <div class="disclaimer-wrapper">
      <p class="disclaimer-text">
        By clicking the "Save My Seat" button above, you are agreeing to our
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
import { mapActions, mapGetters } from "vuex";
import validators from "../../lib/validators";
import axios from 'axios';

export default {
  name: "Submit",
  props: ["isValid"],
  data() {
    return {
      disableButton: false,
      buttonText: '',
      displayError: false,
      errorText: ""
    };
  },
  computed: {
    ...mapGetters(["selectedProduct"]),
  },
  methods: {
    ...mapActions(["submitRegistration"]),
    getButtonText() {
      if (this.selectedProduct[0].ProductId === 'free') {
        this.buttonText = 'Submit';
      } else {
        this.buttonText = 'Continue';
      }
      return this.buttonText;
    },
    submit() {
      if (this.selectedProduct[0].ProductId === 'free') {
        this.submitAction();

        this.submitRegistration()
          .then(regResponse => {
            if (regResponse === false) {
              this.errorText = 'Sorry this event is unavailable for registration';
              this.displayError = true;
              this.disableButton = false;
              this.buttonText = 'Submit';
            }
          })
          .catch(error => {
            this.catchAction(error);
          });
      } else {
        this.$router.push('/payment');
      }
    },
    submitAction() {
      this.disableButton = true;
      this.buttonText = "Processing, please wait...";
      this.displayError = false;
    },
    catchAction(error) {
      this.errorText = 'Something has gone wrong. Please try again';
      this.displayError = true;
      this.disableButton = true;
      this.buttonText = this.selectedProduct[0].ProductId === 'free' ? 'Submit': 'Continue';
    }
  },
  computed: {
    ...mapGetters([
      "testing",
      "privacyPolicy",
      "termsAndConditions",
      "selectedProduct"
    ]),
    isDisabled() {
      /*
      console.log(this.isValid);
      console.log(this.captiaValid);
      if (this.$store.state.captchaTest === true) {
        if (this.isValid === false || this.captiaValid === false) {
          return true;
        } else if (this.isValid === true && this.captiaValid === true) {
          return false;
        }
        return true;
      } else {
        return this.isValid;
      }
      */

      return this.disableButton;
    }
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
