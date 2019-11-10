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
        :dayExercises="evenDaysSchedule['monday']"
        :type="type"
        />
      </v-col>
      <v-col>
        <schedule-day
        :dayExercises="oddDaysSchedule['monday']"
        :type="type"
        />
      </v-col>
    </v-row>
    Вторник
    <v-row
      class="d-flex align-stretch"
    >
      <v-col>
        <schedule-day
        :dayExercises="evenDaysSchedule['tuesday']"
        :type="type"
        />
      </v-col>
      <v-col>
        <schedule-day
        :dayExercises="oddDaysSchedule['tuesday']"
        :type="type"
        />
      </v-col>
    </v-row>
    Среда
    <v-row
      class="d-flex align-stretch"
    >
      <v-col>
        <schedule-day
        :dayExercises="evenDaysSchedule['wednesday']"
        :type="type"
        />
      </v-col>
      <v-col>
        <schedule-day
        :dayExercises="oddDaysSchedule['wednesday']"
        :type="type"
        />
      </v-col>
    </v-row>
    Четверг
    <v-row
      class="d-flex align-stretch"
    >
      <v-col>
        <schedule-day
        :dayExercises="evenDaysSchedule['thursday']"
        :type="type"
        />
      </v-col>
      <v-col>
        <schedule-day
        :dayExercises="oddDaysSchedule['thursday']"
        :type="type"
        />
      </v-col>
    </v-row>
    Пятница
    <v-row
      class="d-flex align-stretch"
    >
      <v-col>
        <schedule-day
        :dayExercises="evenDaysSchedule['friday']"
        :type="type"
        />
      </v-col>
      <v-col>
        <schedule-day
        :dayExercises="oddDaysSchedule['friday']"
        :type="type"
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
  @Prop( {required: true, type: String } ) readonly type!: string;
  

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

  evenDaysSchedule: {[day: string]: Array<IExercise>} = {'monday': [], 'tuesday': [], 'wednesday': [], 'thursday': [],'friday': []}; // chetn
  oddDaysSchedule: {[day: string]: Array<IExercise>} = {'monday': [], 'tuesday': [], 'wednesday': [], 'thursday': [],'friday': []}; // словаря (Map/object) с полями-номерами
  daysStringByNumber :Array<string> = ['monday', 'tuesday', 'wednesday', 'thursday','friday'];
  counter = 0;

  setDaysSchedule(exercise: IExercise, parity: string) {
    
    let daysShedule : {[day: string]: Array<IExercise>} = {'monday': [], 'tuesday': [], 'wednesday': [], 'thursday': [],'friday': []};
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
      daysShedule[this.daysStringByNumber[dayIdx]].push(exercise)
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