// import
// nodejs에 전역 변수인 path를 사용하겠다고 해야한다.
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')


// nodeJS환경에서 작동을 한다.
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js', // webpack은 html이 아닌 js을 진입점으로 사용한다.
  
  // 결과물(번들)을 반환하는 설정
  output: {
    // 서버를 키면 어떠한 경로로 그 결과물을 내어줄것인지
    // default값으로는 dist와 우리의 엔트리 파일의 이름으로 만들어 준다.
    // path: path.resolve(__dirname, 'dist'), // dirname은 전역 변수로써 현재 파일이 잇는 경로를 뜻한다.
    // filename: 'main.js',
    clean: true // filename을 바꿧을때 기존에 필요없는 파일을 삭제한다.
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  // 번들링 후에 결과물에 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        {from: 'static'}
      ]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}