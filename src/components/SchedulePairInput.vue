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
      <v-autocomplete
        ref="selected_room"
        :items="avalibleRoomsNames"
        :item="name"
        label="Select room"
        autocomplete
      ></v-autocomplete>
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
import { IExercise, IRoom } from "@/interfaces"
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

  avalibleRooms: Array<IRoom> = [];
  avalibleRoomsNames : Array<string> = [];

  pairRoomIdPlaceholder: string = this.room_id.toString();
  pairTeachersString: string = this.teachers.join();

  separateToList(str: string) { // separate teachers string to array by "," delimeter
    let splited = str.replace(/,/g, '');
    console.log('replaced:' + splited);
    let splitedStr = splited.split(' ');
    return splitedStr.filter(item => item != ' ' && item != '');
  }

  isSelectedRoomPresented() {
    if (this.avalibleRoomsNames.includes((this.$refs.selected_room as Vue & { initialValue: () => string}).initialValue.toString())){ // idk how it works ¯\_(ツ)_/¯
      return true;
    }
    return false;
  }

  findRoomIdByName(name: string){
    for (let i = 0; i != this.avalibleRooms.length; ++i){
      if (this.avalibleRooms[i].name == name){
        return this.avalibleRooms[i].room_id;
      }
    }
    return 0;
  }

  updateExercise(){
    // later here should be opor. to send only one field without changing others
    console.log('presented:' + this.isSelectedRoomPresented());
    this.pairRoomId = this.findRoomIdByName((this.$refs.selected_room as Vue & { initialValue: () => string}).initialValue.toString()).toString();
    console.log('update request: ' + this.pairTitle + ' ' + this.pairType + ' ' + this.pairRoomId.toString() + ' ' + this.separateToList(this.pairTeachers));
    if (this.pairTitle != '' && this.pairType != '' && this.pairRoomId != '0' && this.pairTeachers != ''){
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

  getNamesByRooms(rooms: Array<IRoom>){
    for (let i = 0; i != rooms.length; ++i){
      this.avalibleRoomsNames.push(rooms[i].name);
    }
  }

  async created(){
    this.avalibleRooms = await api.getRooms();
    this.getNamesByRooms(this.avalibleRooms);
  }
  
}
</script>