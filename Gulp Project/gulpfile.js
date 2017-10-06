var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')

//ng-annotate that will rewrite your code using the minification-friendly syntax before you ship it off to Uglifier

gulp.task('js', function () {
 gulp.src(['ng/module.js', 'ng/**/*.js'])
 .pipe(concat('app.js'))
 .pipe(ngAnnotate())
 .pipe(uglify())
 .pipe(gulp.dest('assets'))
 })


gulp.task('watch:js', ['js'], function () {
  gulp.watch('ng/**/*.js', ['js'])
})
