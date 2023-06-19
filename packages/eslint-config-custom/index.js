module.exports = {
	extends: [
		'turbo',
		'prettier',
		'eslint:recommended',
		'eslint-config-prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: 'jsx',
		ecmaVersion: 'latest',
		sourceType: 'module'
	}
};
