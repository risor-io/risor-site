import { useCallback, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

const keywords = [
  'break',
  'case',
  'const',
  'continue',
  'default',
  'else',
  'false',
  'for',
  'func',
  'if',
  'import',
  'in',
  'nil',
  'range',
  'return',
  'switch',
  'true',
  'var',
];

const typeKeywords = [
  'bool',
  'byte',
  'byte_slice',
  'buffer',
  'error',
  'float',
  'float_slice',
  'int',
  'iter',
  'list',
  'map',
  'set',
  'string',
];

const escapes =
  /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/;

const operators = [
  '=',
  '>',
  '<',
  '!',
  '?',
  ':',
  '==',
  '<=',
  '>=',
  '!=',
  '&&',
  '||',
  '++',
  '--',
  '+',
  '-',
  '*',
  '/',
  '&',
  '|',
  '^',
  '%',
  '<<',
  '>>',
  '+=',
  '-=',
  '*=',
  '/=',
];

const defaultCode = `array := ["gophers", "are", "burrowing", "rodents"]
 
sentence := array | strings.join(" ") | strings.to_upper
 
print(sentence)`;

function getLang() {
  return {
    keywords,
    typeKeywords,
    operators,
    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes,
    // The main tokenizer for our languages
    tokenizer: {
      root: [
        // identifiers and keywords
        [
          /[a-z_$][\w$]*/,
          {
            cases: {
              '@typeKeywords': 'keyword',
              '@keywords': 'keyword',
              '@default': 'identifier',
            },
          },
        ],
        [/[A-Z][\w\$]*/, 'type.identifier'], // to show class names nicely

        // whitespace
        { include: '@whitespace' },

        // delimiters and operators
        [/[{}()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, { cases: { '@operators': 'operator', '@default': '' } }],

        // @ annotations.
        // As an example, we emit a debugging log message on these tokens.
        // Note: message are supressed during the first load -- change some lines to see them.
        [
          /@\s*[a-zA-Z_\$][\w\$]*/,
          { token: 'annotation', log: 'annotation token: $0' },
        ],

        // numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],

        // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'],

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

        // characters
        [/'[^\\']'/, 'string'],
        [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
        [/'/, 'string.invalid'],
      ],

      comment: [
        [/[^\/*]+/, 'comment'],
        [/\/\*/, 'comment', '@push'], // nested comment
        ['\\*/', 'comment', '@pop'],
        [/[\/*]/, 'comment'],
      ],

      string: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],

      whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment'],
      ],
    },
  };
}

export default function App() {
  const monacoRef = useRef(null);

  function handleEditorWillMount(monaco) {
    // Register a new language
    monaco.languages.register({
      id: 'mySpecialLanguage',
      extensions: ['.risor'],
      aliases: ['RSR', 'risor'],
      mimetypes: ['application/risor'],
    });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider('mySpecialLanguage', getLang());

    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme('myCoolTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        // { token: 'string', foreground: '808080', fontStyle: 'bold' },
        { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
      ],
      colors: {
        // 'editor.foreground': '#000000',
        // 'editor.background': '#aaaaaa',
      },
    });

    // Register a completion item provider for the new language
    monaco.languages.registerCompletionItemProvider('mySpecialLanguage', {
      provideCompletionItems: (model, position) => {
        var word = model.getWordUntilPosition(position);
        var range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        var suggestions = [
          {
            label: 'simpleText',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'simpleText',
            range: range,
          },
          {
            label: 'testing',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'testing(${1:condition})',
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
          {
            label: 'ifelse',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'if (${1:condition}) {',
              '\t$0',
              '} else {',
              '\t',
              '}',
            ].join('\n'),
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'If-Else Statement',
            range: range,
          },
        ];
        return { suggestions: suggestions };
      },
    });
  }

  function handleEditorDidMount(editor, monaco) {
    monacoRef.current = monaco;
  }

  return (
    <div style={{ marginTop: 25 }}>
      <Editor
        height='14vh'
        defaultLanguage='mySpecialLanguage'
        defaultValue={defaultCode}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        theme='myCoolTheme'
        options={{
          readOnly: false,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}