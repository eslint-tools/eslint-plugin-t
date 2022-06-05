import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'cjs',
    strict: false,
    esModule: false,
  },
  plugins: [typescript()],
};
