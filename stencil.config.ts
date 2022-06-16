import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'dc-election',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: "./2022_primary/**/*.html",
        }
      ]
    },
  ],
};
