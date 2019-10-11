<template>
  <v-app>
    <v-content>
      <Schedule/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Schedule from './components/Schedule.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Schedule,
  },
  data: () => ({
    //
  }),
});
</script>
