import React from 'react';
import { useLaxElement } from 'use-lax';

function Bubble() {
  const ref = useLaxElement();

  return (
    <div ref={ref} className="bubble" data-lax-preset="leftToRight fadeInOut" />
  );
}

export default Bubble;
