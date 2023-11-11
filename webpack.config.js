const path = require('path');

module.exports = {
  mode: "development", // "production" | "development" | "none"
  entry: {
    index: './src/ts/index.ts',        // Entry point for the index codebase
    // admin: './src/js/admin/admin.js', // Entry point for the admin codebase
    // 'admin-login': './src/js/admin/admin-login.js', // Entry point for the admin login codebase
    // 'admin-settings': './src/js/admin/admin-settings.js' // Entry point for the admin settings codebase
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js', // [name] will be replaced with the entry point name
    // filename: 'bundle-[name].js', // [name] will be replaced with the entry point name
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  cache: false,
  watch: true,
};