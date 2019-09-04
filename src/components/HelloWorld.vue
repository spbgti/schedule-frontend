<template>
  <v-container>
      <v-row fluid>
         <v-app>
            <v-data-table
              :headers="table_headers"
              :items="groups"
              :items-per-page="15"
              item-key="number"
              class="elevation-1"
            >
            <template v-slot:item="props">
                <tr @click="getGroupSchedule(props.item.group_id, props.item.number)">
                <td>{{ props.item.number }}</td>
                <td>{{ props.item.group_id }}</td>
                </tr>
            </template>
            </v-data-table>
        </v-app>
        <v-data-table
          :headers="schedule_headers"
          :item="schedule"
          :items-per-page="15"
          item-key="number"
          class="elevation-1"
        >
        <template v-slot:item="props">
            <td>{{ props.item.name }}</td>
        </template>
        </v-data-table>
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
import { ScheduleInterface } from '../interfaces';

//         show-select
@Component
export default class GroupList extends Vue {
    groups: Array<GroupInterface> = [];

    schedule: Array<ScheduleInterface> = [{
        exercise_id: 0,
        schedule_id: 'space',
        room_id: 'space',
        teachers: 'space',
        name: 'space',
        type: 'space',
        pair: 'space',
        day: 'space',
        parity: 'space',
    }]; // what is "!": https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html

    table_headers : [{ text: string; sortable: boolean; value: string; }, { text: string; value: string; }] = [
      {
        text: 'avalible group number',
        sortable: true,
        value: 'number', // value = key of json
      },
      { text: 'group id', value: 'group_id' }, // value = key of json
    ];

    schedule_headers :
    [{ ex_id: string; value: string; }, { sced_id: string; value: string; }, { room_id: string; vlaue: string; },
     { teachres: string; value: string; }, { name: string; value: string; }, { type: string; value: string; },
     { pair: string; value: string; }, { day: string; value: string; }, { parity: string; value: string; }] = [
        { ex_id: 'ex id', value: 'exercise_id' },
        { sced_id: 'sced id', value: 'schedule_id'},
        { room_id: 'room id', vlaue: 'room_id'},
        { teachres: 'teachers', value: 'teachers'},
        { name: 'name', value: 'name'},
        { type: 'type', value: 'type'},
        { pair: 'pair', value: 'pair'},
        { day: 'day', value: 'day'},
        { parity: 'parity', value: 'parity'},
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
