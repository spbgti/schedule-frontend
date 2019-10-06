import { withKnobs, text, number, array } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';

import  ScheduleDay  from '../src/components/ScheduleDay.vue';

export default { title: 'Day stories' };

const stories = storiesOf('Storybook Knobs', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

stories.add('Day example', () => ({
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
            />`,
}));

stories.add('Day sandbox', () => ({
  components: { ScheduleDay },
  data() {
    const PairExample = {
      exercise_id: 0,
      schedule_id: "0",
      room_id: 0,
      teachers: ["teachers"],
      name: "name",
      type: "type",
      pair: "pair",
      day: "day",
      parity : "2",
    };
    return {
      generateArr: function (item, amount){
        if (amount <= 6) {
          let arr = [];
          console.log('in gener f, item='+item+" amount="+amount)
          for (let i = 0; i < amount; ++i){
            arr.push(item);
            console.log('push '+ item)
          }
          return arr;
        }
      },
      PairExample : PairExample,
    };
  },
  props: {
    Amount : {
      default: number('Amount of pairs', 4)
    }
  }, 
  template: `<schedule-day
              :dayExercises="generateArr(PairExample, Amount)"
            />`,
}));
