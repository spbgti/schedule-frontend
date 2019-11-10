<template>
  <v-container
    v-if="rendered"
  >
    <v-row>
      <v-card
        v-if="type != ''"
        class="font-weight-black"
        :elevation="0"
      >
        {{ name }}, {{ type }}
      </v-card>
      <v-card
        v-if="type == ''"
        class="font-weight-black"
        :elevation="0"
      >
        {{ name }}
      </v-card>
    </v-row>
    <v-row>
      <v-card
        :elevation="0"
        >
          Ауд: {{ room.name }}, {{ location.name }};&#160
        </v-card>
      <v-card
        class="font-italic"
        :elevation="0"
        v-for="(teacher, index) in teachers"
        :key="index"
      >
        {{ teacher }}&#160
      </v-card>
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
  @Prop( {required: true, type: String } ) readonly name!: string;
  @Prop( {required: true, type: String } ) readonly type!: string;
  @Prop( {required: true, type: Number } ) readonly room_id!: number;
  @Prop( {required: true, type: Array } ) readonly teachers!: Array<string>;
  
  room!: IRoom;
  location!: ILocation;
  rendered: boolean = false;

  async getRoom(){
    this.room = await api.getRoomById(this.room_id.toString());
  }

  async getLocation(){
    this.location = await api.getLocationById(this.room.location_id.toString());
  }

  async created(){
    await this.getRoom();
    await this.getLocation();
    this.rendered = true;
  }

}
</script>