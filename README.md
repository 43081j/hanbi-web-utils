[![npm](https://img.shields.io/npm/v/@hanbi/web-utils)](https://www.npmjs.com/package/@hanbi/web-utils)

# @hanbi/web-utils

`@hanbi/web-utils` is a small collection of utilities for reducing boilerplate
in tests of primarily web-based projects.

# Install

```
$ npm i -D @hanbi/web-utils
```

# Usage

## `waitForFrame()`

Uses `requestAnimationFrame` to wait for a single animation frame before
continuing.

```ts
test('my test', async () => {
  // dom setup here
  await utils.waitForFrame();
});
```

## `waitForSelector(node, selector[, attempts])`

Waits for a CSS selector to match an element in a specified node.

```ts
test('my test', async () => {
  // dom setup here
  await utils.waitForSelector(document.body, 'my-element');
});
```

## `waitForEvent(node, event)`

Waits for a particular event to have been emitted by the specified node.

**NOTE** this should usually be called and awaited separately as you'll see in
the example. This is to ensure any internal event handlers have been setup
before continuing.

```ts
test('my test', async () => {
  // dom setup here
  const eventPromise = utils.waitforEvent(node, 'load');
  // do whatever should cause the 'load' event to be emitted
  const event = await eventPromise;
  // `event` is now the event which was emitted
});
```

# License

MIT
