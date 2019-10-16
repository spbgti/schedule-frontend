<template>
  <schedule-table
    v-if = "Object.entries(schedule).length != 0"
    :exercises="schedule.exercises"
    :groupNum="group.number"
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
      schedule : {},
      group : {},
    }
  },
  methods: {
    getSchedule : async function () {
      this.schedule = await api.getScheduleById( this.$route.params.id );
    },
    getGroupNum : async function () {
      this.group = await api.getGroupNumById(this.schedule.group_id); // Property 'group_id' does not exist on type '{}' | How to use intf as type?
    },
  },
  async created(){
    await this.getSchedule();
    await this.getGroupNum();
  }

});
</script>