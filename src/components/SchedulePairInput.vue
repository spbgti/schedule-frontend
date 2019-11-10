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
        v-model="pairRoomId"
        label="room"
        :placeholder="pairRoomIdPlaceholder"
      ></v-text-field>
      <v-text-field
        v-model="pairTeachers"
        label="teachers(separate by ',')"
        :placeholder="pairTeachersString"
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
  @Prop( {required: true, type: Number } ) readonly room_id!: number;
  @Prop( {required: true, type: Array } ) readonly teachers!: Array<string>;
  @Prop( {required: true, type: Number } ) readonly id!: number;
  @Prop( {required: true, type: Object } ) readonly exercise!: IExercise;

  pairTitle: string = '';
  pairType: string = '';
  pairRoomId: string = '';
  pairTeachers: string = '';

  pairRoomIdPlaceholder: string = this.room_id.toString();
  pairTeachersString: string = this.teachers.join();

  separateToList(str: string) { // separate teachers string to array by "," delimeter
    let splited = str.replace(/,/g, '');
    console.log('replaced:' + splited);
    let splitedStr = splited.split(' ');
    return splitedStr.filter(item => item != ' ' && item != '');
  }

  updateExercise(){
    console.log('update request: ' + this.pairTitle + ' ' + this.pairType + ' ' + this.pairRoomId.toString() + ' ' + this.separateToList(this.pairTeachers));
    if (this.pairTitle != '' && this.pairType != '' && this.pairRoomId != '' && this.pairTeachers != ''){
      let changedEercise : IExercise = {
        exercise_id: this.id,
        schedule_id: this.exercise.schedule_id,
        room_id: parseInt(this.pairRoomId),
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