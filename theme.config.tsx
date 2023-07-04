import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import LoginButton from './components/login-button';
// import mainLogo from './public/logo.png';
import Image from 'next/image';

const config: DocsThemeConfig = {
  logo: <strong>Risor.io</strong>,
  project: {
    link: 'https://github.com/risor-io/risor',
  },
  chat: {},
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Risor',
    // component: undefined,
  },
  // banner: {
  //   key: '1.0-release',
  //   text: (
  //     <a href='https://risor.io' target='_blank'>
  //       🎉 Risor 1.0! is released. Read more →
  //     </a>
  //   ),
  // },
  navbar: {
    // extraContent: <LoginButton />,
  },
  darkMode: false,
  feedback: {
    content: null,
  },
  editLink: {
    component: undefined,
  },
  primaryHue: {
    light: 198,
    dark: 198,
  },
};

export default config;
