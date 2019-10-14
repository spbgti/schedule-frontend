<template>
  <schedule-table
    v-if = "Object.entries(schedule).length != 0"
    :exercises="schedule.exercises"
  />
</template>

<script lang="ts">
import store from "@/store"

import Vue from 'vue';
import ScheduleTable from '../components/ScheduleTable.vue';
import Component from 'vue-class-component';
import { ISchedule }  from "@/interfaces";
import * as api from '@/api';


export default Vue.extend({
  components: {
    ScheduleTable,
  },

  data(){
    return {
      schedule : {}
    }
  },
  methods: {
    getSchedule : async function () {
      this.schedule = await api.getScheduleById( this.$route.params.id );
    }
  },
  async created(){
    await this.getSchedule();
  }

});
</script>