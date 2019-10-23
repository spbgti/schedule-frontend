<template>
  <v-container>
    Schedule for group {{ groupNum }}
    <v-row>
      <v-col>
        <schedule-week
        :exercises="exercises"
        :type="type"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IExercise } from "@/interfaces"
import ScheduleWeek from '@/components/ScheduleWeek.vue'

@Component({
  name: 'ScheduleTable',
  components: {
    ScheduleWeek,
  }
})
export default class ScheduleTable extends Vue {
  @Prop( {required: true, type: Array } ) readonly exercises!: IExercise[];
  @Prop( {required: true, type: String } ) readonly groupNum!: String;
  @Prop( {required: true, type: String } ) readonly type!: String;

    scheduleHeaders = [
    { text: "exercises id",
      value: "exercise_id", },
    { text: "schedule id",
      value: "schedule_id", },
    { text: "room id",
      value: "room_id", },
    { text: "teachers",
      value: "teachers", },
    { text: "name",
      value: "name", },
    { text: "type",
      value: "type", },
    { text: "pair",
      value: "pair", },
    { text: "day",
      value: "day", },
    { text: "parity",
      value: "parity", },
  ];
}
</script>