# use-lax

[![npm](https://img.shields.io/npm/v/use-lax.svg)](https://www.npmjs.org/package/use-lax)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg)](#contributors)

React hook to use with [lax.js](https://github.com/alexfoxy/lax.js).

## Usage

```javascript
import React from 'react';
import { useLax, useLaxElement } from 'use-lax';

function App() {
  const [showBubble, setBubble] = useState(false);
  const toggleBubble = () => setBubble(!showBubble);

  // Use once in the top level element
  // to configure drivers and initial elements
  // https://github.com/alexfoxy/lax.js#setup
  useLax({
    drivers: [
      {
        name: 'scrollY',
        getValueFn: () => window.scrollY,
      },
    ],
  });

  return (
    <div>
      <button className="toggle-bubble" onClick={toggleBubble}>
        Toggle Bubble
      </button>
      <p>{showBubble ? '...now scroll down...' : '^ press the button ^'}</p>
      {showBubble ? <Bubble /> : null}
    </div>
  );
}

function Bubble() {
  // Use it on every component added dynamically
  // and provide the animation driven from the drivers
  const ref = useLaxElement({
    animationData: {
      scrollY: {
        presets: ['fadeInOut:200:0'],
        translateX: [
          [0, 'screenHeight'],
          [0, 'screenWidth'],
        ],
      },
    },
  });

  return <div ref={ref} className="bubble" />;
}
```

- [Full example above](https://codesandbox.io/s/q9882qjxzq)
- [Lax homepage example](https://codesandbox.io/s/039krok5ml) - [HTML version](https://alexfox.dev/lax.js/)
- [Mario example](https://codesandbox.io/s/r48kz0okrm) - [HTML version](https://codesandbox.io/s/vcv4k)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/arthurdenner"><img src="https://avatars0.githubusercontent.com/u/13774309?v=4" width="100px;" alt=""/><br /><sub><b>Arthur Denner</b></sub></a><br /><a href="https://github.com/arthurdenner/use-lax/commits?author=arthurdenner" title="Code">💻</a> <a href="#design-arthurdenner" title="Design">🎨</a> <a href="https://github.com/arthurdenner/use-lax/commits?author=arthurdenner" title="Documentation">📖</a> <a href="#example-arthurdenner" title="Examples">💡</a> <a href="#ideas-arthurdenner" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-arthurdenner" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/Sirk"><img src="https://avatars0.githubusercontent.com/u/1640743?v=4" width="100px;" alt=""/><br /><sub><b>Antoine Martin</b></sub></a><br /><a href="https://github.com/arthurdenner/use-lax/commits?author=Sirk" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
