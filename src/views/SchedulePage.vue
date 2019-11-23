<template>
  <schedule-table
    v-if="rendered"
    :exercises="schedule.exercises"
    :groupNum="group.number"
    :type="this.$route.params.type"
  />
</template>

<script lang="ts">
import store from "@/store"

import Vue from 'vue';
import ScheduleTable from '../components/ScheduleTable.vue';
import Component from 'vue-class-component';
import { ISchedule, IGroup }  from "@/interfaces";
import * as api from '@/api';

@Component({
  name: 'SchedulePage',
  components: {
    ScheduleTable,
  }
})
export default class SchedulePage extends Vue {

  schedule!: ISchedule;
  group!: IGroup;
  rendered: boolean = false;

  async getSchedule(){
    this.schedule = await api.getScheduleById(this.$route.params.id);
  }

  async getGroupNum(){
    this.group = await api.getGroupNumById(this.schedule.group_id);
  }

  async created(){
    await this.getSchedule();
    await this.getGroupNum();
    this.rendered = true;
  }

}
</script>