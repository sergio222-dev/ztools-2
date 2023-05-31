import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Auth } from './Auth';

export default {
  title: 'Forms/Auth',
  component: Auth,
} as ComponentMeta<typeof Auth>;

const Template: ComponentStory<typeof Auth> = () => <Auth />;

export const Primary = Template.bind({});

Primary.args = {};
