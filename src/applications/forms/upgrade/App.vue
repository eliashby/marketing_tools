<template>
  <b-container>
    <ResponseLpGlobalId>
      <router-view name="upgrade"></router-view>
    </ResponseLpGlobalId>
  </b-container>
</template>

<script>
import ResponseLpGlobalId from "../../../components/instapage-wrappers/Response-LP-Global-ID";

export default {
  components: { ResponseLpGlobalId }
};
</script>
