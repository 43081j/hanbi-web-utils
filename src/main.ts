/**
 * Waits for a single animation frame before resolving
 * @return {Promise}
 */
export function waitForFrame(): Promise<void> {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      resolve();
    });
  });
}

export function waitForSelector<K extends keyof HTMLElementTagNameMap>(
  node: HTMLElement,
  selector: K,
  attempts?: number
): Promise<HTMLElementTagNameMap[K]>;
export function waitForSelector<K extends keyof SVGElementTagNameMap>(
  node: HTMLElement,
  selector: K,
  attempts?: number
): Promise<SVGElementTagNameMap[K]>;
export function waitForSelector(
  node: HTMLElement,
  selector: string,
  attempts?: number
): Promise<Element>;
/**
 * Waits for a DOM selector to exist inside the specified node
 * @param {HTMLElement} node Node to search within
 * @param {string} selector Selector to execute via `querySelector`
 * @param {number} attempts Maximum number of attempts to try
 * @return {Promise}
 */
export function waitForSelector(
  node: HTMLElement,
  selector: string,
  attempts: number = 20
): Promise<Element> {
  return new Promise<Element>((resolve, reject) => {
    let i = 0;
    const handler = (): void => {
      if (++i > attempts) {
        reject(
          new Error(`Could not find node by selector after ${i} attempts`)
        );
        return;
      }
      const child = node.querySelector(selector);
      if (child) {
        resolve(child);
      } else {
        window.requestAnimationFrame(handler);
      }
    };

    handler();
  });
}

export function waitForEvent<K extends keyof DocumentEventMap>(
  node: Document,
  event: K
): Promise<DocumentEventMap[K]>;
export function waitForEvent<K extends keyof ElementEventMap>(
  node: Element,
  event: K
): Promise<ElementEventMap[K]>;
export function waitForEvent<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  event: K
): Promise<HTMLElementEventMap[K]>;
export function waitForEvent<K extends keyof SVGElementEventMap>(
  node: SVGElement,
  event: K
): Promise<SVGElementEventMap[K]>;
export function waitForEvent<K extends keyof WindowEventMap>(
  node: Window,
  event: K
): Promise<WindowEventMap[K]>;
export function waitForEvent<K extends keyof HTMLMediaElementEventMap>(
  node: HTMLMediaElement,
  event: K
): Promise<HTMLMediaElementEventMap[K]>;
export function waitForEvent<K extends keyof HTMLBodyElementEventMap>(
  node: HTMLBodyElement,
  event: K
): Promise<HTMLBodyElementEventMap[K]>;
export function waitForEvent<K extends keyof GlobalEventHandlersEventMap>(
  node: EventTarget,
  event: K
): Promise<GlobalEventHandlersEventMap[K]>;
export function waitForEvent(node: EventTarget, event: string): Promise<Event>;
/**
 * Waits for a node to emit a particular event
 * @param {HTMLElement} node Node expected to emit the event
 * @param {string} event Event to listen for
 * @return {Promise}
 */
export function waitForEvent(node: EventTarget, event: string): Promise<Event> {
  return new Promise<Event>((resolve) => {
    node.addEventListener(
      event,
      (ev) => {
        resolve(ev);
      },
      {once: true}
    );
  });
}
