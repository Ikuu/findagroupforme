var gulp = require('gulp');

// Plugins
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');

gulp.task('lint', function(){
	return gulp.src('client/app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('angular', function(){
	return gulp.src('client/app/**/*.js')
		.pipe(plumber())
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('client/dist'));
});

gulp.task('watch-angular', function(){
	gulp.watch('client/app/**/*.js', ['angular', 'lint']);
});

gulp.task('lint-back', function(){
	return gulp.src('server/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint', 'angular', 'watch-angular']);