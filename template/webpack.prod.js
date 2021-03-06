const path = require("path");
const apexnitroConfig = require("./apexnitro.config.json");
const CopyPlugin = require("copy-webpack-plugin");

let styleRule;

if (apexnitroConfig.cssExtensions.includes('css')) {
  styleRule = {
    test: /\.css$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          name: `${apexnitroConfig.libraryName}.min.css`
        }
      },
      { loader: "extract-loader" },
      { loader: "css-loader?-url" },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {},
              ],
            ],
          },
        },
      }
    ]
  };
}

if (apexnitroConfig.cssExtensions.includes('scss')) {
  styleRule = {
    test: /\.s[ac]ss$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          name: `${apexnitroConfig.libraryName}.min.css`
        }
      },
      { loader: "extract-loader" },
      { loader: "css-loader?-url" },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {},
              ],
            ],
          },
        },
      },
      {
        loader: "sass-loader"
      }
    ]
  };
}

if (apexnitroConfig.cssExtensions.includes('less')) {
  styleRule = {
    test: /\.less$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: `${apexnitroConfig.libraryName}.min.css`
        }
      },
      { loader: "extract-loader" },
      { loader: "css-loader?-url" },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {},
              ],
            ],
          },
        },
      },
      {
        loader: "less-loader"
      }
    ]
  };
}

if (apexnitroConfig.cssExtensions.includes('styl')) {
  styleRule = {
    test: /\.styl$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: `${apexnitroConfig.libraryName}.min.css`
        }
      },
      { loader: "extract-loader" },
      { loader: "css-loader?-url" },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {},
              ],
            ],
          },
        },
      },
      {
        loader: "stylus-loader"
      }
    ]
  };
}

module.exports = {
  mode: "production",
  entry: [apexnitroConfig.mainCss, apexnitroConfig.mainJs],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(apexnitroConfig.distFolder),
    library: apexnitroConfig.libraryName,
    filename: `${apexnitroConfig.libraryName}.min.js`
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      styleRule
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(apexnitroConfig.srcFolder, "static"),
          to: path.resolve(apexnitroConfig.distFolder, "static")
        }
      ]
    })
  ]
};

