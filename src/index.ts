import lax from 'lax.js';
import * as React from 'react';

function useLax() {
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

export default useLax;
