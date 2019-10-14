import Vue from "vue";
import Vuex from "vuex";
import { IExercise } from "@/interfaces"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentDayExercises : Array<IExercise>()
  },
  mutations: {
    addDayEx(state, dayEx: Array<IExercise>){
      state.currentDayExercises = dayEx;
    }
  },
  actions: {
    addDayEx(context, dayEx: Array<IExercise>){
      context.commit('addDayEx', dayEx);
    }
  }
});
