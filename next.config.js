/** @type {import('next').NextConfig} */

const { BUNDLED_LANGUAGES, getHighlighter } = require('shiki');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    rehypePrettyCodeOptions: {
      getHighlighter: (options) =>
        getHighlighter({
          ...options,
          langs: [
            ...BUNDLED_LANGUAGES,
            {
              id: 'risor',
              scopeName: 'source.risor',
              aliases: ['rsr'],
              path: '../../public/syntax/risor.grammar.json',
            },
          ],
        }),
    },
  },
});

module.exports = withNextra();
