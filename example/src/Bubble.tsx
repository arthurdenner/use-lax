import React from 'react';
import { useLaxElement, LaxElement } from 'use-lax';

type Config = LaxElement['animationData'];

const configs: Config[] = [
  {
    scrollY: {
      opacity: [
        [0, 'screenHeight'],
        [1, 0],
      ],
    },
  },
  {
    scrollY: {
      perspective: [[0], [1000]],
      rotateX: [
        [0],
        [0],
        {
          inertia: -1,
          cssFn: (val) => String(val * 10),
        },
      ],
      opacity: [
        [0, 'screenHeight'],
        [1, 0.5],
      ],
      translateY: [
        [0],
        [0],
        {
          inertia: -1,
        },
      ],
    },
  },
  {
    scrollY: {
      'box-shadow': [
        [0],
        [0],
        {
          inertia: -1,
          inertiaMode: 'absolute',
          cssFn: (val) => `0px 0px ${val * 100}px rgba(0,0,0,1)`,
        },
      ],
      opacity: [
        [0, 'screenHeight'],
        [1, 0.25],
        {
          easing: 'easeOutBounce',
        },
      ],
    },
  },
];

function Bubble({ config }: { config: Config }) {
  const ref = useLaxElement({
    animationData: config,
  });

  return <div ref={ref} className="bubble " />;
}

function Bubbles() {
  return (
    <div className="bubbles">
      {configs.map((config, idx) => (
        <Bubble key={idx} config={config} />
      ))}
    </div>
  );
}

export default Bubbles;
