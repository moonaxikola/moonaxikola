import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SignInForm } from './SignInForm';

const Story: ComponentMeta<typeof SignInForm> = {
  component: SignInForm,
  title: 'SignInForm',
};
export default Story;

const Template: ComponentStory<typeof SignInForm> = args => <SignInForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
