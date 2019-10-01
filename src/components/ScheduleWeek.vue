<template>
  <v-container>
    <!--exercises receives from parent-->
    Понедельник
    <schedule-day
    :dayExercises="daysSchedule[0]"
    :parity="parity"
    />
    Вторник
    <schedule-day
    :dayExercises="daysSchedule[1]"
    :parity="parity"
    />
    Среда
    <schedule-day
    :dayExercises="daysSchedule[2]"
    :parity="parity"
    />
    Четверг
    <schedule-day
    :dayExercises="daysSchedule[3]"
    :parity="parity"
    />
    Пятница
    <schedule-day
    :dayExercises="daysSchedule[4]"
    :parity="parity"
    />
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
  @Prop( {required: true, type: Boolean } ) readonly even!: Boolean;
  

  created(){
    let orderedExercises = this.orderedItems(this.exercises)
    for (let i = 0; i != orderedExercises.length; ++i){
      this.setDaysSchedule(orderedExercises[i]);
    }
  };

  daysSchedule: Array<Array<IExercise>> = [[],[],[],[],[]];

  counter = 0;

  setDaysSchedule(exercise: IExercise){
    switch(exercise.day){
      case "1":
        this.daysSchedule[0].push(exercise);
        break;
      case "2":
        this.daysSchedule[1].push(exercise);
        break;
      case "3":
        this.daysSchedule[2].push(exercise);
        break;
      case "4":
        this.daysSchedule[3].push(exercise);
        break;
      case "5":
        this.daysSchedule[4].push(exercise);
        break;
    }
  }

  parity = this.even ? 2 : 1;


  sortByDay(itemA: IExercise, itemB: IExercise){
    return (parseInt(itemA.day) - parseInt(itemB.day));
  }
  sortByPair(itemA: IExercise, itemB: IExercise){
    if (parseInt(itemA.day) - parseInt(itemB.day) == 0){
      return (parseInt(itemA.pair) - parseInt(itemB.pair));
    } else return 0;
  }

  orderedItems (items : Array<IExercise>) {
    items.sort(this.sortByDay);
    items.sort(this.sortByPair);
    return items;
  }
}

</script>