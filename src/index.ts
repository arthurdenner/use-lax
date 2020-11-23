import lax from 'lax.js';
import * as React from 'react';

console.log(lax);

/**
 * List of supported easings
 * https://github.com/alexfoxy/lax.js#supported-easings
 */
type LaxEasings =
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeOutBounce'
  | 'easeInBounce'
  | 'easeOutBack'
  | 'easeInBack';

export interface LaxDriverOptions {
  /**
   * By default each driver updates its value every animation frame, around ~60 times per second.
   * You can use the `frameStep` to reduce frequency of the driver value updating.
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
   * Used to add inertia to elements using the `inertia` element option.
   *
   * Defaults to `false`.
   * */
  inertiaEnabled: boolean;
}

/** Map of driver names with their value and inertia  */
export interface LaxDriverValues {
  [driverName: string]: [string | number, number];
}

export interface LaxElementOptions {
  style?: React.CSSProperties;
  /**
   * A method called every frame with the current `driverValues` and `domElement`.
   * This could be used to toggle classes on an element or set `innerHTML`.
   */
  onUpdate?: (driverValues: LaxDriverValues, domElement: HTMLElement) => void;
}

export interface LaxDriver {
  /** Name of the driver. */
  name: string;
  /** Function that will provide the value for the animations.
   *
   * Keep the method as computationally light as possible.
   * */
  getValueFn: (laxFrame: number) => number;
  /** Options to the driver. */
  options?: LaxDriverOptions;
}

interface LaxValueOptions {
  /**
   * Set this option to modulus the value from the driver, for example if you want
   * to loop the animation value as the driver value continues to increase.
   **/
  modValue?: number;
  /**
   * By default each animation updates its value every animation frame, around ~60 times per second.
   * You can use the `frameStep` to reduce frequency of the driver value updating.
   *
   * For example a value of `2` would only update ~30 times per second
   * and a value of `60` would only update about once per second.
   *
   * Defaults to `1`.
   */
  frameStep?: number;
  /** Use to add inertia to your animations. Use in combination with the `inertiaEnabled` driver option. */
  inertia?: number;
  /**
   * Use in combination with `inertia`. If set to `absolute` the inertia value
   * will always be a positive number via the `Math.abs` operator.
   * */
  inertiaMode?: 'absolute' | 'normal';
  /** Define the unit to be appended to the end of the value, e.g `px` or `deg`. */
  cssUnit?: string;
  /**
   * Some CSS properties require more complex strings as values.
   * For example, `box-shadow` has multiple values that could be modified by a lax animation.
   */
  cssFn?: (value: number) => string;
  // TODO: Add description
  easing?: LaxEasings;
}

// TODO: Find a better name for this
type LaxValue = [
  // TODO: Describe special values for driver value map (1st item)
  // https://github.com/alexfoxy/lax.js#special-values
  (number | string)[],
  // TODO: Describe mobile breakpoints for animation value map (2nd item)
  (number | string)[],
  LaxValueOptions?
];

export interface LaxElement {
  /** Selector of the element. */
  selector: string;
  /** Options to the element. */
  options?: LaxElementOptions;
  /** Map of drivers to animation values */
  animationData?: {
    // TODO: Try to make this autocomplete
    [driverName: string]: {
      // TODO: Add description and supported properties
      // https://github.com/alexfoxy/lax.js#css-properties
      // When property not supported, `cssFn` can be used
      [cssProperty: string]: LaxValue;
    };
  };
}

export interface LaxInitOptions {
  /** Array of drivers to set when initializing lax. */
  drivers?: LaxDriver[];
  /** Array of elements to set when initializing lax. */
  elements?: LaxElement[];
  // breakpoints?: { [k: string]: any };
  // className?: string;
}

// let selector = 'lax';

function useLax({ drivers, elements }: LaxInitOptions = {}) {
  // const requestRef = React.useRef<number>();
  // selector = className || selector;

  React.useEffect(() => {
    lax.init();

    if (drivers?.length) {
      drivers.forEach(({ name, getValueFn, options }) => {
        lax.addDriver(name, getValueFn, options);
      });
    }

    if (elements?.length) {
      elements.forEach(({ selector, animationData, options }) => {
        lax.addElements(selector, animationData, options);
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
  }, []);
}

function useLaxElement({
  animationData,
  options,
}: Omit<LaxElement, 'selector'> = {}) {
  const ref = React.useRef<any>();

  React.useEffect(() => {
    const currentNode = ref.current;

    // if (currentNode && currentNode.classList) {
    //   currentNode.classList.add(selector);
    // }

    if (currentNode) {
      lax.addElement(currentNode, animationData, options);
    }

    return () => {
      if (currentNode) {
        lax.removeElement(currentNode);
      }
    };
  }, []);

  return ref;
}

export { useLax, useLaxElement };
