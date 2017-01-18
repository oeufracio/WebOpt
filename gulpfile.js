//npm init
//npm install --save-dev gulp browser-sync run-sequence gulp-useref gulp-if gulp-htmlmin gulp-uglify gulp-clean-css gulp-imagemin del
var gulp = require('gulp');
var browserSync = require('browser-sync');
var runsequence = require('run-sequence');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
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

// Optimizing HTML, CSS and JavaScript 
gulp.task('useref:index', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}) ))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('useref:views', function() {
    return gulp.src('app/views/*.html')
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}) ))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist/views'));
});

// Optimizing Images 
gulp.task('images:index', function() {
    return gulp.src('app/img/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('images:views', function() {
    return gulp.src('app/views/images/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
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
    runsequence('clean', ['useref:index','useref:views', 'images:index', 'images:views'], callback);
});