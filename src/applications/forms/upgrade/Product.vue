<template>
  <div>
    <ProductSelect :route="'/payment'"/>
  </div>
</template>

<script>
import ProductSelect from "../../../components/displays/Product-Select";

export default {
  components: { ProductSelect }
};
</script>
