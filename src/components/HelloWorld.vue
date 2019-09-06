<template>
  <v-container>
      <v-row>
        <v-col
          cols="6"
        >
          <v-app>
              <v-data-table
                :headers="table_headers"
                :items="groups"
                :items-per-page="15"
                item-key="number"
                class="elevation-1"
              >.col-6
              <template v-slot:item="props">  
                  <tr @click="getGroupSchedule(props.item.group_id, props.item.number)">
                  <td>{{ props.item.number }}</td>
                  <td>{{ props.item.group_id }}</td>
                  </tr>
              </template>
              </v-data-table>
          </v-app>
          <v-app>
            <v-data-table
              :headers="schedule_headers"
              :items="schedule"
              :items-per-page="15"
              item-key="number"
              class="elevation-1"
            >
            <template v-slot:item="props">
              <td>{{ props.item.exercises.exercise_id }}</td>
              <td>{{ props.item.exercises.schedule_id }}</td>
              <td>{{ props.item.exercises.room_id }}</td>
              <td>{{ props.item.exercises.teachers }}</td>
              <td>{{ props.item.exercises.name }}</td>
              <td>{{ props.item.exercises.type }}</td>
              <td>{{ props.item.exercises.pair }}</td>
              <td>{{ props.item.exercises.day }}</td>
              <td>{{ props.item.exercises.parity }}</td>
            </template>
            </v-data-table>
          </v-app>
        </v-col>
        <v-col>
          <v-app>
              <v-select
                :items="years"
                label="Year"
              ></v-select>
              <v-select
                :items="semesters"
                label="Semester"
              ></v-select>
        </v-app>
        </v-col>
      </v-row>
      <v-row>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {   getGroups   } from '../api';
import {   getScheduleById   } from '../api';
import vuetify from '../plugins/vuetify'; // path to vuetify export
import { Component } from 'vue-property-decorator';
import { GroupInterface } from '../interfaces';
import { ExerciseInterface } from '../interfaces';
import { ScheduleInterface } from '../interfaces';

//         show-select
@Component
export default class GroupList extends Vue {
    groups: Array<GroupInterface> = [];

    semesters = [1, 2, 3, 4, 5, 6, 7, 8];
    years = [2016, 2017, 2018, 2019];

    schedule: Array<ScheduleInterface> = []; // what is "!": https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html

    table_headers : [{ text: string; sortable: boolean; value: string; }, { text: string; value: string; }] = [
      {
        text: 'avalible group number',
        sortable: true,
        value: 'number', // value = key of json
      },
      { text: 'group id', value: 'group_id' }, // value = key of json
    ];

    schedule_headers :
    [{ schedule_id: number; value: number}, {group_id: string; value: string},
    {year: string; value: string}, {semester: string; value: string},
    {exercises: ExerciseInterface; value: ExerciseInterface}] = [
      {schedule_id: 0, value: 0},
      {group_id: 'group_id', value: 'group id'},
      {year: 'year', value: '0000'},
      {semester: 'semester', value: 'semester'},
      {exercises: { exercise_id: 0,
        schedule_id: 'schedule_id',
        room_id: 'room_id',
        teachers: 'teachers',
        name: 'name',
        type: 'type',
        pair: 'pair',
        day: 'day',
        parity: 'parity'}
        , value: { exercise_id: 0,
        schedule_id: 'schedule_id',
        room_id: 'room_id',
        teachers: 'teachers',
        name: 'name',
        type: 'type',
        pair: 'pair',
        day: 'day',
        parity: 'parity'}
      }
    ];

    public async getList() {
        this.groups = await getGroups();
    };
    public async getSchedule(id: string, num: string) {
        this.schedule = await getScheduleById(id, num);
    }

    getGroupSchedule(id: string, num: string){
        console.log('click on group with id: ' + id + ' group number: ' + num);
        this.getSchedule(id, num);
    };

    created() {
        this.getList();
    };
}
</script>
