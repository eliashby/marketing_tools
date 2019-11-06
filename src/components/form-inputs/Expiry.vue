<template>
  <div class="block-select-wrapper" :class="{ invalid: v.$error, valid: !v.$error && v.$dirty}">
    <label>Expiry</label>
    <b-row>
      <b-col>
        <b-form-select @change="v.$touch()" class="block-select" v-model="month" :options="monthOptions"></b-form-select>
      </b-col>
      <b-col>
        <b-form-select @change="v.$touch()" class="block-select" v-model="year" :options="yearOptions"></b-form-select>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["v"],
  data() {
    return {
      monthOptions: [
        {
          text: "month",
          value: null
        },
        {
          text: "01",
          value: "01"
        },
        {
          text: "02",
          value: "02"
        },
        {
          text: "03",
          value: "03"
        },
        {
          text: "04",
          value: "04"
        },
        {
          text: "05",
          value: "05"
        },
        {
          text: "06",
          value: "06"
        },
        {
          text: "07",
          value: "07"
        },
        {
          text: "08",
          value: "08"
        },
        {
          text: "09",
          value: "09"
        },
        {
          text: "10",
          value: "10"
        },
        {
          text: "11",
          value: "11"
        },
        {
          text: "12",
          value: "12"
        },
      ],
      yearOptions: [
        {
          text: "year",
          value: null
        },
        {
          text: "19",
          value: "19"
        },
        {
          text: "20",
          value: "20"
        },
        {
          text: "21",
          value: "21"
        },
        {
          text: "22",
          value: "22"
        },
        {
          text: "23",
          value: "23"
        },
        {
          text: "24",
          value: "24"
        },
        {
          text: "25",
          value: "25"
        },
      ],
      month: null,
      year: null
    };
  },
  watch: {
    month() {
      this.setExpiry();
    },
    year() {
      this.setExpiry();
    }
  },
  methods: {
    setExpiry() {
      this.$store.commit("updateState", {
        parameter: "order_options.payment.expiry",
        value: this.month + "/" + this.year
      });
      this.$emit("input");
    }
  }
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: none;
}

.block-select-wrapper {
  border: 1px solid;
  padding: 5px;
  margin: 10px 0;
  text-align: left;
}
.block-select-wrapper label {
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
}

.block-select-wrapper label,
.block-select {
  border: none;
  margin: 0;
  padding: 0 10px;
}

.block-select {
  height: 30px;
}

.valid {
  border: 1px solid #0f0 !important;
}
.invalid {
  border: 1px solid #f00 !important;
}
</style>

