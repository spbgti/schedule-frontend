<template>
  <v-data-table
    :headers="headers"
    :items="groups"
    :items-per-page="5"
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
    public async getList() {
        let groups: Array<GroupInterface> = [];
        groups = await getGroups();
        console.log(groups)
        for (let key in groups){
            console.log("id: " + groups[key]['group_id'] + " group: " + groups[key]['number'])
        }
    };
    created() {
        this.getList();
    };
    data () {
      return {
        headers: [
          {
            text: 'avalible group number',
            sortable: true,
            value: number,
          },
          { text: 'group id', value: id },
        ],
        groups: [
            // heed to create dynamic data table
          {
            group_num: '111',
            id: 1,
          },
          {
              group_num: '222',
              id: 2,
          },
          {
              group_num: '333',
              id: 3,
          },
          {
              group_num: '444',
              id: 4,
          },
          {
              group_num: '555',
              id: 5,
          },
          //
        ],
      }
  };
}
/*
export default {

    data () {
      return {
        headers: [
          {
            text: 'avalible group number',
            sortable: true,
            value: 'group_num',
          },
          { text: 'group id', value: 'id' },
        ],
        groups: [
            //
          {
            group_num: '111',
            id: 1,
          },
          {
              group_num: '222',
              id: 2,
          },
          {
              group_num: '333',
              id: 3,
          },
          {
              group_num: '444',
              id: 4,
          },
          {
              group_num: '555',
              id: 5,
          },
          //
        ],
      }
    },
}
*/

/*
//
<v-app>
   <v-content>
       <v-container>
           <!-- Test page components here -->
       </v-container>
   </v-content>
</v-app>
//
export default Vue.extend({
    data: () => ({
    }),
    created() {
        getGroups();
    }
});
*/
</script>
