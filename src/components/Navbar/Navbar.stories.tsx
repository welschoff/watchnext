import React from 'react';
import Navbar from './Navbar';

export default {
  component: Navbar,
  title: 'Components/Navbar',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => <Navbar />;
