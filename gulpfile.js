var gulp = require('gulp');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var ngAnnotate = require('gulp-ng-annotate');
var paths = require('./gulp.config.json');

gulp.task('lint', function(){
	return gulp.src(paths.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('angular', function(){
	return gulp.src(paths.js)
		.pipe(plumber())
		.pipe(concat('app.min.js'))
		.pipe(ngAnnotate())
		//.pipe(uglify())
		.pipe(gulp.dest('client/dist'));
});

gulp.task('watch-angular', function(){
	gulp.watch('client/app/**/*.js', ['lint', 'angular']);
});

gulp.task('lint-back', function(){
	return gulp.src('server/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint', 'angular', 'watch-angular']);