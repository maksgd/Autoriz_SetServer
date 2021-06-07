const path = require('path') // Чтобы в пути прописать просто папку 
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/app.js', //Входной файл в приложение
    output: { //Конфигурация объекта
        filename: 'bundle.[chunkhash].js', // Для хеширования в разработке
        path: path.resolve(__dirname, 'public') 
    },
    devServer: {
        port: 3000
    },
    plugins: [ //Прописываем подключенные плагины
        new HTMLPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: { // Для подключения css файла. 
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
    },
}







