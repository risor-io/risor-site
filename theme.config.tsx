import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span>Risor.io</span>,
  project: {
    link: 'https://github.com/risor-io/risor',
  },
  chat: {},
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Risor',
  },
  banner: {
    key: '2.0-release2',
    text: (
      <a href='https://nextra.site' target='_blank'>
        🎉 Nextra 2.! is released. Read more →
      </a>
    ),
  },
};

export default config;
