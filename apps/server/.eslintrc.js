module.exports = {
	root: true,
	env: {
		node: true,
		jest: true,
	},
	extends: ['custom'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	rules: {},
};
