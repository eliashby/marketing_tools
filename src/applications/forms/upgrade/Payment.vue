<template>
  <div>
    <PaymentInformation :v="$v" />
    <Submit :isValid="$v.$invalid" />
    <div class="opt-out">
      <a :href="$store.state.redirectPaths.accessory">No thanks, continue to ticket download</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import validators from "../../../lib/validators";
import PaymentInformation from "../../../components/form-sections/Payment-Information";
import Submit from "./Submit";

export default {
  name: "Payment-Upgrade",
  computed: {
    ...mapGetters(["selectedProduct"]),
    ...mapState({
      name_on_card: state => state.order_options.payment.name_on_card,
      credit_card: state => state.order_options.payment.credit_card,
      zip_code: state => state.order_options.payment.zip_code,
      expiry: state => state.order_options.payment.expiry
    }),
  },
  validations: () => validators.payment,
  components: { PaymentInformation, Submit }
};
</script>

<style scoped>
.opt-out {
  margin-top: 15px;
  text-align: center;
}

.opt-out a {
  color: #555;
  font-size: 12px;
}
</style>


