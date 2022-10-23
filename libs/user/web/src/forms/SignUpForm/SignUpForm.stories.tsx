import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SignUpForm } from './SignUpForm';

const Story: ComponentMeta<typeof SignUpForm> = {
  component: SignUpForm,
  title: 'SignUpForm',
};
export default Story;

const Template: ComponentStory<typeof SignUpForm> = args => <SignUpForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
