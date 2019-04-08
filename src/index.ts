import lax from 'lax.js';
import * as React from 'react';

function useLax() {
  lax.setup();

  React.useEffect(() => {
    const updateLax = () => {
      lax.update(window.scrollY);
    };

    document.addEventListener('scroll', updateLax, false);

    updateLax();

    return () => {
      document.removeEventListener('scroll', updateLax);
    };
  }, []);
}

function useLaxElement() {
  const ref = React.useRef();

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
