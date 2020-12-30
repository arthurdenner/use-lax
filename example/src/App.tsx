import { useLax } from 'use-lax';
import React from 'react';
import Bubbles from './Bubble';

function App() {
  const [showBubble, setBubble] = React.useState(false);
  const toggleBubble = () => {
    setBubble(!showBubble);
  };

  useLax({
    drivers: [
      {
        name: 'scrollY',
        getValueFn: () => window.scrollY,
        options: { inertiaEnabled: true },
      },
    ],
  });

  return (
    <div>
      <button className="toggle-bubble" onClick={toggleBubble}>
        Toggle Bubbles
      </button>
      <p>{showBubble ? 'Now scroll down...' : '^ Press the button ^'}</p>
      {showBubble ? <Bubbles /> : null}
    </div>
  );
}

export default App;
