import  ScheduleDay  from '../src/components/ScheduleDay.vue';

export default { title: 'Day' };

export const ScheduleDayStorie = () => ({
  components: { ScheduleDay },

  data() {
    const PairExample = {
      exercise_id: 0,
      schedule_id: "0",
      room_id: "0",
      teachers: ["teachers"],
      name: "name",
      type: "type",
      pair: "pair",
      day: "day",
      parity : "2",
    };

    const DayEx = [PairExample, PairExample, PairExample];

    return {
      DayExample : DayEx,
    }
  },
  template: `<schedule-day
              :dayExercises="DayExample"
              :parity="1"
            />`,
});