<template>
<v-data-table
    :headers="headers"
    :items="groups"
    :items-per-page="15"
    item-key="number"
    show-select
    class="elevation-1"
></v-data-table>

</template>

<script lang="ts">
import Vue from 'vue';
import {   getGroups   } from '../api';
import vuetify from '../plugins/vuetify'; // path to vuetify export
import { Component } from 'vue-property-decorator';
import { GroupInterface } from '../interfaces';

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

    created() {
        this.getList();
    };
}
</script>
