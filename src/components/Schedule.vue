
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
    <div>
      <!--data table formed in ScheduleTable component-->
      <schedule-table
      v-if = "schedule.length > 0"
      :exercises="schedule[0].exercises"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import * as api from '@/api';
import { Component } from "vue-property-decorator";
import { IGroup, ISchedule } from "@/interfaces";

import ScheduleTable from '@/components/ScheduleTable.vue'

@Component({
  components: {
    ScheduleTable,
  }
})
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


  public async getList() {
    this.groups = await api.getGroups();
  };
  
  public async getSchedule(groupId: string, year: string, semester: string) { // call last
    this.schedule = await api.getSchedule(groupId, year, semester);
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
