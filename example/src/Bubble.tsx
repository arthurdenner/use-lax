import React from 'react';
import { useLaxElement } from 'use-lax';

function Bubble() {
  const ref = useLaxElement({
    animationData: {
      scrollY: {
        opacity: [
          [0, window.innerHeight / 2],
          [1, 0],
        ],
      },
    },
  });

  return (
    <div
      ref={ref}
      className="bubble lax_preset_fadeInOut-334.5-0 lax_preset_seesaw-140-20"
    />
  );
}

export default Bubble;
