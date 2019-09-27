<template>
  <v-container
  :ex="exercises"
  :parity="even ? 1 : 2"
  >
    <v-card-title>
      Нечетная неделя
    </v-card-title>
    <!--exercises receives from parent-->
    <v-data-table
      :headers="scheduleHeaders"
      :items="ex"
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
    <v-card-title>
      Четная неделя
    </v-card-title>
    <!--exercises receives from parent-->
    <v-data-table
      :headers="scheduleHeaders"
      :items="exercises"
      :items-per-page="15"
      multi-sort
      item-key="items.key"
    >
      <template v-slot:item="props">
        <tr>
        <td v-if = "props.item.parity != 2">{{ props.item.exercise_id}}</td>
        <td v-if = "props.item.parity != 2">{{ props.item.schedule_id }}</td>
        <td v-if = "props.item.parity != 2">{{ props.item.room_id }}</td>
        <td v-if = "props.item.parity != 2">{{ props.item.teachers }}</td>
        <td v-if = "props.item.parity != 2">{{ props.item.name }}</td>
        <td v-if = "props.item.parity != 2">{{ props.item.type }}</td>
        <td v-if = "props.item.parity != 2">{{ props.item.pair }}</td>
        <td v-if = "props.item.parity != 2">{{ props.item.day }}</td>
        <td v-if = "props.item.parity != 2">{{ props.item.parity }}</td>
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
export default class ScheduleWeek extends Vue {
  @Prop( {required: true, type: Array } ) readonly exercises!: IExercise;
  @Prop( {required: true, type: Boolean } ) readonly even!: Boolean;

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