import * as assert from 'uvu/assert';
import * as lib from '../main.js';

suite('waitForEvent', () => {
  test('resolves when specified event fires', async () => {
    const node = document.createElement('div');
    const promise = lib.waitForEvent(node, 'test-event');
    const event = new CustomEvent('test-event');

    node.dispatchEvent(event);

    const result = await promise;

    assert.is(result, event);
  });

  test('resolves when native event fires', async () => {
    const node = document.createElement('div');
    const promise = lib.waitForEvent(node, 'focus');
    const event = new FocusEvent('focus');

    node.dispatchEvent(event);

    // Explicitly typing this to catch any potential type errors
    const result: FocusEvent = await promise;

    assert.is(result, event);
  });
});

suite('waitForSelector', () => {
  test('resolves when specified selector exists', async () => {
    const node = document.createElement('div');
    const promise = lib.waitForSelector(node, 'p');
    const pTag = document.createElement('p');

    window.requestAnimationFrame(() => {
      node.appendChild(pTag);
    });

    const result = await promise;

    assert.is(result, pTag);
  });

  test('resolves when specified selector immediately exists', async () => {
    const node = document.createElement('div');
    const pTag = document.createElement('p');
    node.appendChild(pTag);

    const result = await lib.waitForSelector(node, 'p');

    assert.is(result, pTag);
  });

  test('resolves when selector exists in shadow root', async () => {
    const node = document.createElement('div');
    const shadow = node.attachShadow({mode: 'open'});
    const pTag = document.createElement('p');
    shadow.appendChild(pTag);

    const result = await lib.waitForSelector(shadow, 'p');

    assert.is(result, pTag);
  });

  test('resolves when selector exists in document', async () => {
    const node = document.createElement('div');

    try {
      document.body.appendChild(node);

      const result = await lib.waitForSelector(document, 'div');

      assert.is(result, node);
    } finally {
      node.remove();
    }
  });
});

suite('waitForFrame', () => {
  test('resolves on next animation frame');
});
