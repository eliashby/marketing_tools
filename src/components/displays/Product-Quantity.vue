<template>
  <div class="product-display" v-if="productList.length">
    <div v-for="product in productList" :key="product.ProductId">
      <div
        class="product-box"
        v-if="selectedProduct === null || selectedProduct[0].ProductId === product.ProductId"
      >
        <b-container>
          <b-row class="details">
            <b-col>
              <h5 class="product-name">{{ product.ProductName }}</h5>
            </b-col>

            <b-col class="label">
              <h5 class="product-name float-right">Quantity</h5>
            </b-col>
          </b-row>

          <b-row class="details">
            <b-col class="label" v-if="product.ProductId.toLowerCase() !== 'free'">
              <p v-if="product.originalPrice">{{ selectedProduct ? `Total: $ ${(selectedProduct[0].Amount * selectedProduct[0].quantity).toFixed(2) }` : `$${product.originalPrice.toFixed(2)}` }}</p>
              <p v-else>{{ selectedProduct ? `Total: $ ${(selectedProduct[0].Amount * selectedProduct[0].quantity).toFixed(2) }` : `$${product.Amount.toFixed(2)}` }}</p>
            </b-col>
            <b-col class="label" v-else>
              <p>General Admission</p>
              <p>$0</p>
            </b-col>
            <b-col class="label float-right">
              <b-form-select v-if="product.quantity"
                class="desktop-center"
                id="mobile-center"
                @change="selectProduct({ quantity: $event, product })"
                :value="selectedProduct ? selectedProduct[0].quantity : null"
                :name="product.ProductId"
                :options="product.maxQuantity ? setProductQuantity(product.maxQuantity + 1) : product.quantity"
              />
              <b-form-select v-else
                class="desktop-center"
                id="mobile-center"
                @change="selectProduct({ quantity: $event, product })"
                :value="selectedProduct ? selectedProduct[0].quantity : null"
                :name="product.ProductId"
                :options="product.maxQuantity ? setProductQuantity(product.maxQuantity + 1) : defaultQuantity"
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlockInput from "../form-inputs/Block-Input";

export default {
  name: "ProductQuantity",
  data() {
    return {
      defaultQuantity: [
        {
          value: null,
          text: "0"
        },
        {
          value: 1,
          text: "1"
        },
        {
          value: 2,
          text: "2"
        },
        {
          value: 3,
          text: "3"
        },
        {
          value: 4,
          text: "4"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["selectedProduct", "productList"])
  },
  components: { BlockInput },
  methods: {
    setProductQuantity(input) {
      const quantityWithZero = input++;
      let quantity = Array(quantityWithZero)
        .fill()
        .map((item, index) => {
          if (!index) {
            return { value: null, text: index.toString() };
          } else {
            return { value: index, text: index.toString() };
          }
        });
      return quantity;
    },
    selectProduct(input) {
      console.log(input.product.discountTier);
      if (!input.quantity) {
        return this.$store.commit("updateState", {
          parameter: "order_options.products",
          value: null
        });
      } else {
        const data = {
          quantity: input.quantity,
          ProductId: input.product.ProductId,
          ProductName: input.product.ProductName,
          Amount: input.product.Amount,
          trigger: input.product.trigger
        };

        if (input.product.discountTier) {
          for (let x = 0; x < input.product.discountTier.length; x++) {
            if (input.product.discountTier[x].quantity === input.quantity) {
              data.Amount = input.product.discountTier[x].price;
            }
          }
        }

        if (
          input.product.discountAmount &&
          input.quantity >= input.product.discountQuantity
        ) {
          data.Amount = input.product.discountAmount;
        }

        this.$store.commit("updateState", {
          parameter: "order_options.products",
          value: [data]
        });

        this.$store.commit("updateState", {
          parameter: "registration.tags.trigger",
          value: data.trigger
        });
      }
    }
  }
};
</script>

<style scoped>
.product-box {
  border: 1px solid;
  padding: 10px 20px;
  margin: 10px 0;
  width: 100%;
}

.product-box select {
  cursor: pointer;
  display: block;
  margin-left: auto;
  width: 75px;
}

.details {
  align-items: center;
}

.label {
  display: block;
}

.product-name {
  color: #000;
  text-align: left;
}

.label p {
  color: #000;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  text-align: left;
}

.desktop-center {
  padding: 0;
  margin: 0;
}

#mobile-center {
  padding: 0 5px;
}

@media screen and (min-width: 576px) {
  .label p {
    text-align: left;
  }
}
</style>