import gulp from 'gulp';
import scss from 'gulp-sass';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';

const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
  },
  scripts: {
    src: 'src/js/**/*.js',
  }
};

const dest = './build'

/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(scss())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'app',
    }))
    .pipe(gulp.dest(dest));
}

export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dest));
}

 /*
  * You could even use `export as` to rename exported tasks
  */
function watchFiles() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}
export { watchFiles as watch };

const build = gulp.series(gulp.parallel(styles, scripts));
/*
 * Export a default task
 */
export default build;