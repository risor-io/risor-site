import React from 'react';
import { useRouter } from 'next/router';
import { DocsThemeConfig } from 'nextra-theme-docs';
import EditLink from './components/edit-link';
import Logo from './components/logo';

const config: DocsThemeConfig = {
  logo: <Logo></Logo>,
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
  banner: {
    key: '1.0-release',
    text: (
      <a href='/blog/release_1_4' target='_blank'>
        🎉 Risor 1.4.0 is released! Read more →
      </a>
    ),
  },
  navbar: {
    // extraContent: <LoginButton />,
  },
  darkMode: true,
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
        content='Fast and flexible scripting for Go developers and DevOps.'
      />
    </>
  ),
};

export default config;
