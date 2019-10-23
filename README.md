# use-lax

[![npm](https://img.shields.io/npm/v/use-lax.svg)](https://www.npmjs.org/package/use-lax)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

React hook to use with [lax.js](https://github.com/alexfoxy/laxxx).

### Usage

```javascript
import React from 'react';
import { useLax, useLaxElement } from 'use-lax';

function App() {
  const [showBubble, setBubble] = React.useState(false);
  const toggleBubble = () => {
    setBubble(!showBubble);
  };

  useLax(); // use once in the top level element

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

function Bubble() {
  const ref = useLaxElement(); // use it in every component added dynamically

  // add `lax` in the className attribute and the data-lax-preset attribute
  // on every component that you want to animate
  return (
    <div
      ref={ref}
      className="lax bubble"
      data-lax-preset="leftToRight fadeInOut"
    />
  );
}
```

See the full example [here](https://codesandbox.io/s/q9882qjxzq).

See the [lax demo](https://alexfox.dev/laxxx/) built with `React` and `use-lax` [here](https://codesandbox.io/s/039krok5ml).

See the [Mario demo](https://alexfox.dev/laxxx/sprite.html) built with `React` and `use-lax` [here](https://codesandbox.io/s/r48kz0okrm).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/arthurdenner"><img src="https://avatars0.githubusercontent.com/u/13774309?v=4" width="100px;" alt="Arthur Denner"/><br /><sub><b>Arthur Denner</b></sub></a><br /><a href="https://github.com/arthurdenner/use-lax/commits?author=arthurdenner" title="Code">💻</a> <a href="#design-arthurdenner" title="Design">🎨</a> <a href="https://github.com/arthurdenner/use-lax/commits?author=arthurdenner" title="Documentation">📖</a> <a href="#example-arthurdenner" title="Examples">💡</a> <a href="#ideas-arthurdenner" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-arthurdenner" title="Maintenance">🚧</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
