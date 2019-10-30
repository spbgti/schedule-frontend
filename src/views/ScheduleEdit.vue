<template>
  <schedule-pair-input
    v-if="rendered"
    :name="exercise.name"
    :type="exercise.type != null ? exercise.type : ''"
    :room_id="exercise.room_id"
    :teachers="exercise.teachers"
    :id="exercise.exercise_id"
    :exercise="exercise"
  />
</template>

<script lang="ts">
import store from "@/store"

import Vue from 'vue';
import SchedulePairInput from '../components/SchedulePairInput.vue';
import Component from 'vue-class-component';
import { IExercise }  from "@/interfaces";
import * as api from '@/api';

@Component({
  name: 'ScheduleEdit',
  components: {
    SchedulePairInput,
  }
})
export default class ScheduleEdit extends Vue {

  exercise !: IExercise;
  rendered : boolean = false;

  async getCurrentExercise(){
    this.exercise = await api.getExerciseById(this.$route.params.ex_id);
  }

  async created(){
    await this.getCurrentExercise();
    this.rendered = true;
  }
}
</script>