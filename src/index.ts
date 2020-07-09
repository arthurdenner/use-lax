import lax from 'lax.js';
import * as React from 'react';

console.log({ lax });

export interface LaxDriverOptions {
  /**
   * By default, each driver updates its value every animation frame, around ~60 times per second.
   * `frameStep` can be used to reduce frequency of updates.
   *
   * For example a value of `2` would only update ~30 times per second
   * and a value of `60` would only update about once per second.
   *
   * Defaults to `1`.
   */
  frameStep: number;
  /**
   * If enabled, the driver will calculate the speed at which its value is changing.
   *
   * Used to add momentum to elements using the `momentum` element option.
   *
   * Defaults to `false`.
   * */
  momentumEnabled: boolean;
}

export interface LaxDriver {
  /** Name of the driver. */
  name: string;
  /** Function that will the value for the driver. */
  getValueFn: (laxFrame: number) => number;
  /** Options to the driver. */
  options?: LaxDriverOptions;
}

export interface LaxInitOptions {
  /** Array of drivers to set when initializing lax. */
  drivers?: LaxDriver[];
  // breakpoints?: { [k: string]: any };
  // className?: string;
}

// let selector = 'lax';

function useLax({ drivers }: LaxInitOptions = {}) {
  // const requestRef = React.useRef<number>();
  // selector = className || selector;

  React.useEffect(() => {
    lax.init();

    if (drivers?.length) {
      drivers.forEach(({ name, getValueFn, options }) => {
        lax.addDriver(name, getValueFn, options);
      });
    }

    // lax.setup({ breakpoints, selector: `.${selector}` });

    // const updateLax = () => {
    //   lax.update(window.scrollY);
    //   requestRef.current = window.requestAnimationFrame(updateLax);
    // };

    // requestRef.current = window.requestAnimationFrame(updateLax);

    // return () => {
    //   if (requestRef.current) {
    //     window.cancelAnimationFrame(requestRef.current);
    //   }
    // };
  }, [drivers]);
}

function useLaxElement() {
  const ref = React.useRef<any>();

  React.useEffect(() => {
    const currentNode = ref.current;

    // if (currentNode && currentNode.classList) {
    //   currentNode.classList.add(selector);
    // }

    lax.addElement(currentNode);

    return () => {
      lax.removeElement(currentNode);
    };
  }, []);

  return ref;
}

export { useLax, useLaxElement };
