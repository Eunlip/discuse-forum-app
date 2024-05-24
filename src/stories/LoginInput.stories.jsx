import React from 'react';
import { LoginInput } from '../components/Input';

export default {
  title: 'LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
};

function TemplateStory(args) {
  return <LoginInput {...args} />;
}

export const ShowEmailAndPasswordAlert = TemplateStory.bind({});
ShowEmailAndPasswordAlert.args = {
  login: (credentials) => {
    if (!credentials.email || !credentials.password) {
      alert('Email and password cannot be empty');
    }
  },
  defaultEmail: '',
  defaultPassword: '',
};

export const ShowEmailNotValidAlert = TemplateStory.bind({});
ShowEmailNotValidAlert.args = {
  login: (credentials) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!credentials.email || !emailRegex.test(credentials.email)) {
      alert('"Email" must be a valid email');
    }
  },
  defaultEmail: 'test',
  defaultPassword: '',
};

export const ShowPasswordAlert = TemplateStory.bind({});
ShowPasswordAlert.args = {
  login: (credentials) => {
    if (!credentials.email || !credentials.password) {
      alert('Password cannot be empty');
    }
  },
  defaultEmail: 'prefilled@example.com',
  defaultPassword: '',
};

export const ShowAlertEmailAndPasswordWrong = TemplateStory.bind({});
ShowAlertEmailAndPasswordWrong.args = {
  login: (credentials) => {
    if (credentials.email !== 'correctEmail@example.com' || credentials.password !== 'correctPassword') {
      alert('Email or password is incorrect');
    }
  },
  defaultEmail: 'test',
  defaultPassword: '123456',
};

export const ShowSuccesLoginAlert = TemplateStory.bind({});
ShowSuccesLoginAlert.args = {
  login: (credentials) => {
    const defaultEmail = 'test@example.com';
    const defaultPassword = '1234567890';

    if (!credentials.email || !credentials.password) {
      alert('Email and password cannot be empty');
    } else if (credentials.email !== defaultEmail || credentials.password !== defaultPassword) {
      alert('Email or password is incorrect');
    } else {
      alert('Login Success');
      alert('Redirecting to ThreadPage...');
    }
  },
  defaultEmail: 'test@example.com',
  defaultPassword: '1234567890',
};
