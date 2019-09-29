<template>
  <v-container>
    <!--exercises receives from parent-->
    <div
    v-for="(ex, index) in orderedItems(exercises)"
    :key="index"
    >
      <schedule-day
      :exercise="ex"
      :parity="parity"
      />
    </div>
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
  @Prop( {required: true, type: Array } ) readonly exercises!: IExercise;
  @Prop( {required: true, type: Boolean } ) readonly even!: Boolean;
  
  parity = this.even ? 2 : 1;

  sortByDay(itemA: IExercise, itemB: IExercise){
    return (parseInt(itemA.day) - parseInt(itemB.day));
  }
  sortByPair(itemA: IExercise, itemB: IExercise){
    if (parseInt(itemA.day) - parseInt(itemB.day) == 0){
      return (parseInt(itemA.pair) - parseInt(itemB.pair));
    } return 0;
  }

  orderedItems (items : Array<IExercise>) {
    items.sort(this.sortByDay);
    items.sort(this.sortByPair);
    return items;
  }
}

</script>