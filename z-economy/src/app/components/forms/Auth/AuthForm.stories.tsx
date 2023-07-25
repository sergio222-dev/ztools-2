import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AuthForm } from './AuthForm';

export default {
  title: 'Forms/AuthForm',
  component: AuthForm,
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = () => <AuthForm />;

export const Primary = Template.bind({});

Primary.args = {};
