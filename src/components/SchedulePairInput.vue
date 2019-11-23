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
      <v-row>
        <v-btn
          v-if="sendType=='old'"
          @click="updateExercise"
        >Send to server</v-btn>
                <v-btn
          v-if="sendType=='new'"
          @click="postExercise"
        >Add new</v-btn>
      </v-row>
      <v-row>
        <v-col>
          if room dosn't exist - add new room
          <v-text-field
            v-model="newRoom"
            label="Add new room here"
          ></v-text-field>
          <v-autocomplete
            ref="selected_location"
            :items="avalibleLocationsNames"
            autocomplete
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-btn
            @click="addNewRoom"
          >Add new room</v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IExercise, IRoom, ILocation } from "@/interfaces"
import * as api from '@/api';

@Component
export default class SchedulePair extends Vue {
  @Prop( {required: true, type: String } ) readonly sendType!: string;
  @Prop( {required: true, type: String } ) readonly name!: string;
  @Prop( {required: true, type: String } ) readonly type!: string;
  @Prop( {required: true, type: Number } ) readonly room_id!: number;
  @Prop( {required: true, type: Array } ) readonly teachers!: Array<string>;
  @Prop( {required: true, type: Number } ) readonly id!: number;
  @Prop( {required: true, type: Object } ) readonly exercise!: IExercise;

  newRoom: string = '';

  pairTitle: string = this.name;
  pairType: string = this.type;
  pairRoomId: string = this.room_id.toString();
  pairTeachers: string = this.teachers.join(', ');

  avalibleRooms: Array<IRoom> = [];
  avalibleRoomsNames : Array<string> = [];
  avalibleLocations: Array<ILocation> = [];
  avalibleLocationsNames: Array<string> = [];

  pairRoomIdPlaceholder: string = this.room_id.toString();
  pairTeachersString: string = this.teachers.join();

  addNewRoom(){
    if (this.newRoom != ''){
      let selected_location = (this.$refs.selected_location as Vue & { initialValue: () => string}).initialValue.toString().toString();
      let selected_location_id = this.findIdByNameInLocations(this.avalibleLocations, selected_location);
      if (selected_location_id != this.nullCode){
        api.postRoom(this.newRoom, selected_location_id);
      }
    }
    this.$forceUpdate();
  }

  nullCode: number = 404; // wtf heed new code for not found

  findIdByNameInLocations(location: Array<ILocation>,name: string) {
    for (let i = 0; i!= location.length; ++i) {
      if (location[i].name == name){
        return location[i].location_id;
      }
    }
    return this.nullCode; 
  }

  separateToList(str: string) { // separate teachers string to array by "," delimeter
    let splited = str.replace(/,/g, ' ');
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

  findRoomIdByName(name: string){ // return 0 if not found
    for (let i = 0; i != this.avalibleRooms.length; ++i) {
      if (this.avalibleRooms[i].name == name){
        return this.avalibleRooms[i].room_id;
      }
    }
    return 0;
  }

  updateExercise(){
    // later here should be opor. to send only one field without changing others
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

  postExercise(){
    console.log('post)))');
  }

  getNamesByRooms(rooms: Array<IRoom>){
    for (let i = 0; i != rooms.length; ++i){
      this.avalibleRoomsNames.push(rooms[i].name);
    }
  }

  getNamesByLocations(locations: Array<ILocation>){
    for (let i = 0; i != locations.length; ++i){
      this.avalibleLocationsNames.push(locations[i].name);
    }
  }

  async created(){
    this.avalibleRooms = await api.getRooms();
    this.getNamesByRooms(this.avalibleRooms);
    this.avalibleLocations = await api.getLocations();
    this.getNamesByLocations(this.avalibleLocations);
  }
  
}
</script>