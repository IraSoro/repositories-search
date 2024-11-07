// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function debounce(func: Function, delay: number) {
  let timeoutId: number | undefined;

  return function (...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      func(args);
    }, delay);
  };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function throttle(func: Function, delay: number) {
  let lastCallDate = 0;

  return function (...args: unknown[]) {
    const now = Date.now();

    if (now - lastCallDate >= delay) {
      lastCallDate = now;
      func(args);
    }
  };
}
