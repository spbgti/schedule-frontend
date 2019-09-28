<template>
  <v-container>
    <!--exercises receives from parent-->
    <div
    v-for="(ex, index) in exercises"
    :key="index"
    >
      <schedule-day
      :exercise="ex"
      :parity="parity"
      />
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IExercise } from "@/interfaces"
import ScheduleDay from '@/components/ScheduleDay.vue'

@Component({
  name: 'ScheduleWeek',
  components: {
    ScheduleDay,
  }
})
export default class ScheduleWeek extends Vue {
  @Prop( {required: true, type: Array } ) readonly exercises!: IExercise;
  @Prop( {required: true, type: Boolean } ) readonly even!: Boolean;
  parity = this.even ? 2 : 1;
}
/*
<v-data-table
      :headers="scheduleHeaders"
      :items="exercises"
      :items-per-page="15"
      multi-sort
      item-key="items.key"
    >
      <template v-slot:item="props">
        <tr>
        <td v-if = "props.item.parity != parity">{{ props.item.exercise_id}}</td>
        <td v-if = "props.item.parity != parity">{{ props.item.schedule_id }}</td>
        <td v-if = "props.item.parity != parity">{{ props.item.room_id }}</td>
        <td v-if = "props.item.parity != parity">{{ props.item.teachers }}</td>
        <td v-if = "props.item.parity != parity">{{ props.item.name }}</td>
        <td v-if = "props.item.parity != parity">{{ props.item.type }}</td>
        <td v-if = "props.item.parity != parity">{{ props.item.pair }}</td>
        <td v-if = "props.item.parity != parity">{{ props.item.day }}</td>
        <td v-if = "props.item.parity != parity">{{ props.item.parity }}</td>
        </tr>
      </template>
    </v-data-table>
*/
</script>