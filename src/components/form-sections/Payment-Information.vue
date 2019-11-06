<template>
  <div>
    <div v-if="selectedProduct">
      <!-- postal header -->
      <div class="payment-header text-center mb-4">
        <h4 class="mb-3">Payment Information</h4>
        <img
          class="credit-card-logos mb-1"
          alt="Credit Card Logos"
          src="https://s3-us-west-2.amazonaws.com/response-web/images/icons/credit_card_logos.png"
        >
        <div class="secure-transactions mb-2">
          <v-icon name="lock" class="lock-icon"></v-icon>
          <span>All transactions are secure and encrypted.</span>
        </div>
        <div class="selected-product-details">
          <p>
            <span>Package:</span>
            {{ selectedProduct[0].ProductName }}
          </p>
          <p class="total">
            <span class="price-disclaimer">**All prices in USD**</span>
            <span>Total:</span>
            ${{ (selectedProduct[0].Amount * (selectedProduct[0].quantity || 1)).toFixed(2) }}
          </p>
        </div>
      </div>
      <!-- end postal header -->
      <div class="payment-inputs">
        <!-- name on card -->
        <b-row>
          <b-col>
            <block-input
              :id="'order_options-payment-name_on_card'"
              :label="'name on card'"
              :v="v.name_on_card"
              :mask="''"
            ></block-input>
          </b-col>
        </b-row>

        <!-- credit card -->
        <b-row>
          <b-col>
            <block-input
              :id="'order_options-payment-credit_card'"
              :label="'credit card'"
              :v="v.credit_card"
              :mask="'#### #### #### ####'"
            ></block-input>
          </b-col>
        </b-row>

        <!-- expiry -->
        <b-row>
          <b-col>
            <Expiry :v="v.expiry"></Expiry>
          </b-col>
        </b-row>

        <!-- billing postal code -->
        <b-row>
          <b-col>
            <block-input
              :id="'order_options-payment-zip_code'"
              :label="'billing postal code'"
              :v="v.zip_code"
              :mask="''"
            ></block-input>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlockInput from "../form-inputs/Block-Input";
import Expiry from '../form-inputs/Expiry';

export default {
  name: "Payment-Information",
  props: ["v"],
  computed: {
    ...mapGetters(["selectedProduct"])
  },
  components: { BlockInput, Expiry }
};
</script>

<style scoped>
.payment-header {
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 10px 0;
}

.credit-card-logos {
  width: 175px;
}

.secure-transactions {
  align-items: baseline;
  display: flex;
  flex-direction: row;
  height: 20px;
  justify-content: center;
}

.secure-transactions .lock-icon {
  width: 18px;
}

.secure-transactions span {
  font-size: 14px;
}

.price-disclaimer {
  font-weight: bold;
}

.selected-product-details {
  display: flex;
  flex-direction: row;
}

.selected-product-details p {
  flex-grow: 1;
  margin-bottom: 0;
  text-align: left;
  font-weight: 400;
}

.selected-product-details p span {
  font-weight: 700;
}

.selected-product-details .total {
  text-align: right;
}
</style>
