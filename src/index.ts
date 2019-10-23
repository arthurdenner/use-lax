import lax from 'lax.js';
import * as React from 'react';

interface LaxSetupOptions {
  breakpoints?: { [k: string]: any };
  className?: string;
}

let selector = 'lax';

function useLax({ breakpoints, className }: LaxSetupOptions = {}) {
  const requestRef = React.useRef<number>();
  selector = className || selector;

  React.useEffect(() => {
    lax.setup({ breakpoints, selector: `.${selector}` });

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
  }, [breakpoints, className]);
}

function useLaxElement() {
  const ref = React.useRef<Element>();

  React.useEffect(() => {
    const currentNode = ref.current;

    if (currentNode && currentNode.classList) {
      currentNode.classList.add(selector);
    }

    lax.addElement(currentNode);

    return () => {
      lax.removeElement(currentNode);
    };
  }, []);

  return ref;
}

export { useLax, useLaxElement };
