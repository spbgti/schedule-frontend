<template>
  <v-container
  >
    <!--exercises receives from parent-->
    Понедельник
    <v-row
      class="d-flex align-stretch"
    >
      <v-col>
        <schedule-day
        :dayExercises="evenDaysSchedule[0]"
        />
      </v-col>
      <v-col>
        <schedule-day
        :dayExercises="oddDaysSchedule[0]"
        />
      </v-col>
    </v-row>
    Вторник
    <v-row
      class="d-flex align-stretch"
    >
      <v-col>
        <schedule-day
        :dayExercises="evenDaysSchedule[1]"
        />
      </v-col>
      <v-col>
        <schedule-day
        :dayExercises="oddDaysSchedule[1]"
        />
      </v-col>
    </v-row>
    Среда
    <v-row
      class="d-flex align-stretch"
    >
      <v-col>
        <schedule-day
        :dayExercises="evenDaysSchedule[2]"
        />
      </v-col>
      <v-col>
        <schedule-day
        :dayExercises="oddDaysSchedule[2]"
        />
      </v-col>
    </v-row>
    Четверг
    <v-row
      class="d-flex align-stretch"
    >
      <v-col>
        <schedule-day
        :dayExercises="evenDaysSchedule[3]"
        />
      </v-col>
      <v-col>
        <schedule-day
        :dayExercises="oddDaysSchedule[3]"
        />
      </v-col>
    </v-row>
    Пятница
    <v-row
      class="d-flex align-stretch"
    >
      <v-col>
        <schedule-day
        :dayExercises="evenDaysSchedule[4]"
        />
      </v-col>
      <v-col>
        <schedule-day
        :dayExercises="oddDaysSchedule[4]"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IExercise } from "@/interfaces"
import ScheduleDay from '@/components/ScheduleDay.vue'

@Component({
  name: 'ScheduleWeek',
  components: {
    ScheduleDay,
  }
})
export default class ScheduleWeek extends Vue {
  @Prop( {required: true, type: Array } ) readonly exercises!: IExercise[];
  

  created(){
    this.excludedParity = "2";
    let orderedExercises = this.orderedItems(this.exercises)
    for (let i = 0; i != orderedExercises.length; ++i){
      this.setDaysSchedule(orderedExercises[i], "!2");
    }
    this.excludedParity = "1";
    orderedExercises = this.orderedItems(this.exercises)
    for (let i = 0; i != orderedExercises.length; ++i){
      this.setDaysSchedule(orderedExercises[i], "!1");
    }
  };

  evenDaysSchedule: Array<Array<IExercise>> = [[],[],[],[],[]]; // chetn
  oddDaysSchedule: Array<Array<IExercise>> = [[],[],[],[],[]];

  counter = 0;

  setDaysSchedule(exercise: IExercise, parity: string) {
    
    let daysShedule : Array<Array<IExercise>> = [[],[],[],[],[]];
    switch(parity){
      case "!2":
        daysShedule = this.evenDaysSchedule;
        break;
      case "!1":
        daysShedule = this.oddDaysSchedule;
        break;
    }
    let dayIdx = parseInt(exercise.day) - 1;
    if (daysShedule && dayIdx >= 0 && dayIdx <= 5){
      daysShedule[dayIdx].push(exercise)
    }
    switch(parity){
      case "!2":
        this.evenDaysSchedule.push(daysShedule[0]);
        break;
      case "!1":
        this.oddDaysSchedule.push(daysShedule[0]);
        break;
    }
  }

  // this parity is anti-parity for schedule: use it line neededParity != thisParity
  excludedParity: string = "";


  sortByDay(itemA: IExercise, itemB: IExercise){
    return (parseInt(itemA.day) - parseInt(itemB.day));
  }
  sortByPair(itemA: IExercise, itemB: IExercise){
    if (parseInt(itemA.day) - parseInt(itemB.day) == 0){
      return (parseInt(itemA.pair) - parseInt(itemB.pair));
    } else return 0;
  }

  filterByParity(items: Array<IExercise>){
    let filtred = items.filter(item => item.parity != this.excludedParity);
    return filtred;
  }

  orderedItems (items: Array<IExercise>) {
    items = this.filterByParity(items);
    items.sort(this.sortByDay);
    items.sort(this.sortByPair);
    return items;
  }
}

</script>