<template>
  <schedule-pair-input
    v-if="rendered"
    :name="exercise.name"
    :type="exercise.type != null ? exercise.type : ''"
    :room_id="exercise.room_id"
    :teachers="exercise.teachers"
    :id="exercise.exercise_id"
    :exercise="exercise"
    :sendType="sendType"
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
  sendType !: string;

  async getCurrentExercise(){
    this.exercise = await api.getExerciseById(this.$route.params.ex_id);
    this.sendType = this.$route.params.send_type;
  }

  async created(){
    await this.getCurrentExercise();
    this.rendered = true; // rendered only when get current exercise
  }
}
</script>