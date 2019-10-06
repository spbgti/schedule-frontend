import { withKnobs, text, number, array } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';

import  SchedulePair  from '../src/components/SchedulePair.vue';

export default { title: 'Pair stories' };

const stories = storiesOf('Pair', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

// Assign `props` to the story's component, calling
// knob methods within the `default` property of each prop,
// then pass the story's prop data to the component’s prop in
// the template with `v-bind:` or by placing the prop within
// the component’s slot.
stories.add('Pair sandbox', () => ({
  components: { SchedulePair },
  props: {
    name : {
      default: text('name', 'name')
    },
    type :{
      default: text('type', 'type')
    },
    room_id: {
      default: number('room id', 0)
    },
    teachers: {
      default: array('teachers', ['teacher'])
    },
  },
  template: `<schedule-pair
              :name="name"
              :type="type"
              :room_id="room_id"
              :teachers="teachers"
            />`,
}));



