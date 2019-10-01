<template>
  <v-data-iterator
    :items="dayExercises"
    :items-per-page="6"
  >
  <template v-slot:default="props">
      <v-row
        v-for="(item, index) in props.items"
        :key="index" 
      >
        <v-card
          style="width: 100%"
          v-if="item.parity != parity"
        >
          <v-list>
            <v-list-item>
              <!--md "auto" makes variable size with contetn-->
              <v-col
                md="auto"
                class="text-center"
              >
                {{ timeOfPairs[index][0] }}<br/>
                -<br/>
                {{ timeOfPairs[index][1] }}<br/>
              </v-col>
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

  timeOfPairs = [['9:30', '11:10'], ['11:30', '13:10'], ['14:00', '15:40'], ['16:00', '17:40']];

}

</script>