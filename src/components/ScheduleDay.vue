<template>
  <v-container>
    <v-card
    >
      <v-row
        v-for="(item, index) in dayExercises"
        :key="index" 
      >
        <v-card
          style="width: 100%"
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
                :name="item.name"
                :type="item.type != null ? item.type : ''"
                :room_id="item.room_id"
                :teachers="item.teachers"
              />
              </v-col>
            </v-list-item>
          </v-list>
        </v-card>
      </v-row>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SchedulePair from '@/components/SchedulePair.vue'
import { IExercise } from "@/interfaces"
import store from "@/store"

@Component({
  name: 'ScheduleDay',
  components: {
    SchedulePair,
  }
})
export default class ScheduleDay extends Vue {
  @Prop( {required: true, type: Array } ) readonly dayExercises!: IExercise[];

  timeOfPairs = [
    ['9:30', '11:10'],
    ['11:30', '13:10'],
    ['14:00', '15:40'],
    ['16:00', '17:40'],
    ['18:00', '19:40'],
    ['time1', 'time2'],
  ];

}

</script>