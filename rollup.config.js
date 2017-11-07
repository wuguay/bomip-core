export default {
  output: {
    format: 'umd'
  },
  external: [
        '@angular/core',
        '@angular/common',
        'meteor-rxjs',
        'meteor/meteor',
        'lodash',
        'lodash/fp',
        'zone.js'
    ],
  globals: {
    '@angular/core': 'core',
    '@angular/common': 'common',
    'rxjs': 'rxjs'
  }
};
