import gulp from 'gulp';
import scss from 'gulp-sass';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import uncss from 'gulp-uncss';
import autoprefixer  from 'gulp-autoprefixer';


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
        .pipe(autoprefixer())
        .pipe(uncss({html: ['*.html']}))
        .pipe(cleanCSS({ compatibility: 'ie9' }))
        // pass in options to the stream
        .pipe(rename({
            basename: 'app',
        }))
        .pipe(gulp.dest(dest));
}

export function scripts() {
    return gulp.src(paths.scripts.src, {
            sourcemaps: true
        })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dest));
}

export const build = gulp.series(gulp.parallel(styles, scripts));

export const watch = () => {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
}

export default gulp.series(gulp.parallel(styles, scripts, watch));