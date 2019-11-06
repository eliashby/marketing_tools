<template>
  <div>
    <app-header number="2" headerText="Select a Product" :route="'/events'"></app-header>
    <app-selected-event></app-selected-event>
    <app-product-quantity></app-product-quantity>
    <button
      @click.prevent="$router.push('/registration')"
      :class="{disabled: disableButton}"
      :disabled="disableButton"
    >Continue</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "../../../components/displays/Header";
import SelectedEvent from "../../../components/displays/Selected-Event";
import ProductSelect from "../../../components/displays/Product-Select";
import ProductQuantity from "../../../components/displays/Product-Quantity";

export default {
  name: "Product",
  computed: {
    ...mapGetters(["selectedEvent", "selectedProduct", "testing", "priceListId"]),
    disableButton() {
      return !this.selectedProduct ? true : false;
    }
  },
  components: {
    appHeader: Header,
    appSelectedEvent: SelectedEvent,
    appProductSelect: ProductSelect,
    appProductQuantity: ProductQuantity
  }
};
</script>

<style scoped>
button {
  border: none;
  background-color: #373737;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 1rem;
  height: 40px;
  margin: 15px 0;
  width: 100%;
}

.disabled {
  background-color: rgba(37, 37, 37, 0.8);
  color: #aaa;
  pointer-events: none;
}

.more-tickets-text {
  font-size: 14px;
  text-align: center;
}
</style>
