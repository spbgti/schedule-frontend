<template>
  <v-data-iterator
    :items="dayExercises"
    :items-per-page="4"
  >
  <template v-slot:default="props">
      <v-row
        v-for="(item, index) in props.items"
        :key="index" 
      >
        <v-card>
          <v-list>
            <v-list-item>
              <v-col>
                <schedule-pair
                  :exercise="item"
                  :parity="parity"
                />
              </v-col>
            </v-list-item>
          </v-list>
        </v-card>
      </v-row>
    </template>
  </v-data-iterator>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SchedulePair from '@/components/SchedulePair.vue'
import { IExercise } from "@/interfaces"

@Component({
  name: 'ScheduleDay',
  components: {
    SchedulePair,
  }
})
export default class ScheduleDay extends Vue {
  @Prop( {required: true, type: Array } ) readonly dayExercises!: IExercise[];
  @Prop( {required: true, type: Number } ) readonly parity!: Number;

}

/*
v-for="(day, index) in dayExercises"
    :key="'day'+index"
    >
      <schedule-pair
      :exercise="day"
      :parity="parity"
      />
//
              <v-col
                md="auto"
              >
                <v-card
                  class="pa-2"
                  outlined
                  tile
                >
                  №{{ index + 1}}      
                </v-card>
              </v-col>
//
<v-container fluid>
      <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :footer-props="{ itemsPerPageOptions }"
      >
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title><h4>{{ item.name }}</h4></v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Calories:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.calories }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Fat:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.fat }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Carbs:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.carbs }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Protein:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.protein }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Sodium:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.sodium }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Calcium:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.calcium }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Iron:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.iron }}</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
*/
</script>