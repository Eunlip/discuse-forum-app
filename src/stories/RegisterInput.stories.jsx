import React from 'react';
import { RegisterInput } from '../components/Input';

export default {
  title: 'RegisterInput', // changed from 'LoginInput' to 'RegisterInput'
  component: RegisterInput,
  tags: ['autodocs'],
};

function TemplateStory(args) {
  return <RegisterInput {...args} />;
}

export const Default = TemplateStory.bind({});
Default.args = {
  register: (credentials) => {
    if (!credentials.username) {
      alert('Username cannot be empty');
    }
  },
  defaultName: '',
  defaultEmail: '',
  defaultPassword: '',
};

export const ShowEmailRegisterNotValidAlert = TemplateStory.bind({});
ShowEmailRegisterNotValidAlert.args = {
  register: (credentials) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!credentials.email || !emailRegex.test(credentials.email)) {
      alert('"Email" must be a valid email');
    }
  },
  defaultName: 'Saya',
  defaultEmail: 'test',
  defaultPassword: '',
};

export const ShowPasswordRegisterLessThan6Alert = TemplateStory.bind({});
ShowPasswordRegisterLessThan6Alert.args = {
  register: (credentials) => {
    if (!credentials.email || !credentials.password.length < 6) {
      alert('Password must be at least 6 characters long.');
    }
  },
  defaultName: 'Saya',
  defaultEmail: 'test@example.com',
  defaultPassword: '12345',
};

export const ShowSuccessRegisterAlert = TemplateStory.bind({});
ShowSuccessRegisterAlert.args = {
  register: (credentials) => {
    if (!credentials.email || !credentials.password) {
      alert('Email and password cannot be empty');
    } else {
      alert('Register Success');
      alert('Redirecting to LoginPage...');
    }
  },
  defaultName: 'Saya',
  defaultEmail: 'test@example.com',
  defaultPassword: '1234567890',
};
