<template>
  <v-container>
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
    <v-btn>Send to server</v-btn>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IExercise } from "@/interfaces"
@Component
export default class SchedulePair extends Vue {
  @Prop( {required: true, type: String } ) readonly name!: String;
  @Prop( {required: true, type: String } ) readonly type!: String;
  @Prop( {required: true, type: Number } ) readonly room_id!: Number;
  @Prop( {required: true, type: Array } ) readonly teachers!: Array<String>;

  pairTitle!: string;
  pairType!: string;
  pairRoom!: string;
  pairTechers!: string;
  
}
</script>