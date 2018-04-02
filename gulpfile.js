var gulp = require ('gulp');
var cssClean = require ('gulp-clean-css');
var sass = require ('gulp-sass');
var sourcemaps = require ('gulp-sourcemaps');
var browserSync = require ('browser-sync').create();
var del = require ('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');
var gcmq = require('gulp-group-css-media-queries');


gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "app/"
    });

    gulp.watch("app/sass/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});//статический сервер и автоматическое наблюдение за изменениями в sass и html


gulp.task('sass', function() {
    return gulp.src("app/sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gcmq())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});//компиляция sass, группировка медиа запросов, автопрефиксер, сорсмэпс, обновление стилей без перезагрузки страницы

gulp.task('sass-watch', function() {
  gulp.watch('app/sass/*.scss', ['sass']);
});//вотчер за sass


gulp.task('clean', function() {
  return del.sync('dist');
});//удаление dist

gulp.task('img-min', function() {
  return gulp.src('app/imgs/**/*.*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/imgs/'));
});//сжатие картинок


gulp.task('css-min', function() {
  gulp.src('app/css/main.css')
  .pipe(cssClean({compatibility: 'ie9'}))
  .pipe(gulp.dest('dist/css/'));
}); // минифицирует и чистит css


gulp.task('build', ['clean', 'img-min', 'sass', 'css-min'], function() {
  var buildCss = gulp.src('app/css/main.css')
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
}); //финальная сборка: удаляет dist, обрабатывает картинки, компилирует sass, минифицирует css, все кладет в dist


gulp.task('clear-gulp-cache', function () {
    return cache.clearAll();
}); //очистка кэша gulp
