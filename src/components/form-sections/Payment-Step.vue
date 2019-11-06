<template>
  <div>
    <app-header headerText="Payment Information" :route="'/registration'"></app-header>
    <Payment-information v-if="selectedProduct && selectedProduct[0].ProductId !== 'free'" :v="$v">
    </Payment-information>
    <Submit :isValid="$v.$invalid"></Submit>
  </div>
</template>

<script>
// Modules
import { mapState, mapGetters } from "vuex";
import _ from "lodash";
import validators from "../../lib/validators";
import Header from '../displays/Header';

// Components
import PaymentInformation from "./Payment-Step-Information";
import Submit from "./Submit";

export default {
  name: "Registration",
  computed: {
    ...mapGetters(["selectedProduct"]),
    ...mapState({
      name_on_card: state => state.order_options.payment.name_on_card,
      credit_card: state => state.order_options.payment.credit_card,
      zip_code: state => state.order_options.payment.zip_code,
      expiry: state => state.order_options.payment.expiry
    })
  },
  validations() {
    let baseValidations = {};

    if (this.selectedProduct && this.selectedProduct[0].ProductId !== "free") {
      baseValidations = _.merge(baseValidations, validators.payment);
    }

    return baseValidations;
  },
  components: { PaymentInformation, Submit, appHeader: Header }
};
</script>

<style>
.guest-btn {
    display: block;
    width: 100%;
    border: none;
    background: none;
    margin-bottom: 25px;
}

.guest-btn:hover,
.guest-btn:focus {
  cursor: pointer;
  color: #2378bf;
}

.guest-btn svg {
    max-width: 20px;
    vertical-align: middle;
    display: inline-block;
}
</style>