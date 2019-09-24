<template>
  <v-container>
    <v-data-table
          :headers="schedule_headers"
          :items="exercises"
          :items-per-page="15"
          item-key="items.key"
        >
        <template v-slot:item="props">
          <tr>
          <td>{{ props.item.exercise_id}}</td>
          <td>{{ props.item.schedule_id }}</td>
          <td>{{ props.item.room_id }}</td>
          <td>{{ props.item.teachers }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.type }}</td>
          <td>{{ props.item.pair }}</td>
          <td>{{ props.item.day }}</td>
          <td>{{ props.item.parity }}</td>
          </tr>
        </template>
    </v-data-table>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IExercise } from "@/interfaces"


@Component
export default class ScheduleTable extends Vue {
  @Prop( {required: true, type: Array } ) readonly exercises!: IExercise;

    schedule_headers = [
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