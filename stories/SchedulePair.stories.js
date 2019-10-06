import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';

import  SchedulePair  from '../src/components/SchedulePair.vue';

export default { title: 'Pair' };

const stories = storiesOf('Storybook Knobs', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

// Assign `props` to the story's component, calling
// knob methods within the `default` property of each prop,
// then pass the story's prop data to the component’s prop in
// the template with `v-bind:` or by placing the prop within
// the component’s slot.
stories.add('SchedulePairStorie', () => ({
  components: { SchedulePair },
  data() {
    return {
    PairExample : {
          exercise_id: 0,
          schedule_id: "0",
          room_id: props.room_id_prop,
          teachers: ["teachers"],
          name: "name",
          type: "type",
          pair: "0",
          day: "day",
          parity : "2",
        },
    }
  },
  props: {
    room_id_prop: {
      default: text('room id', "0")
    },
  },
  template: `<schedule-pair
              :exercise="PairExample"
              :parity="1"
            />`,
}));

/*
export interface IExercise {
    exercise_id: number;
    schedule_id: string;
    room_id: string;
    teachers: string;
    name: string;
    type: string;
    pair: string;
    day: string;
    parity: string;
}
*/
