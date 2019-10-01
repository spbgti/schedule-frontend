<template>
  <v-container>
    <v-row>
      <v-card
        class="text-center"
        :elevation="0"
      >{{ exercise.name }}, {{ exercise.type }}</v-card>
    </v-row>
    <v-row>
      <v-card
        class="text-center"
        :elevation="0"
        >Ауд: {{ exercise.room_id }}</v-card>
    </v-row>
    <v-row>
      <v-card 
        class="text-center"
        :elevation="0"
        v-for="(teacher, index) in exercise.teachers"
        :key="index"
      >{{ teacher }}</v-card>
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
  // Bozhe dai mne sil ne besit'sa iz-za verstki :((
}
</script>