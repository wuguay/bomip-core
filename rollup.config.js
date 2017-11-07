export default {
  format: 'umd',
  external: [
       '@angular/core',
       '@angular/common',
       'meteor-rxjs',
       'meteor/meteor',
       'lodash',
       'lodash/fp',
       'reflect-metadata',
       'rxjs',
       'rxjs/observable/ArrayObservable',
       'rxjs/observable/DeferObservable',
       'rxjs/observable/EmptyObservable',
       'rxjs/observable/ErrorObservable',
       'rxjs/observable/ForkJoinObservable',
       'rxjs/observable/FromEventObservable',
       'rxjs/observable/FromEventPatternObservable',
       'rxjs/observable/FromObservable',
       'rxjs/observable/GenerateObservable',
       'rxjs/observable/IfObservable',
       'rxjs/observable/IntervalObservable',
       'rxjs/observable/IteratorObservable',
       'rxjs/observable/NeverObservable',
       'rxjs/observable/PairsObservable',
       'rxjs/observable/PromiseObservable',
       'rxjs/observable/RangeObservable',
       'rxjs/observable/ScalarObservable',
       'rxjs/observable/SubscribeOnObservable',
       'rxjs/observable/TimerObservable',
       'rxjs/observable/UsingObservable',
       'zone.js'
   ],
  globals: {
    '@angular/core':'core',
    '@angular/common':'common',
    'rxjs':'rxjs'
  }
};
