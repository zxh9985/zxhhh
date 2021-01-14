const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')

const cssHandler = function () {
    return gulp
      .src('./src/css/*.css')         // 1-2. 找到文件
      .pipe(autoprefixer())               // 添加前缀
      .pipe(cssmin())                 // 1-3. 进行去空格的打包操作
      .pipe(gulp.dest('./dist/css/')) // 1-4. 放在指定目录下
  }
 
  const jsHandler = function () {
    return gulp
      .src('./src/js/*.js') // 找到文件
      .pipe(babel({ presets: [ '@babel/preset-env' ] })) // 转换成 ES5 的语法
      .pipe(uglify()) // 执行压缩
      .pipe(gulp.dest('./dist/js/')) // 放到指定目录
  }
  const htmlHandler = function () {
    return gulp
      .src('./src/views/*.html') // 找到文件
      .pipe(htmlmin({
        collapseWhitespace: true, // 去除掉空格
        collapseBooleanAttributes: true, // 简写值为布尔值的属性
        removeAttributeQuotes: true, // 去除属性上的双引号
        removeEmptyAttributes: true, // 去除空属性
        removeStyleLinkTypeAttributes: true, // 移出 style 和 link 标签身上的 type 属性
        removeScriptTypeAttributes: true, // 移出 script 标签身上的 type 属性
        removeComments: true, // 移出注释
        minifyCSS: true, // 会把内嵌式的 css 样式压缩
        minifyJS: true, // 会把内嵌式的 js 代码压缩
      })) // 压缩 html 文件
      .pipe(gulp.dest('./dist/views/')) // 放到指定目录下
  }
  












  module.exports.cssHandler = cssHandler
  module.exports.jsHandler = jsHandler
  module.exports.htmlHandler = htmlHandler