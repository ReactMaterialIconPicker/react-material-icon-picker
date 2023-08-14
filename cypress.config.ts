import { defineConfig } from 'cypress';
import devWebpackConfig from './webpack.dev.js';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: devWebpackConfig,
    },
    video: false,
    screenshotOnRunFailure: false,
  },
});
