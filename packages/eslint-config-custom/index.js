module.exports = {
	extends: [
		'turbo',
		'prettier',
		'eslint:recommended',
		'eslint-config-prettier',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: 'jsx',
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		'import/order': [
			'error',
			{
				'newlines-between': 'always'
			}
		]
	}
};
