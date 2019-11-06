<template>
  <div class="header">
    <span class="back-arrow-wrapper" tag="li" @click.prevent="changeRoute">
      <v-icon name="arrow-left"></v-icon>
    </span>
    <h4>
      <!-- <span class="step_count_styles">Step {{ number }}</span> &ndash; {{ headerText }} -->
      {{ headerText }}
    </h4>
  </div>
</template>

<script>
export default {
  props: ['number', 'headerText', 'route'],
  methods: {
    changeRoute() {
      this.$router.push(this.route);
    },
  },
};
</script>

<style scoped>
.header {
  align-items: center;
  border-bottom: 1px solid;
  display: flex;
  flex-direction: row;
  position: relative;
  padding-bottom: 10px;
}

.back-arrow-wrapper {
  cursor: pointer;
  list-style: none;
  position: absolute;
  width: 25px;
}

h4 {
  flex-grow: 1;
  margin-bottom: 0;
  text-align: center;
  text-transform: capitalize;
}
</style>
