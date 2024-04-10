/**
 * Interpolates a string with environment variables
 * @param string
 */
export const interpolate = (string: string): string => {
  return string.replace(/\${?([a-zA-Z0-9_]+)?}?/g, (m1, g1) => {
    return process.env[g1] || m1;
  });
};

/**
 * Interpolates all string values in an array
 * @param array
 */
export const interpolateArray = (array: string[]): string[] => {
  return array.map((a) => interpolate(a));
};

/**
 * Interpolates all string values in an object
 * @param options
 */
export const interpolateObject = <T extends Record<any, any>>(
  options: T
): T => {
  for (const key in options) {
    if (key in options) {
      const value = options[key];
      if (typeof value === 'string') {
        options[key] = interpolate(value) as T[typeof key];
      } else if (Array.isArray(value)) {
        options[key] = interpolateArray(value) as T[typeof key];
      }
    }
  }
  return options;
};
