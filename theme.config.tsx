import React from 'react';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { DocsThemeConfig } from 'nextra-theme-docs';
import EditLink from './components/edit-link';

const config: DocsThemeConfig = {
  logo: (
    <>
      <img src='/risor-icon.svg' width='48' height='48' alt='Risor Logo' />
      <span style={{ marginLeft: '-0.3em', fontWeight: 800 }}>Risor</span>
    </>
  ),
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
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      'https://risor.io' +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);
    return (
      <>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta property='og:url' content={url} />
        <link rel='icon' type='image/x-icon' href='/risor-icon.svg' />
        <meta property='og:title' content={frontMatter.title || 'Risor'} />
        <meta
          property='og:description'
          content={
            frontMatter.description ||
            'Fast and flexible scripting for Go developers and DevOps.'
          }
        />
      </>
    );
  },
};

export default config;
