module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['custom', 'plugin:nestjs/recommended'],
  plugins: ['nestjs'],
  rules: {
    'nestjs/use-validation-pipe': 'off',
  },
};
