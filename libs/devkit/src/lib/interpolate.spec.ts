import {
  interpolate,
  interpolateArray,
  interpolateObject,
} from './interpolate';

process.env['DEVKIT'] = 'devkit';

describe('interpolate', () => {
  it('should work with string', () => {
    expect(interpolate('${DEVKIT}')).toEqual('devkit');
  });

  it('should work with array', () => {
    expect(interpolateArray(['${DEVKIT}', '${DEVKIT}'])).toEqual([
      'devkit',
      'devkit',
    ]);
  });

  it('should work with object', () => {
    expect(interpolateObject({ key: '${DEVKIT}' })).toEqual({ key: 'devkit' });
  });
});
