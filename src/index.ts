import lax from 'lax.js';
import * as React from 'react';

function useLax() {
  const requestRef = React.useRef<number>();

  React.useEffect(() => {
    lax.setup();

    const updateLax = () => {
      lax.update(window.scrollY);
      requestRef.current = window.requestAnimationFrame(updateLax);
    };

    requestRef.current = window.requestAnimationFrame(updateLax);

    return () => {
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
}

function useLaxElement<T>() {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    const currentNode = ref.current;

    lax.addElement(currentNode);

    return () => {
      lax.removeElement(currentNode);
    };
  }, []);

  return ref;
}

export { useLax, useLaxElement };
