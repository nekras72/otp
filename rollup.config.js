import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
