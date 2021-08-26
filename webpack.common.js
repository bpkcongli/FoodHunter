const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {InjectManifest} = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozJpeg = require('imagemin-mozjpeg');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
    }),
    new CleanWebpackPlugin(),
    new ImageminWebpackPlugin({
      pngquant: ({quality: '50-50'}),
      plugins: [
        ImageminMozJpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new WebpackPwaManifest({
      name: 'Food Hunter',
      short_name: 'Food Hunter',
      description: 'Simple web that can help you to find a restaurant near your places.',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#101619',
      ios: {
        'apple-mobile-web-app-title': 'Food Hunter',
        'apple-mobile-web-app-status-bar-style': 'black',
        'apple-mobile-web-app-capable': 'yes',
      },
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/icon/food-hunter-icon.png'),
          sizes: [72, 96, 128, 144, 152, 192, 384, 512],
          destination: path.join('icons', 'android'),
        },
        {
          src: path.resolve(__dirname, 'src/public/icon/food-hunter-icon.png'),
          sizes: 512,
          destination: path.join('icons', 'android'),
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, 'src/public/icon/food-hunter-ios-icon.png'),
          sizes: [20, 152, 167, 180, 1024],
          destination: path.join('icons', 'ios'),
          ios: true,
        },
        {
          src: path.resolve(__dirname, 'src/public/icon/food-hunter-ios-icon.png'),
          sizes: 1024,
          destination: path.join('icons', 'ios'),
          ios: 'startup',
        },
      ],
    }),
    new FaviconsWebpackPlugin(
        path.resolve(
            __dirname,
            'src/public/favicon/food-hunter-favicon.png',
        ),
    ),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
        {
          context: path.resolve(
              __dirname,
              'node_modules/@webcomponents/webcomponentsjs',
          ),
          from: '**/*.js',
          to: 'webcomponents',
        },
      ],
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
