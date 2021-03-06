
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    // 0. Establecer el modo del configurador
    mode: 'development',
    // 1. Especificando el archivo de entrada
    entry: './client/index.js',
    // 3. Especificando la salida 
    output:{
        path: path.join(__dirname, 'public'),
        // 4. Nombre del archivo de salida
        filename: 'js/bundle.js',
        //5. Ruta del path publica para fines del servidor de desarrollo
        publicPath: '/'
    },
    module: {
        rules:[
            {
              test:  /\.js$/,
              exclude: /(node_modulesǀbower_components)/,
              use:[
                 {
                     loader: 'babel-loader',
                     options: {
                         presets: [
                            [
                              '@babel/preset-env', 
                              {
                                 'modules': false, 
                                 'useBuiltIns': 'usage',
                                 'targets': {"chrome": "80"},
                                 'corejs': 3
                              }
                            ]
                         ],
                        "plugins": [//llave
                        [
                            "module-resolver",
                            {
                                "root": ["./"],
                                "alias":{
                                    "@client": "./client",
                                }
                            }
                        ]
                    ]//llave
                     }
                 } 
              ]
            },
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            }
         ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'styles/app.css'
        })
    ]
}