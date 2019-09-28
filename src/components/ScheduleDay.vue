<template>
  <v-container
  v-if="exercise.parity != parity">
    Day: {{exercise.day}}; Pair: {{exercise.pair}}; Parity: {{exercise.parity}}; Name: {{exercise.name}};
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IExercise } from "@/interfaces"

@Component
export default class SchedulePair extends Vue {
  @Prop( {required: true, type: Object } ) readonly exercise!: IExercise;
  @Prop( {required: true, type: Number } ) readonly parity!: Number;

}
/*
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
*/

</script>