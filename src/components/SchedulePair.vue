<template>
  <v-container
  v-if="exercise.parity != parity"
  >
  <v-row
  >
    <v-card
    class="d-flex justify-start"
    >
      Пара: {{ exercise.pair }}
    </v-card>
    <v-card
    class="d-flex justify-space-between">
      {{ exercise.name }}
    </v-card>
    <v-card>
      
    </v-card>
  </v-row>
  <v-row
    class="d-flex justify-space-between"
  >
    <v-card>
      Аудитория: {{ exercise.room_id }}
    </v-card>
    <v-card>
      Преподаватели: {{ exercise.teachers }}
    </v-card>
  </v-row>
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
</script>