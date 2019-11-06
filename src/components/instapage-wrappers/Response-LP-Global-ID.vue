

<template>
  <div id="response_lp_global_id" ref="response_lp_global_id">
    <!-- <div v-if="useButton || false" class="mobile-button-wrapper">
      <button class="reg-form-button-mobile frm-btn">GET STARTED</button>
    </div>-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["useButton"],
  mounted() {
    const pageBlock =
      this.$refs.response_lp_global_id.closest(".section") ||
      this.$refs.response_lp_global_id.closest(".page-block");

    if (pageBlock) {
      pageBlock.classList.add("reg-static-height");
    }
  }
};
</script>

<style>
.reg-static-height {
  height: inherit !important;
  margin-top: 35px !important;
  margin-bottom: 50px !important;
}

.reg-static-height .border-holder,
.reg-static-height .section-block {
  height: initial !important;
}
.reg-static-height .page-element {
  height: initial !important;
  position: relative !important;
}

.reg-static-height .section-block .section-inner {
  margin: 0 !important;
  max-width: 100% !important;
}

.reg-static-height .widget {
  width: 100% !important;
  top: 0 !important;
  height: initial !important;
  position: relative !important;
  left: 0 !important;
  padding: 0 10px !important;
}

.reg-static-height .page-element .contents {
  padding: 0 10px !important;
}

.dynamic-button {
  display: table-cell;
}

/* Fixed Mobile Jump Button */
button.reg-form-button-mobile {
  display: none;
  text-align: center;
  text-decoration: none;
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 0;
  font-family: inherit;
  z-index: 9999;
  border: none;
  color: #ffffff;
  background: #2699fb;
  height: 55px;
  line-height: 55px;
  font-size: 22px;
  text-shadow: none;
  width: 100%;
  font-weight: 300;
}

button.reg-form-button-mobile:hover,
button.reg-form-button-mobile:focus {
  text-decoration: none;
  background: #bce0fd;
  opacity: 1;
}

@media (max-width: 767px) {
  button.reg-form-button-mobile {
    display: block;
  }
}
</style>



