import lax from 'lax.js';
import * as React from 'react';

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
  frameStep?: number;
  /**
   * If enabled, the driver will calculate the speed at which its value is changing.
   *
   * Used to add inertia to elements using the `inertia` element option.
   *
   * Defaults to `false`.
   * */
  inertiaEnabled?: boolean;
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

export interface LaxValueOptions {
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
  cssFn?: (value: number, domElement: HTMLElement) => number | string;
  /** List of supported easings [here](https://github.com/alexfoxy/lax.js#supported-easings) */
  easing?: string;
}

/**
 * Animation value map. Can be explicit numbers, e.g. `[0, 100]`,
 * strings for simple formulas as well as use special values, e.g: `[0, 'screenWidth']`,
 * or an object with mobile breakpoints as keys.
 *
 * See a list of available special values [here](https://github.com/alexfoxy/lax.js#special-values).
 */
export type AnimationValueMap =
  | (number | string)[]
  | { [breakpoint: number]: (number | string)[] };

/**
 * Driver value map. Can be explicit numbers e.g. `[0, 100]` or you can use strings
 * for simple formulas as well as use special values. e.g: `[0, 'screenWidth']`.
 *
 * See a list of available special values [here](https://github.com/alexfoxy/lax.js#special-values).
 */
export type DriverValueMap = (number | string)[];

export type LaxValue = [DriverValueMap, AnimationValueMap, LaxValueOptions?];

export interface LaxElement {
  /** Selector of the element. */
  selector: string;
  /** Options to the element. */
  options?: LaxElementOptions;
  /** Map of drivers to animation values */
  animationData?: {
    [driverName: string]: {
      /**
       * The name of the CSS property you want to animate, e.g. `opacity` or `rotate`.
       * When a property is not supported, use the `cssFn` option to compute its value.
       * See a list of supported properties [here](https://github.com/alexfoxy/lax.js#css-properties).
       */
      [cssProperty: string]: LaxValue;
    };
  };
}

export interface LaxInitOptions {
  /** Array of drivers to set when initializing lax. */
  drivers?: LaxDriver[];
  /** Array of elements to set when initializing lax. */
  elements?: LaxElement[];
}

declare global {
  interface Window {
    lax: typeof lax;
  }
}

function useLax({ drivers, elements }: LaxInitOptions = {}) {
  React.useEffect(() => {
    if (!window.lax) {
      window.lax = lax;
    }
  }, []);

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
  }, []);
}

function useLaxElement({
  animationData,
  options,
}: Omit<LaxElement, 'selector'> = {}) {
  const ref = React.useRef<any>();

  React.useEffect(() => {
    const currentNode = ref.current;

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
