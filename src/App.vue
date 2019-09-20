<template>
  <v-app>
    <v-content>
      <Schedule_mod/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Schedule_mod from './components/Schedule_mod.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Schedule_mod,
  },
  data: () => ({
    //
  }),
});
</script>
