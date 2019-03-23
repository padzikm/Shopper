import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const graphql = require('./plugins/rollup-plugin-graphql.cjs');
import litcss from 'rollup-plugin-lit-css';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: [
    'src/components/my-app.ts',
    'src/components/my-view1.ts',
    'src/components/my-view2.ts',
    'src/components/my-view3.ts',
    'src/components/my-view404.ts',
    'src/components/shopper/shopper-view.ts',
  ],

  output: [{
    dir: 'build/modern',
    format: 'esm',
    sourcemap: true,
  }],

  plugins: [
    graphql(),
    litcss(),
    // REQUIRED to roll apollo-client up
    resolve(),//({
      // browser: true,
      // jsnext: true,
      // module: true,
    //}),

    commonjs({
      extensions: ['.js', '.graphql']
    }),//({
      // namedExports: {
      //   // Necessary to roll apollo-link-state up.
      //   // until graphql-anywhere 5.0
      //   //'graphql-anywhere/lib/async': ['graphql'],
      //   // Needed to roll up apollo-cache-persist
      //   'apollo-cache-persist': ['persistCache']
      // }
    //}),
    typescript(),
  ]
}