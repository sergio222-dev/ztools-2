import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = arguments_ => <Button {...arguments_} />;

export const Primary = Template.bind({});

Primary.args = {
  children: 'Boton xd',
};
