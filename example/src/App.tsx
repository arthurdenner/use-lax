import { useLax } from 'use-lax';
import React from 'react';
import Bubble from './Bubble';

function App() {
  const [showBubble, setBubble] = React.useState(false);
  const toggleBubble = () => {
    setBubble(!showBubble);
  };

  useLax();

  return (
    <div>
      <button className="toggle-bubble" onClick={toggleBubble}>
        Toggle Bubble
      </button>
      <p>{showBubble ? '..now scroll down..' : '^ press the button ^'}</p>
      {showBubble ? <Bubble /> : null}
    </div>
  );
}

export default App;
