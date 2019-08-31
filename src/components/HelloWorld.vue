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

@Component
export default class GroupList extends Vue {
    public async getList() {
        this.groups = await.getGroups();
    }
}

export default {
    created() {
        GroupList.getList();
    },
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
