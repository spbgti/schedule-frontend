<template>
<v-container>
    <div
    v-for="(day, index) in dayExercises"
    :key="'day'+index"
    >
      <schedule-pair
      :exercise="day"
      :parity="parity"
      />
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SchedulePair from '@/components/SchedulePair.vue'
import { IExercise } from "@/interfaces"

@Component({
  name: 'ScheduleDay',
  components: {
    SchedulePair,
  }
})
export default class ScheduleDay extends Vue {
  @Prop( {required: true, type: Array } ) readonly dayExercises!: IExercise[];
  @Prop( {required: true, type: Number } ) readonly parity!: Number;

}
</script>