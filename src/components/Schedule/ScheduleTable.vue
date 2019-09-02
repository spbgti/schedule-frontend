<template>
    <v-tabs v-model="tab" background-color="deep-purple accent-4" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
        Tab {{ i }}
      </v-tab>

      <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
        <v-card flat tile>
          <v-card-text>{{ text }}</v-card-text>
          </v-card>
          </v-tab-item>
          </v-tabs>
        

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
      
        tab: null,
        text: 'HelloWorld!',
        icons: false,
        centered: false,
        grow: false,
        vertical: false,
        prevIcon: false,
        nextIcon: false,
        right: false,
        tabs: 5,
      
    })
  })
</script>