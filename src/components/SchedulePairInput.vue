<template>
  <v-container>
    {{id}}
    <v-row>
      <v-text-field
        v-model="pairTitle"
        label="pair title"
        :placeholder="name"
      ></v-text-field>
      <v-text-field
        v-model="pairType"
        label="pair type"
        :placeholder="type"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
        v-model="pairRoom"
        label="room"
        :placeholder="room_id"
      ></v-text-field>
      <v-text-field
        v-model="pairTeachers"
        label="teachers(separate by ',')"
        :placeholder="teachers"
      ></v-text-field>
    </v-row>
    <v-btn
      @click="updateExercise"
    >Send to server</v-btn>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IExercise } from "@/interfaces"
import * as api from '@/api';

@Component
export default class SchedulePair extends Vue {
  @Prop( {required: true, type: String } ) readonly name!: string;
  @Prop( {required: true, type: String } ) readonly type!: string;
  @Prop( {required: true, type: Number } ) readonly room_id!: Number;
  @Prop( {required: true, type: Array } ) readonly teachers!: Array<String>;
  @Prop( {required: true, type: Number } ) readonly id!: Number;
  @Prop( {required: true, type: Object } ) readonly exercise!: IExercise;

  pairTitle: string = '';
  pairType: string = '';
  pairRoom!: Number;
  pairTeachers: string = '';

  separateToList(str: string) {
    //let splited = str.split(',');
    let splited = str.replace(',', ' ');
    let splitedStr = splited.split(' ');
    return splitedStr.filter(item => item != ' ' && item != '');
  }

  updateExercise(){
    console.log('update request: ' + this.pairTitle + ' ' + this.pairType + ' ' + this.pairRoom + ' ' + this.separateToList(this.pairTeachers));
    if (this.pairTitle != '' && this.pairType != '' && this.pairRoom != null && this.pairTeachers != ''){
      let changedEercise : IExercise = {
        exercise_id: this.id,
        schedule_id: this.exercise.schedule_id,
        room_id: this.pairRoom,
        teachers: this.separateToList(this.pairTeachers),
        name: this.pairTitle,
        type: this.pairType,
        pair: this.exercise.pair,
        day: this.exercise.day,
        parity: this.exercise.parity,
      }
      api.putExerciseById(this.id.toString(), changedEercise);
    }
  }
  
}
</script>