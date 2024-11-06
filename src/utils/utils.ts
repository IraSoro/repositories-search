export function debounce(func: (...args: any[]) => void, delay: number) {
  let timerID: number | undefined;

  return function (...args: any[]) {
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function throttle(func: (...args: any[]) => void, delay: number) {
  let lastCall = 0;

  return function (...args: any[]) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}
