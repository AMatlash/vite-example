/* eslint-disable no-undef */
module.exports = {
    root: true,
    env: {
        'browser': true,
        'es2021': true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        '@vue/typescript'
    ],
    parserOptions: {
        'ecmaVersion': 12,
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module'
    },
    plugins: [
        'vue',
        '@typescript-eslint'
    ],
    rules: {
        'indent': [
            'error',
            4
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],

        // vue
        'vue/html-indent': [
            'error',
            4,
            {
                'attribute': 1,
                'closeBracket': 0
            }
        ],
        'vue/script-indent': [
            'error',
            4,
            {
                'baseIndent': 1,
                'switchCase': 1
            }
        ],

        // <script setup>
        'vue/script-setup-uses-vars': 'error',
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    overrides: [
        // Fix no-used-vars when importing ts types & <script setup> vars in .vue files
        {
            'files': ['*.vue'],
            'rules': {
                'no-unused-vars': 'off',
                /* '@typescript-eslint/no-unused-vars': 'off' */
            }
        },
        // Indent  for <script> section in .vue files
        {
            'files': ['*.vue'],
            'rules': {
                'indent': 'off',
                'vue/html-indent': [
                    'error',
                    4,
                    {
                        'attribute': 1,
                        'closeBracket': 0
                    }
                ],
            }
        }
    ]
};
