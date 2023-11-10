export function injectProperties<T>(self: T, init: Partial<T>): void {
  Object.keys(init).forEach((key) => {
    if (Object.keys(self).includes(key)) self[key] = init[key];
  });
}
