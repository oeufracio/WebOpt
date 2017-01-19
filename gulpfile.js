//npm init
//npm install --save-dev gulp browser-sync run-sequence gulp-htmlmin gulp-uglify jshint gulp-jshint gulp-clean-css gulp-imagemin imagemin-optipng imagemin-jpegtran del
var gulp = require('gulp');
var browserSync = require('browser-sync');
var runsequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var optipng = require('imagemin-optipng');
var jpegtran = require('imagemin-jpegtran');
var gulpif = require('gulp-if');
var del = require('del');



// DEVELOPMENT TASKS
// ------------------

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync.init({ server:{baseDir:'app'}, });
});

// Watchers
gulp.task('watch', function() {
    gulp.watch(['app/*.html', 'app/views/*.html'], browserSync.reload);
    gulp.watch(['app/js/*.js','app/views/js/*.js'], browserSync.reload);
    gulp.watch(['app/css/*.css','app/views/css/*.css'],browserSync.reload);
});



// OPTIMIZATION TASKS 
// ------------------

// Optimizing CSS
gulp.task('styles:index', function() {
    return gulp.src('app/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

// Optimizing CSS
gulp.task('styles:views', function() {
    return gulp.src('app/views/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/views/css'));
});

// Optimizing JavaScript 
gulp.task('scripts:index', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Optimizing JavaScript 
gulp.task('scripts:views', function() {
    return gulp.src('app/views/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js'));
});

// Optimizing HTML
gulp.task('content:index', function() {
    return gulp.src('app/*.html')
        .pipe(htmlmin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}))
        .pipe(gulp.dest('dist'));
});

// Optimizing HTML
gulp.task('content:views', function() {
    return gulp.src('app/views/*.html')
        .pipe(htmlmin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}))
        .pipe(gulp.dest('dist/views'));
});

// Optimizing Images 
gulp.task('images:index', function() {
    return gulp.src('app/img/*.+(png|jpg)')
        //.pipe(imagemin())
        .pipe(gulpif('*.png', imagemin({progressive: true, use: [optipng()]})))
        .pipe(gulpif('*.jpg', imagemin({progressive: true, use: [jpegtran()]})))
        .pipe(gulp.dest('dist/img'));
});


// Optimizing Images
gulp.task('images:views', function() {
    return gulp.src('app/views/images/*.+(png|jpg)')
        //.pipe(imagemin())
        .pipe(gulpif('*.png', imagemin({progressive: true, use: [optipng()]})))
        .pipe(gulpif('*.jpg', imagemin({progressive: true, use: [jpegtran()]})))
        .pipe(gulp.dest('dist/views/images'));
});

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist')
});



// BUILD SEQUENCES
// ---------------
gulp.task('default', function(callback) {
    runsequence('browserSync', 'watch', callback);
});


gulp.task('build', function(callback){
    runsequence('clean', ['styles:index','styles:views',
                        'scripts:index','scripts:views',
                        'content:index','content:views',
                        'images:index','images:views'], callback);
});