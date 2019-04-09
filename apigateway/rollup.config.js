
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import graphql from 'rollup-plugin-graphql';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'index.ts',
    output: {
      file: 'dist/server.js',
      format: 'cjs'
    },
    plugins: [
        graphql(),
        resolve(),
        commonjs(),
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    module: "es2015"
                }
            }
        })
    ],
    watch:{
        chokidar: true,
        clearScreen: false
    }
  };