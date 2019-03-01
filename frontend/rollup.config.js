import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: [
    'dist/components/my-app.js',
    'dist/components/my-view1.js',
    'dist/components/my-view2.js',
    'dist/components/my-view3.js',
    'dist/components/my-view404.js',
    'dist/components/shopper/shopper-view.js',
  ],

  output: [{
    dir: 'build/modern',
    format: 'es',
    sourcemap: true,
  }, {
    dir: 'build/nomodule',
    format: 'system',
    sourcemap: true,
  }],

  plugins: [

    // REQUIRED to roll apollo-client up
    resolve({
      browser: true,
      jsnext: true,
      module: true,
    }),

    commonjs({
      namedExports: {
        // Necessary to roll apollo-link-state up.
        // until graphql-anywhere 5.0
        //'graphql-anywhere/lib/async': ['graphql'],
        // Needed to roll up apollo-cache-persist
        'apollo-cache-persist': ['persistCache']
      }
    }),

  ]
}