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
          :headers="tableHeaders"
          :items="groups"
          :items-per-page="5"
          item-key="number"
          :search="search"
        >
        <template v-slot:item="props">
          <tr
          @click="selectGroup(props.item.group_id, props.item.number, props)"
          :style="[selectedNumber === props.item.group_id ? {'background': 'rgba(68, 219, 252, 0.2)'} : {'background': '#FFF'}]"
          >
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
    Чтобы сортировать полученное расписание, выполни сортировку по id 
    <div v-for="ex in schedule" v-bind:key="ex">
      <v-data-table
            :headers="scheduleHeaders"
            :items="ex.exercises"
            :items-per-page="15"
            item-key="items.key"
          >
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
import Vue from "vue";
import { getGroups, getScheduleByAPI } from "@/api";
import { Component } from "vue-property-decorator";
import { IGroup, ISchedule } from "@/interfaces";

@Component
export default class GroupList extends Vue {
  groups: Array<IGroup> = [];

  selectedNumber: number = 0;

  search: string = "";

  selectedGroupId!: string;

  semesters = [1, 2]; // year-like semesters

  currentYear = new Date().getFullYear();
  years = [this.currentYear-3, this.currentYear-2, this.currentYear-1, this.currentYear];

  schedule: Array<ISchedule> = [];

  tableHeaders = [
    {
      text: "avalible group number",
      sortable: true,
      value: "number",
    },
    { text: "group id", value: "group_id" },
  ];

  scheduleHeaders = [
    { text: "exercises id",
      value: "exercise_id", },
    { text: "schedule id",
      value: "schedule_id", },
    { text: "room id",
      value: "room_id", },
    { text: "teachers",
      value: "teachers", },
    { text: "name",
      value: "name", },
    { text: "type",
      value: "type", },
    { text: "pair",
      value: "pair", },
    { text: "day",
      value: "day", },
    { text: "parity",
      value: "parity", },
  ];

  public async getList() {
    this.groups = await getGroups();
  };
  
  public async getSchedule(groupId: string, year: string, semester: string) { // call last
    this.schedule = await getScheduleByAPI(groupId, year, semester);
  }

  getGroupSchedule(){ // get schedule by click btn
    let year = (this.$refs.year_select as Vue & { initialValue: () => number }).initialValue.toString();
    let semester = (this.$refs.semester_select as Vue & { initialValue: () => number}).initialValue.toString();
    this.getSchedule(this.selectedGroupId, year, semester);
  };

  selectGroup(groupId: string, index: any){ // set id and group number by click on row
    this.selectedGroupId = groupId;
    this.selectedNumber = Number(groupId);
  }

  created() {
    this.getList();
  };
}
</script>
