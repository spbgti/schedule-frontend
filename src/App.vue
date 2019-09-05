<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>SPbGTI-IT</span> Заполнение расписания
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!--  Памятка отрисовка -->
    <v-content>
      <v-card-text>
        <v-list-item>
          <v-list-item-content>
            <v-container>
              <v-subheader>Памятка:</v-subheader>
              <v-list-group dense flat>
                <v-list-item>Название пары - большими буквами, в скобках уточнения (к примеру - срок проведения, элективность)</v-list-item>
                <v-list-item>Типы через запятую с пробелом. Может быть пустым. Типы: к/р; к/р; лек; практ; лаб</v-list-item>
                <v-list-item>Локация - если ничего не указано, то пустое (это тоже самое что и "на кафедре"). В ином случае - кафедра/аудитория/кафедра+аудитория. Пример: АПХП; 55; СА 6; ОХТиК</v-list-item>
                <v-list-item>Преподы. Может быть пустым. Формат через запятую с пробелом Фамилия И.О.. Пример: Иванов М.И.; Петров К.А., Сидорова М.Я.</v-list-item>
                <v-list-item>Если пара сразу на обе недели - позаботьтесь о полностью идентичном виде справа и слева</v-list-item>
                <v-list-item>Часто встречающиеся ошибки: Фамилия без ИО (нужно нагуглить), срок проведения в локации (перенести в название в скобки)</v-list-item>
              </v-list-group>
            </v-container>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
      <!--  Создание таблицы для заполнения расписания -->
      <form @submit.prevent="submitForm">
        <v-card-text>
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="groupId" placeholder="Группа"></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="submitForm" value="Ok">Ок</v-btn>
        </v-card-actions>
      </form>
      <schedule-table v-if="GiveTable == 1" />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import ScheduleTable from "./components/Schedule/ScheduleTable.vue";
// import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: "App",
  components: {
    // HelloWorld,
    ScheduleTable
  },
  data: () => ({
    groupId: 0,
    GiveTable: 0
  }),
  methods: {
    submitForm() {
      console.log(this.groupId);
      if (this.groupId == 471) {
        return (this.GiveTable = 1);
      }
    }
  }
});
</script>
