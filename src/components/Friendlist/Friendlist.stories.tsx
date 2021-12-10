import Friendlist from './Friendlist';

export default {
  component: Friendlist,
  title: 'Components/Friendlist',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => <Friendlist username={''} />;
