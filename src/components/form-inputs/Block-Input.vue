<template>
  <div>
    <div
      :class="{ invalid: v.$error, valid: !v.$error && v.$dirty }"
      class="block-input-wrapper"
      role="group"
    >
      <label :for="id">{{ label }}</label>
      <b-form-input
        v-if="type !== 'select'"
        v-model="field"
        v-mask="mask ? mask : ''"
        class="block-input"
        :id="id"
        :type="type"
        @input="v.$touch()"
      ></b-form-input>
      
      <b-form-select
        v-else
        class="block-input"
        v-model="field"
        :id="id"
        :options="options"
        @change="v.$touch()"
      ></b-form-select>
    </div>
    <div class="error" v-if="v.$error">
      <p v-if="v.required !== undefined && !v.required">Field is required.</p>
      <p v-else-if="v.minLength !== undefined && !v.minLength">Field must have at least {{ v.$params.minLength.min }} characters.</p>
      <p v-else-if="v.isValidEmail !== undefined && !v.isValidEmail">Email invalid.</p>
      <p v-else-if="v.alphaSpaceOnly !== undefined && !v.alphaSpaceOnly">Field cannot contain numbers.</p>
      <p v-else-if="v.phoneRegex !== undefined && !v.phoneRegex">Field must contain a valid phone number.</p>
      <p v-else-if="v.americanExpress !== undefined && !v.americanExpress">Not a valid card type.</p>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Block-Input",
  props: {
    id: String,
    label: String,
    v: Object,
    mask: String,
    options: Array,
    type: {
      type: String,
      default: "text"
    }
  },
  computed: {
    field: {
      set(input) {
        const obj = {
          parameter: this.id.split("-").join("."),
          value: input
        };
        this.$store.commit("updateState", obj);
      },
      get() {
        const parameter = this.id.split("-").join(".");
        return _.get(this.$store.state, parameter);
      }
    }
  }
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: none;
}

.block-input-wrapper {
  border: 1px solid;
  padding: 5px;
  margin: 10px 0;
  text-align: left;
}
.block-input-wrapper label {
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
}

.block-input-wrapper label,
.block-input {
  border: none;
  margin: 0;
  padding: 0 10px;
}

.block-input {
  background-color: #fff;
  box-shadow: none;
  height: 30px;
}

.valid {
  border: 1px solid #048804 !important;
}
.invalid {
  border: 1px solid #f00 !important;
}

.error {
  color: #f00;
  font-weight: 200;
  text-align: center;
}
</style>
