import {puppeteerLauncher} from '@web/test-runner-puppeteer';

export default {
  testFramework: {
    config: {
      ui: 'tdd'
    }
  },
  browsers: [puppeteerLauncher()],
  nodeResolve: true
};
