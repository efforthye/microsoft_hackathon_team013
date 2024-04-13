module.exports = {
  root: true,
  env: { browser: true, es6: true, node: true },
  extends: ['plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
  parserOptions: {
    ecmaVersion: 2022,
    requireConfigFile: false,
    project: './tsconfig.json',
  },
  rules: {
    'max-len': ['error', { code: 120, ignoreComments: true }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint', 'react', 'prettier', 'import'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      rules: {
        'react-hooks/exhaustive-deps': 'off',
        'react/no-unescaped-entities': 'off',
        '@next/next/no-page-custom-font': 'off',
        'prettier/prettier': 'error',
        'simple-import-sort/exports': 'error',
        curly: ['error', 'all'],
        'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['state'] }], // 파라미터는 지역변수로 받아서 쓰라는 rule
        'no-restricted-globals': 'off',
        'no-console': 'warn', // console 사용하기
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off', // export const 문을 쓸때 에러를 내는 rule 해제
        'react/require-default-props': 'off',
        'react/prop-types': 'off', // props의 타입체크를 처리에 proptypes가 아닌 typescript 사용
        'react/jsx-props-no-spreading': 'off', // props로 받은 것 바로 props로 넘기기 허용
        'react/react-in-jsx-scope': 'off',
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],

        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-redeclare': 'off',
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }], // 단순 text일 경우 curly brace를 쓰지 않는다.
        'jsx-quotes': ['error', 'prefer-single'], // jsx에서는 single quote를 쓴다.
        'no-redeclare': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react$', '^next?\\w'],
              ['^react?\\w'],
              ['^[a-z]', '^node:'],
              ['^~', '^@'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              ['^.+\\.s?css$'],
              ['^\\u0000'],
            ],
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {},
    },
  },
  ignorePatterns: ['.eslintrc.js'],
};
