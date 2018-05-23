let gulp = require('gulp');
let uglify = require('gulp-uglify-es').default;
let concat = require('gulp-concat');
let cssMin = require('gulp-css');
let rename = require('gulp-rename');


gulp.task('css', function () {
  gulp.src([
    'app/css/style.css',
    'app/css/game.css'
  ])
    .pipe(concat('../release/app.css'))
    .pipe(cssMin())
    .pipe(gulp.dest('release'));
});

gulp.task('scripts', function () {
  return gulp.src([
    'app/js/Background.js',
    'app/js/Sprite.js',
    'app/js/Biker.js',
    'app/js/game.js'
  ])
    .pipe(concat('../release/app.js'))
    .pipe(gulp.dest('release'));
});

gulp.task('script-uglify', function () {
  return gulp.src([
    'app/js/Background.js',
    'app/js/Sprite.js',
    'app/js/Biker.js',
    'app/js/game.js'
  ])
    .pipe(concat('../tmp/app.js'))
    .pipe(rename("app.min.js"))
    .pipe(uglify(/* options */))
    .pipe(gulp.dest("release"));
});

gulp.task("uglify", function () {
  return gulp.src("release/app.js")
    .pipe(rename("app.min.js"))
    .pipe(uglify(/* options */))
    .pipe(gulp.dest("release"));
});

gulp.task('default', ['scripts', 'uglify']);

gulp.task('release', ['script-uglify', 'css']);