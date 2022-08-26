# webpack-package-basic

## webpack-bundler
- 설치 방법
  1. npm 프로젝트로 초기화
  1.  npm i -D webpack webpack-cli webpack-dev-server@next - webpack-cli와 webpack-dev에 버전을 맞춰야하기 때문에 @next키워드를 사용하여 버전에 맞게 설치한다.
- 사용법
- "webpack": "^5.74.0", - webpack을 사용하는 기본적인 방법
  "webpack-cli": "^4.10.0", - webpack에서 제공하는 기능을 cli로 사용하겠다는 코드
  "webpack-dev-server": "^4.0.0-rc.1" - 개발용서버를 열때 parcel처럼 저장과 동시에 자동으로 적용 시키는 코드
- 서버를 열기 위해서는 webpack에 구성 옵션도 추가해야한다.(webpack.config.js 파일에) parcel과의 차이점 이자, 단점이기도 하다
``` JSON
devServer: {
    host: 'localhost'
  }
```

## entry,output
```webpack
// import
// nodejs에 전역 변수인 path를 사용하겠다고 해야한다.
const path = require('path')
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
  }
}
```

## plugins
- webpack은 진입 점이 js이기 떄문에 html파일을 dist폴더에 넣어 줄수잇는 패키지가 필요하다(npm i -D html-webpack-plugin)
  // 번들링 후에 결과물에 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    })
  ],

  devServer: {
    host: 'localhost'
  }

## 정적 파일 연결
- static 폴더 밑에 images파일 밑에 파일이 존재한다고 해도, 개발서버를 열면 parcel과 마찬가지로 dist폴더에 파일이 생성 되기 때문에, 경로를 지정할때 static을 제외하고 지정한다.(대신 플러그인을 통해서 이게 가능하게 만들어 줘야한다,  npm i -D copy-webpack-plugin)

## modules
- 패키지 화 하는것이다.
- JS에서 css를 가져오게 해주는 패키지 설치 npm i -D css-loader style-loader 
  1. 두개의 패키지에 순서가 중요하다.
  1. 둘중 먼저해석 되는 로더는 css-loader이다, 자바스크립트에서 css를 해석하는 용도
  1. 해석된 내용을 html에 삽입을 해주는 역활을 한다.
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },

## SCSS
- 추가적인 패키지 가 필요하다.(npm i -D sass-loader sass)(sass-loader는 webpack.config에서 이해할수잇게해주는것이거 ,sass가 진짜 사용하는것이다.)
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

## auto prefixer(공급업체 접두사, 보험)
- autoprefixer 패키지 설치
- npm i -D postcss autoprefixer postcss-loader

## babel
- npm i @babel/core @babel/preset-env @babel/plugin-transform-runtime
- npm i babel-loader -D

## netlify 배포

## npx, degit
- 커맨드를 통해서 parcel이라던지, webpack에서 사용한 파일 가져오기
- npx degit(npx명령어를 통해 degit을 따로 설치하지 않아도 사용할수 잇다.)
- degit은 원격 저장소를 현재 폴더에 다운로드 받을수 잇게 해준다.
- npx degit junho/webpack-temlpate-basic webpack-temlpate-test (basic이라는 저장소에 내용을 test라는 폴더에 다운로드 받겠다)
- 이렇게 다운로드 받으면 버전 관리가 된상태가 아니다, 그래서 템플릿으로 이용할때 사용하는것이 좋다, 그래서 git clone을 사용하는것은 버전까지 가져오기 때문에 템플릿으로 사용하기는 좋지 않다.