<template>
  <div class="product-display" v-if="productList.length">
    <div
      class="product-box"
      v-for="product in productList"
      :key="product.ProductId"
      @click.stop.prevent="selectProduct(product)"
    >
      <div class="label" v-if="product.ProductId.toLowerCase() !== 'free'">
        <h5>{{ product.ProductName }}</h5>
        <p>${{ product.Amount }}</p>
      </div>
      <div class="label" v-else>
        <h5>General Admission</h5>
        <p>$0</p>
      </div>

      <input type="radio" :value="product.ProductId" v-model="selected" name="test">
    </div>
    <button
      @click.prevent="$router.push(route)"
      :class="{disabled: disableButton}"
      :disabled="disableButton"
    >Continue</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProductSelect",
  props: ["route"],
  computed: {
    ...mapGetters(["productList", "selectedProduct", "testing"]),
    selected() {
      return this.selectedProduct === null
        ? false
        : this.selectedProduct[0].ProductId;
    },
    disableButton() {
      return !this.selectedProduct ? true : false;
    }
  },
  methods: {
    selectProduct(product) {
      this.$store.commit("updateState", {
        parameter: "order_options.products",
        value: [product]
      });
    }
  },
  mounted() {
    if (this.productList.length === 1) {
      this.selectProduct(this.productList[0]);
      return this.$router.push(this.route)
    }
  }
};
</script>

<style scoped>
.product-box {
  align-items: center;
  border: 1px solid;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  margin: 10px 0;
}

.label {
  color: inherit;
  flex-grow: 1;
  text-align: left;
}

.label h5,
.label p {
  margin: 0;
}

input {
  cursor: pointer;
  margin-right: 25px;
}

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
