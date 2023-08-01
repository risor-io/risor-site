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
    if (asPath !== '/' && asPath !== '') {
      return {
        titleTemplate: '%s - Risor',
      };
    } else {
      return {
        titleTemplate: 'Risor',
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
  nextThemes: {
    defaultTheme: 'dark',
  },
  editLink: {
    component: EditLink,
  },
  primaryHue: {
    light: 198,
    dark: 198,
  },
  sidebar: {
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
  },
  head: (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta property='og:title' content='Risor' />
      <meta
        property='og:description'
        content='A fast and flexible scripting language for Go developers and DevOps.'
      />
    </>
  ),
};

export default config;
