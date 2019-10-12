<template>
  <v-container>
    <v-row>
      <v-card
        class="font-weight-black"
        :elevation="0"
        v-if="type != ''"
      >{{ name }}, {{ type }}</v-card>
      <v-card
        class="font-weight-black"
        :elevation="0"
        v-if="type == ''"
      >{{name}}</v-card>
    </v-row>
    <v-row>
      <v-card
        :elevation="0"
        >Ауд: {{ room_id }};&#160</v-card>
      <v-card
        class="font-italic"
        :elevation="0"
        v-for="(teacher, index) in teachers"
        :key="index"
      >{{ teacher }}&#160</v-card>
    </v-row>
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
  
}
</script>