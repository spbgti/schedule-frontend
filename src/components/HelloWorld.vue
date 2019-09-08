<template>
  <v-container>
      <v-row>
        <v-col>
          <v-card-title>
            <v-text-field
              v-model="search"
              label="Serach group"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="table_headers"
            :items="groups"
            :items-per-page="5"
            item-key="number"
            :search="search"
          >
          <template v-slot:item="props">  
              <tr @click="selectGroup(props.item.group_id, props.item.number)">
              <td>{{ props.item.number }}</td>
              <td>{{ props.item.group_id }}</td>
              </tr>
          </template>
          </v-data-table>
        </v-col>
        <v-col>
          <v-select
            ref = "year_select"
            :items="years"
            label="Year"
          ></v-select>
          <v-select
            ref = "semester_select"
            :items="semesters"
            label="Semester"
          ></v-select>
          <v-btn @click="getGroupSchedule()">
            Get schedules
          </v-btn>
        </v-col>
      </v-row>
      <div v-for="ex in schedule" v-bind:key='ex'>
        <v-data-table
              :headers="schedule_headers"
              :items="ex.exercises"
              :items-per-page="15"
              item-key="number"
            >
            <td>text</td>
            <template v-slot:item="props">
              <tr>
              <td>{{ props.item.exercise_id}}</td>
              <td>{{ props.item.schedule_id }}</td>
              <td>{{ props.item.room_id }}</td>
              <td>{{ props.item.teachers }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.type }}</td>
              <td>{{ props.item.pair }}</td>
              <td>{{ props.item.day }}</td>
              <td>{{ props.item.parity }}</td>
              </tr>
            </template>
        </v-data-table>
      </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { getGroups, getScheduleById } from '../api';
import { Component } from 'vue-property-decorator';
import { GroupInterface, ExerciseInterface, ScheduleInterface } from '../interfaces';

@Component
export default class GroupList extends Vue {
    groups: Array<GroupInterface> = [];

    search: string = '';

    selected_group!: string;
    selected_group_id!: string;

    semesters = [1, 2, 3, 4, 5, 6, 7, 8];

    years = [2016, 2017, 2018, 2019];

    schedule: Array<ScheduleInterface> = [];

    table_headers : [{ text: string; sortable: boolean; value: string; }, { text: string; value: string; }] = [
      {
        text: 'avalible group number',
        sortable: true,
        value: 'number',
      },
      { text: 'group id', value: 'group_id' },
    ];

    schedule_headers :[{ text: string; value: string; }, { text: string; value: string; },
    { text: string; value: string; }, { text: string; value: string; }, 
    { text: string; value: string; }, { text: string; value: string; },
    { text: string; value: string; }, { text: string; value: string; },
    { text: string; value: string; }] = [
      { text: 'exercises id',
        value: 'exercise_id', },
      { text: 'scheduleid',
        value: 'schedule_id', },
      { text: 'room id',
        value: 'room_id', },
      { text: 'teachers',
        value: 'teachers', },
      { text: 'name',
        value: 'name', },
      { text: 'type',
        value: 'type', },
      { text: 'pair',
        value: 'pair', },
      { text: 'day',
        value: 'day', },
      { text: 'parity',
        value: 'parity', },
    ]

/*
    schedule_headers :
    [{ schedule_id: number; value: number}, {group_id: string; value: string},
    {year: string; value: string}, {semester: string; value: string},
    {exercises: ExerciseInterface; value: ExerciseInterface}] = [
      {schedule_id: 0, value: 0},
      {group_id: 'group_id', value: 'group id'},
      {year: 'year', value: '0000'},
      {semester: 'semester', value: 'semester'}, {
        exercises: { 
        exercise_id: 0,
        schedule_id: 'schedule_id',
        room_id: 'room_id',
        teachers: 'teachers',
        name: 'name',
        type: 'type',
        pair: 'pair',
        day: 'day',
        parity: 'parity'
        }
        , value: {
          exercise_id: 0,
          schedule_id: 'schedule_id',
          room_id: 'room_id',
          teachers: 'teachers',
          name: 'name',
          type: 'type',
          pair: 'pair',
          day: 'day',
          parity: 'parity'
        }
      }
    ];
    */

    public async getList() {
      this.groups = await getGroups();
    };
    
    public async getSchedule(id: string, num: string,  year: string, semester: string) { // call last
      this.schedule = await getScheduleById(id, num, year, semester);
    }

    getGroupSchedule(){ // get schedule by click btn
      let year = this.$refs.year_select.initialValue;
      let semester = this.$refs.semester_select.initialValue;
      
      console.log('click on group with id: ' + this.selected_group_id + ' group number: ' + this.selected_group +
      ' year: ' + year + ' semester: ' + semester);
      
      this.getSchedule(this.selected_group_id, this.selected_group, year, semester);
    };

    selectGroup(id: string, num: string){ // set id and group number by click on row
      this.selected_group = num;
      this.selected_group_id = id;
    }

    created() {
      this.getList();
    };
}
</script>
