module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-non-null-assertion': 'off' // よろしくないことはわかっているが、今回の設計では頻発するため導入。
    },
    globals: {
        "defineProps": "readonly",
        "defineEmits": "readonly",
        "defineExpose": "readonly",
        "withDefaults": "readonly"
    }
}
