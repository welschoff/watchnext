import React from 'react';
import Youttube from 'react-youtube';
import { SeriesProps } from '../../types';

function Trailer({ trailerId }: SeriesProps) {
  const opts = {
    height: '200',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div>
      <Youttube videoId={trailerId} opts={opts} />
    </div>
  );
}

export default Trailer;
