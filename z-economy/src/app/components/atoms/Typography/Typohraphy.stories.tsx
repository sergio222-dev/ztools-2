import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Typography } from './Typography';

export default {
  title: 'Atoms/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = arguments_ => <Typography {...arguments_} />;

export const Primary = Template.bind({});

Primary.args = {
  children: 'Texto de ejemplo XD',
};
