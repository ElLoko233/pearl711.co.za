const path = require('path');

module.exports = {
  mode: "development", // "production" | "development" | "none"
  entry: {
    index: './src/ts/index.ts',        // Entry point for the index page codebase
    // products: './src/ts/products.ts', // Entry point for the product page codebase
    // services: './src/ts/services.ts', // Entry point for the services codebase
    // adminlogin: './src/ts/admin/admin-login.ts', // Entry point for the admin -login page codebase
    // admin: './src/ts/admin/admin', // Entry point for the admin page codebase
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle-[name].js', // [name] will be replaced with the entry point name
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