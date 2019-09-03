<template>
  <v-container>
     <v-app>
        <v-btn @click="getGroupSchedule">btn</v-btn>
        <v-data-table
          :headers="headers"
          :items="groups"
          :items-per-page="15"
          item-key="number"
          class="elevation-1"
        >
        <template v-slot:item="props">
            <tr @click="getGroupSchedule(props.item.group_id)">
            <td>{{ props.item.group_id }}</td>
            <td>{{ props.item.number }}</td>
            </tr>
        </template>
        </v-data-table>
    </v-app>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {   getGroups   } from '../api';
import vuetify from '../plugins/vuetify'; // path to vuetify export
import { Component } from 'vue-property-decorator';
import { GroupInterface } from '../interfaces';
//         show-select
@Component
export default class GroupList extends Vue {
    groups: Array<GroupInterface> = [];
    headers : [{ text: string; sortable: boolean; value: string; }, { text: string; value: string; }] = [
      {
        text: 'avalible group number',
        sortable: true,
        value: 'number', // value = key of json
      },
      { text: 'group id', value: 'group_id' }, // value = key of json
    ];

    public async getList() {
        this.groups = await getGroups();
        /* // delete if is not necessari from <here>
        console.log(this.groups);
        for (let key in this.groups){
            console.log("id: " + this.groups[key]['group_id'] + " group: " + this.groups[key]['number']);
        }
        */ // to <here>
    };

    getGroupSchedule(id){
        console.log('click' + id);
    };

    created() {
        this.getList();
    };
}
</script>
