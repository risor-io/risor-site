import React from 'react';
import { useRouter } from 'next/router';
import { DocsThemeConfig } from 'nextra-theme-docs';
import EditLink from './components/edit-link';
// import mainLogo from './public/logo.png';
import Image from 'next/image';

const config: DocsThemeConfig = {
  logo: <strong>Risor.io</strong>,
  project: {
    link: 'https://github.com/risor-io/risor',
  },
  chat: {},
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s - Risor',
      };
    }
  },
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
    component: EditLink,
  },
  primaryHue: {
    light: 198,
    dark: 198,
  },
};

export default config;
